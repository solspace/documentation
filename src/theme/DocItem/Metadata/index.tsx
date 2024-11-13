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

    if (matchingPlugin) {
      const matchingItem = matchingPlugin.items.find((item) =>
        pathname.startsWith(item.slug)
      );

      if (matchingItem) {
        return `${metadata.title} | ${matchingItem.name} for ${matchingPlugin.name}`;
      }
    }

    return metadata.title;
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
