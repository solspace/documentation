import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

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

export function PluginStore(): JSX.Element {
  const { pathname } = useLocation();
  const matchedStore = stores.find((l) => pathname.startsWith(l.pathname));

  if (!matchedStore) {
    return null;
  }

  return (
    <Link
      className="hidden lg:inline-block bg-[#ff6624] text-white text-md font-bold rounded-2xl px-2 py-1 ml-5 hover:text-white hover:opacity-90 plugin-store-link"
      to={matchedStore.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{matchedStore.title}</span>
    </Link>
  );
}
