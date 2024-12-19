import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

import allPlugins from '@site/allPlugins.json';

const LeftMenuList: React.FC = () => {
  const location = useLocation();

  return (
    <ul className="space-y-5 list-none">
      <li>
        <span className="pl-2 block font-semibold text-gray-900 dark:text-gray-300 mb-2">
          Overview
        </span>

        <ul className="pl-0 space-y-2 list-none">
          {[
            { label: 'Home', to: '/' },
            { label: 'Support', to: '/support/' },
            { label: 'License Agreement', to: '/license-agreement/' },
            { label: 'Legacy Account', to: '/legacy-account/' },
          ].map((link, subIndex) => {
            const isActive = location.pathname === link.to;

            return (
              <li
                className={`pl-4 py-0.5 ${
                  isActive ? 'bg-[#058ffe] rounded-sm' : ''
                }`}
                key={subIndex}
              >
                <Link
                  to={link.to}
                  className={`block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 ${
                    isActive ? '!text-white' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
      {allPlugins.map((category, index) => (
        <li key={index}>
          {category.slug ? (
            <Link
              to={category.slug}
              className={`${
                location.pathname === category.slug
                  ? 'bg-[#058ffe] rounded-sm'
                  : ''
              } pl-2 block font-semibold text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 mb-2`}
            >
              {category.name}
            </Link>
          ) : (
            <span className="pl-2 block font-semibold text-gray-900 dark:text-gray-300 mb-2">
              {category.name}
            </span>
          )}

          <ul className="pl-0 space-y-2 list-none">
            {category.items.map((link, subIndex) => {
              const isActive = location.pathname === link.slug;

              return (
                <li
                  className={`pl-4 py-0.5 ${
                    isActive ? 'bg-[#058ffe] rounded-sm' : ''
                  }`}
                  key={subIndex}
                >
                  <Link
                    to={link.latestVersionSlug || link.slug}
                    className={`block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 ${
                      isActive ? '!text-white' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};

const LeftNav: React.FC = () => {
  return (
    <nav className="hidden md:inline-block w-64 h-screen fixed top-0 left-0 mt-16 py-6 pr-6">
      <LeftMenuList />
    </nav>
  );
};

const MobileSideMenu: React.FC = () => {
  return (
    <nav className="md:hidden mobile-nav pt-6">
      <LeftMenuList />
    </nav>
  );
};

export { LeftNav, MobileSideMenu };
