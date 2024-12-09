import React, { useMemo } from 'react';
import { PageMetadata } from '@docusaurus/theme-common';
import {
  useDoc,
  useSidebarBreadcrumbs,
} from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';

import allPlugins from '@site/allPlugins.json';

export default function DocItemMetadata(): JSX.Element {
  const { metadata, frontMatter, assets } = useDoc();
  const { pathname } = useLocation();
  const breadcrumbs = useSidebarBreadcrumbs();

  const mappedTitle = useMemo(() => {
    const matchingPlugin = allPlugins.find((plugin) =>
      plugin.items.some((item) => pathname.startsWith(item.slug))
    );
    if (!matchingPlugin) return metadata.title;

    const matchingItem = matchingPlugin.items.find((item) =>
      pathname.startsWith(item.slug)
    );
    if (!matchingItem) return metadata.title;

    const breadcrumbLabel =
      breadcrumbs.length > 0 &&
      breadcrumbs[0].type === 'category' &&
      metadata.title !== breadcrumbs[0].label
        ? `${metadata.title} - ${breadcrumbs[0].label}`
        : metadata.title;

    if (pathname.includes('/classic/')) {
      return `${breadcrumbLabel} | ${matchingItem.name} Classic for ${matchingPlugin.name}`;
    }

    const versionMatch = pathname.match(/\/v(\d+)/);
    const version = versionMatch ? `${versionMatch[1]}.x` : '';

    return `${breadcrumbLabel} | ${matchingItem.name} ${version} for ${matchingPlugin.name}`;
  }, [pathname, metadata.title, breadcrumbs]);

  const mappedDescription = useMemo(() => {
    const matchingPlugin = allPlugins.find((plugin) =>
      plugin.items.some((item) => pathname.startsWith(item.slug))
    );

    const matchingItem = matchingPlugin?.items.find((item) =>
      pathname.startsWith(item.slug)
    );

    return matchingItem?.metaDescription;
  }, [pathname]);

  return (
    <PageMetadata
      title={mappedTitle}
      description={frontMatter.description || mappedDescription}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
