import React, { useMemo } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';

import allPlugins from '@site/allPlugins.json';

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc();
  const { pathname } = useLocation();

  const mappedTitle = useMemo(() => {
    const matchingPlugin = allPlugins.find((plugin) =>
      plugin.items.some((item) => pathname.startsWith(item.slug))
    );

    if (!matchingPlugin) return metadata.title;

    const matchingItem = matchingPlugin.items.find((item) =>
      pathname.startsWith(item.slug)
    );

    if (!matchingItem) return metadata.title;

    if (pathname.includes('/classic/')) {
      return `${metadata.title} | ${matchingItem.name} Classic for ${matchingPlugin.name}`;
    }

    const versionMatch = pathname.match(/\/v(\d+)/);
    const version = versionMatch ? `${versionMatch[1]}.x` : '';

    return `${metadata.title} | ${matchingItem.name} ${version} for ${matchingPlugin.name}`;
  }, [pathname, metadata.title]);

  return (
    <PageMetadata
      title={mappedTitle}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
