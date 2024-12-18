import React from 'react';
import Link from '@docusaurus/Link';
import allPlugins from '@site/allPlugins.json';

export function ProductsList(): JSX.Element {
  return (
    <div className="navbar__item dropdown dropdown--hoverable cursor-pointer hidden md:block">
      <div className="navbar__item navbar__link">Products</div>

      <div className="absolute left-0 dropdown__menu min-w-[190px]">
        {allPlugins.map((plugin) => (
          <div key={plugin.name}>
            <Link to={plugin.slug}>
              <div className="font-bold text-xs italic text-gray-700 dark:text-gray-400 px-2 py-1">
                {plugin.name}
              </div>
            </Link>

            <ul className="pl-4">
              {plugin.items.map((item) => (
                <li key={item.name} className="list-none">
                  <Link
                    to={item.latestVersionSlug}
                    className="text-sm text-blue-400 darktext-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
