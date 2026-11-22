import React, { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isSamePath } from '@docusaurus/theme-common/internal';
import {
  useActivePluginAndVersion,
  useSidebarBreadcrumbs,
  useDoc,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';

import styles from './styles.module.css';

// TODO move to design system folder
function BreadcrumbsItemLink({
  label,
  href,
  isLast,
}: {
  label: string;
  href: string | undefined;
  isLast: boolean;
}): React.JSX.Element {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return (
      <span className={className} itemProp="name" aria-current="page" title={label}>
        {label}
      </span>
    );
  }
  return href ? (
    <Link className={className} href={href} itemProp="item" title={label}>
      <span itemProp="name">{label}</span>
    </Link>
  ) : (
    // TODO Google search console doesn't like breadcrumb items without href.
    // The schema doesn't seem to require `id` for each `item`, although Google
    // insist to infer one, even if it's invalid. Removing `itemProp="item
    // name"` for now, since I don't know how to properly fix it.
    // See https://github.com/facebook/docusaurus/issues/7241
    <span className={className} title={label}>{label}</span>
  );
}

// TODO move to design system folder
function BreadcrumbsItem({
  children,
  active,
  index,
  addMicrodata,
}: {
  children: ReactNode;
  active?: boolean;
  index: number;
  addMicrodata: boolean;
}): React.JSX.Element {
  return (
    <li
      {...(addMicrodata && {
        itemScope: true,
        itemProp: 'itemListElement',
        itemType: 'https://schema.org/ListItem',
      })}
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
      <meta itemProp="position" content={String(index + 1)} />
    </li>
  );
}

export default function DocBreadcrumbs(): React.JSX.Element | null {
  const { metadata } = useDoc();
  const { editUrl, permalink } = metadata;
  const breadcrumbs = useSidebarBreadcrumbs();
  const version = useActivePluginAndVersion()?.activeVersion;
  const [navbarSlot, setNavbarSlot] = useState<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    setNavbarSlot(document.getElementById('navbar-doc-breadcrumbs'));
  }, [permalink]);

  if (!breadcrumbs) {
    return null;
  }

  const trail = breadcrumbs.length > 0 && !isSamePath(permalink, version?.path) ? (
    <nav
      className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.path)}
      hidden={!navbarSlot}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}
    >
      <ol
        className="breadcrumbs"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          const href =
            item.type === 'category' && item.linkUnlisted
              ? undefined
              : item.href;

          return (
            <BreadcrumbsItem
              key={idx}
              active={isLast}
              index={idx}
              addMicrodata={!!href}
            >
              <BreadcrumbsItemLink href={href} isLast={isLast} label={item.label} />
            </BreadcrumbsItem>
          );
        })}
      </ol>
    </nav>
  ) : null;

  return (
    <>
      {navbarSlot ? createPortal(trail, navbarSlot) : trail}
      {editUrl && (
        <div className={styles.pageTools}>
          <Link to={editUrl} className={styles.editPage}>
            <span className={styles.editIcon} aria-hidden="true" />
            <span className={styles.editLabel}>
              <span className={styles.editLabelClip}>
                <span className={styles.editLabelText}>
                  <Translate
                    id="theme.common.editThisPage"
                    description="The link label to edit the current page"
                  >
                    Suggest an edit
                  </Translate>
                </span>
              </span>
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
