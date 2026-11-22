import { useMemo } from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/DocSidebarItems';
import OriginalDocSidebarItems from '@theme-original/DocSidebarItems';
import { getDocSectionIconClass } from '@site/src/components/docs/DocSectionIcons';

function withSidebarIcon(item: Props['items'][number]) {
  if (item.type === 'html') {
    return item;
  }

  return { ...item, className: clsx(item.className, getDocSectionIconClass(item.label, 'sidebarItem')) };
}

export default function DocSidebarItems({ items, level, ...props }: Props) {
  const sidebarItems = useMemo(
    () => level === 1 ? items.map(withSidebarIcon) : items,
    [items, level]
  );

  return <OriginalDocSidebarItems {...props} items={sidebarItems} level={level} />;
}
