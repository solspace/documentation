import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';

const stores = [
  {
    pathname: '/craft/freeform',
    title: 'Buy Now',
    link: 'https://plugins.craftcms.com/freeform',
  },
  {
    pathname: '/craft/calendar',
    title: 'Buy Now',
    link: 'https://plugins.craftcms.com/calendar',
  },
  {
    pathname: '/craft/dark-mode',
    title: 'Get darkMode',
    link: '/craft/dark-mode/v1/setup/installation/',
  },
  {
    pathname: '/craft/ai-assistant',
    title: 'Buy Now',
    link: 'https://plugins.craftcms.com/ai-assistant',
  },
  {
    pathname: '/craft/express-forms',
    title: 'Buy Now',
    link: 'https://plugins.craftcms.com/express-forms',
  },
  {
    pathname: '/expressionengine/freeform',
    title: 'Buy Now',
    link: 'https://expressionengine.com/add-ons/freeform',
  },
  {
    pathname: '/expressionengine/calendar',
    title: 'Buy Now',
    link: 'https://expressionengine.com/add-ons/calendar',
  },
];

export function PluginStore({
  mobile,
  onClick,
}: Pick<Props, 'mobile' | 'onClick'>): React.JSX.Element | null {
  const { pathname } = useLocation();
  const matchedStore = stores.find((l) => pathname.startsWith(l.pathname));

  if (!matchedStore) {
    return null;
  }

  const isExternal = matchedStore.link.startsWith('https://');
  const iconClass = isExternal ? 'navbar-store' : 'navbar-store navbar-store--download';

  if (mobile) {
    return (
      <DefaultNavbarItem
        mobile
        label={matchedStore.title}
        onClick={onClick}
        className={iconClass}
        {...(isExternal ? { href: matchedStore.link } : { to: matchedStore.link })}
      />
    );
  }

  return (
    <Link
      className={`navbar__item plugin-store-link ${iconClass}`}
      to={matchedStore.link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {matchedStore.title}
    </Link>
  );
}
