import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';
import { useVersions } from '@docusaurus/plugin-content-docs/client';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

export default function HomeBreadcrumbItem(): JSX.Element {
  const {
    metadata: { version },
  } = useDoc();
  const versions = useVersions(undefined);
  const versionPath = useMemo(
    () => versions.find((v) => v.name === version)?.path,
    [versions, version]
  );
  const homeHref = useBaseUrl(versionPath);

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}
      >
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
