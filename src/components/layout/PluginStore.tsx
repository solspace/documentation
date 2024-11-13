import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

const stores = [
  {
    pathname: '/craft/freeform',
    title: 'Plugin Store',
    link: 'https://plugins.craftcms.com/freeform',
  },
  {
    pathname: '/craft/calendar',
    title: 'Plugin Store',
    link: 'https://plugins.craftcms.com/calendar',
  },
  {
    pathname: '/craft/express-forms',
    title: 'Plugin Store',
    link: 'https://plugins.craftcms.com/express-forms',
  },
  {
    pathname: '/expressionengine/freeform',
    title: 'Add-ons Store',
    link: 'https://expressionengine.com/add-ons/freeform',
  },
  {
    pathname: '/expressionengine/calendar',
    title: 'Add-ons Store',
    link: 'https://expressionengine.com/add-ons/calendar',
  },
];

export function PluginStore(): JSX.Element {
  const { pathname } = useLocation();
  const matchedStore = stores.find((l) => pathname.startsWith(l.pathname));

  if (!matchedStore) {
    return null;
  }

  return (
    <Link
      className="hidden md:inline-block bg-[#058ffe]  text-white text-sm rounded-2xl px-2 py-1 ml-5 hover:text-white hover:opacity-90 plugin-store-link"
      to={matchedStore.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{matchedStore.title}</span>
    </Link>
  );
}
