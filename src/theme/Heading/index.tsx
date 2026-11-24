import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useThemeConfig } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type { Props } from '@theme/Heading';

import styles from './styles.module.css';

export default function Heading({
  as: As,
  id,
  ...props
}: Props): React.JSX.Element {
  const brokenLinks = useBrokenLinks();
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig();
  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === 'h1' || !id) {
    return <As {...props} id={undefined} />;
  }

  brokenLinks.collectAnchor(id);

  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    }
  );

  return (
    <As
      {...props}
      className={clsx(
        'anchor relative',
        hideOnScroll
          ? styles.anchorWithHideOnScrollNavbar
          : styles.anchorWithStickyNavbar,
        props.className
      )}
      id={id}
    >
      <span className={styles.headingContent}>
        <Link
          className={clsx('custom-anchor-link', styles.link)}
          to={`#${id}`}
          aria-label={anchorTitle}
          title={anchorTitle}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 13.5a3.5 3.5 0 0 0 5 .1l4-4a3.5 3.5 0 0 0-5-5l-1.7 1.7m1.7 4.2a3.5 3.5 0 0 0-5-.1l-4 4a3.5 3.5 0 0 0 5 5l1.7-1.7" />
          </svg>
        </Link>
        {props.children}
      </span>
    </As>
  );
}
