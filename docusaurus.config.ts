import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import tailwind from './plugins/tailwind-config.cjs';
import docusaurusGithubRemoteContent from './plugins/docusaurus-github-remote-content';

import type { Options as IdealImageOptions } from '@docusaurus/plugin-ideal-image';

import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';

const config: Config = {
  title: 'Solspace',
  tagline: 'Clients need Solspace when websites are complex.',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  url: 'https://docs.solspace.com/',
  baseUrl: '/',

  staticDirectories: ['static'],

  organizationName: 'solspace',
  projectName: 'solspace-documentation',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onBrokenAnchors: 'ignore',

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          lastVersion: 'current',
          versions: {
            current: {
              label: '5.x',
              path: 'v5',
              badge: false,
            },
            v4: {
              label: '4.x',
              path: 'v4',
              badge: false,
            },
            v3: {
              label: '3.x',
              path: 'v3',
              badge: false,
            },
            v2: {
              label: '2.x',
              path: 'v2',
              badge: false,
            },
            v1: {
              label: '1.x',
              path: 'v1',
              badge: false,
            },
          },
          routeBasePath: '/craft/freeform',
          path: './craft-freeform',
          sidebarPath: './sidebars.ts',
          admonitions: {
            keywords: ['youtube', 'guide'],
            extendDefaults: true,
          },
          editUrl:
            'https://github.com/solspace/solspace-documentation/edit/main',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      docusaurusGithubRemoteContent,
      {
        contents: [
          {
            version: 5,
            saveDir: 'craft-freeform/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-freeform/v5/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 5,
            },
          },
          {
            version: 4,
            saveDir: 'versioned_docs/version-v4/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-freeform/v4/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 5,
            },
          },
          {
            version: 3,
            saveDir: 'versioned_docs/version-v3/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-freeform/v3/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 5,
            },
          },
          {
            version: 2,
            saveDir: 'versioned_docs/version-v2/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-freeform/v2/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 5,
            },
          },
          {
            version: 5,
            saveDir: 'craft-calendar/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-calendar/v5/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 2,
            },
          },
          {
            version: 4,
            saveDir: 'craft-calendar_versioned_docs/version-v4/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-calendar/v4/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 2,
            },
          },
          {
            version: 3,
            saveDir: 'craft-calendar_versioned_docs/version-v3/setup',
            file: 'changelog.mdx',
            url: 'https://raw.githubusercontent.com/solspace/craft-calendar/v3/CHANGELOG.md',
            meta: {
              title: 'Changelog',
              sidebar_label: 'Changelog',
              sidebar_position: 3,
            },
          },
        ],
      },
    ],
    tailwind,
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 90,
        max: 2040,
        min: 640,
        steps: 2,
        disableInDev: false,
      } satisfies IdealImageOptions,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'craft-calendar',
        path: 'craft-calendar',
        routeBasePath: '/craft/calendar',
        editUrl: 'https://github.com/solspace/solspace-documentation/edit/main',
        sidebarPath: './sidebars.ts',
        lastVersion: 'current',
        versions: {
          current: {
            label: '5.x',
            path: 'v5',
            badge: false,
          },
          v4: {
            label: '4.x',
            path: 'v4',
            badge: false,
          },
          v3: {
            label: '3.x',
            path: 'v3',
            badge: false,
          },
          v2: {
            label: '2.x',
            path: 'v2',
            badge: false,
          },
          v1: {
            label: '1.x',
            path: 'v1',
            badge: false,
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ee-freeform',
        path: 'ee-freeform',
        routeBasePath: '/expressionengine/freeform',
        editUrl: 'https://github.com/solspace/solspace-documentation/edit/main',
        sidebarPath: './sidebars.ts',
        lastVersion: 'current',
        versions: {
          current: {
            label: '3.x',
            path: 'v3',
            badge: false,
          },
          v2: {
            label: '2.x',
            path: 'v2',
            badge: false,
          },
          v1: {
            label: '1.x',
            path: 'v1',
            badge: false,
          },
          classic: {
            label: 'Classic',
            path: 'classic',
            badge: false,
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ee-calendar',
        path: 'ee-calendar',
        routeBasePath: '/expressionengine/calendar',
        editUrl: 'https://github.com/solspace/solspace-documentation/edit/main',
        sidebarPath: './sidebars.ts',
        lastVersion: 'current',
        versions: {
          current: {
            label: '5.x',
            path: 'v5',
            badge: false,
          },
          v4: {
            label: '4.x',
            path: 'v4',
            badge: false,
          },
          v3: {
            label: '3.x',
            path: 'v3',
            badge: false,
          },
          v2: {
            label: '2.x',
            path: 'v2',
            badge: false,
          },
          v1: {
            label: '1.x',
            path: 'v1',
            badge: false,
          },
        },
      },
    ],
  ],

  themeConfig: {
    algolia: {
      appId: '0I9DTHM8U8',
      apiKey: '4ba7fadf20a42f8515ff213715c1c77f',
      indexName: 'solspace',
      replaceSearchResultPathname: {
        from: '/docs/',
        to: '/',
      },
      searchParameters: {},
      searchPagePath: 'search',
      insights: false,
    },

    image: 'img/social-freeform.jpg',
    navbar: {
      title: 'Solspace',
      logo: {
        alt: 'Solspace',
        src: 'img/solspace.png',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'craft-calendar',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'ee-freeform',
          position: 'left',
        },
        {
          type: 'docsVersionDropdown',
          docsPluginId: 'ee-calendar',
          position: 'left',
        },
        {
          type: 'dropdown',
          position: 'right',
          label: 'Products',
          id: 'plugin_products-list',
          items: [
            {
              label: 'Craft',
              to: `/craft`,
              activeBaseRegex: '/craft',
              class: 'craft',
              id: 'craft-products',
            },
            {
              label: 'Freeform',
              to: `/craft/freeform`,
            },
            {
              label: 'Calendar',
              to: `/craft/calendar`,
            },
            {
              label: 'Express Forms',
              to: `https://discontinued-docs.solspace.com/express-forms`,
            },
            {
              label: 'ExpressionEngine',
              to: `/expressionengine`,
              class: 'expressionengine',
              id: 'expressionengine-products',
              activeBaseRegex: '/expressionengine',
            },
            {
              label: 'Freeform',
              to: `/expressionengine/freeform`,
            },
            {
              label: 'Calendar',
              to: `/expressionengine/calendar`,
            },
          ],
        },
        {
          type: 'custom-pluginStore',
          position: 'left',
        },
        {
          type: 'custom-productsList',
          position: 'right',
        },
        { to: '/support/', label: 'Support', position: 'right' },
        {
          type: 'search',
          position: 'right',
          className: 'navbar-search-icon',
        },
        {
          type: 'custom-githubUrl',
          position: 'right',
        },
        {
          type: 'custom-mobileSideMenu',
        },
      ],
    },
    prism: {
      theme: PrismLight,
      darkTheme: PrismDark,
      additionalLanguages: [
        'markup-templating',
        'diff',
        'php',
        'yaml',
        'nginx',
        'json',
        'nix',
        'twig',
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;