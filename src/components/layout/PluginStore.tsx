import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

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
    title: 'Get Dark Mode',
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

export function PluginStore(): React.JSX.Element | null {
  const { pathname } = useLocation();
  const matchedStore = stores.find((l) => pathname.startsWith(l.pathname));

  if (!matchedStore) {
    return null;
  }

  const isDarkModeIntro = /^\/craft\/dark-mode\/v1\/?$/.test(pathname);

  return (<>
    <Link
      className={`hidden lg:inline-block bg-[#ff6624] text-white text-md font-bold rounded-2xl px-2 py-1 ml-5 hover:text-white hover:opacity-90 plugin-store-link${isDarkModeIntro ? ' dark-mode-store-link' : ''}`}
      to={matchedStore.link}
      target={matchedStore.link.startsWith('https://') ? '_blank' : undefined}
      rel={matchedStore.link.startsWith('https://') ? 'noopener noreferrer' : undefined}
    >
      <span>{matchedStore.title}</span>
    </Link>
    {isDarkModeIntro && <DropdownNavbarItem
      label="Docs"
      className="hidden md:block"
      items={[
        { label: 'Installation & Updates', to: '/craft/dark-mode/v1/setup/installation/' },
        { label: 'Using Dark Mode', to: '/craft/dark-mode/v1/users/' },
        { label: 'Plugin Compatibility', to: '/craft/dark-mode/v1/compatibility/' },
        { label: 'Plugin Development', to: '/craft/dark-mode/v1/developer/' },
      ]}
    />}
  </>);
}
