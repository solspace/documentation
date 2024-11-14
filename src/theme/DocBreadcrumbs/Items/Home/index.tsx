import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';

export default function HomeBreadcrumbItem(): JSX.Element {
  const { pathname } = useLocation();
  const basePath = pathname.split('/').slice(0, 3).join('/');
  const versionMatch = pathname.match(/\/v\d+/);
  const fullPath = versionMatch ? `${basePath}${versionMatch[0]}` : basePath;

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={fullPath}
      >
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
