import { useState } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useScrollPosition } from '@docusaurus/theme-common/internal';
import TOCItems from '@theme/TOCItems';
import type { Props } from '@theme/TOC';

import styles from './styles.module.css';

// Keep scroll highlighting scoped to the desktop table of contents.
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({ className, toc, minHeadingLevel, maxHeadingLevel }: Props) {
  const { tableOfContents } = useThemeConfig();
  const minLevel = minHeadingLevel ?? tableOfContents.minHeadingLevel;
  const maxLevel = maxHeadingLevel ?? tableOfContents.maxHeadingLevel;
  const headings = toc.filter(({ level }) => level >= minLevel && level <= maxLevel);
  const [atTop, setAtTop] = useState(true);
  useScrollPosition(({ scrollY }) => setAtTop(scrollY <= 1));

  if (!headings.length) {
    return null;
  }

  const title = translate({
    id: 'theme.TOC.title',
    message: 'On this page',
    description: 'The title of the desktop table of contents',
  });
  const overview = translate({
    id: 'theme.TOC.overview',
    message: 'Overview',
    description: 'The table of contents link to the top of the page',
  });
  const topLabel = headings.some(({ value }) => value.trim().toLowerCase() === overview.toLowerCase())
    ? translate({ id: 'theme.TOC.topOfPage', message: 'Top of page' })
    : overview;

  // An empty fragment returns to the top. The maximum level keeps this entry a leaf.
  const entries = [{ id: '', value: topLabel, level: maxLevel }, ...toc];

  return (
    <nav
      aria-label={title}
      className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}
      data-at-top={atTop ? '' : undefined}
    >
      <p className={styles.title}>{title}</p>
      <TOCItems
        toc={entries}
        minHeadingLevel={minLevel}
        maxHeadingLevel={maxLevel}
        className={clsx('table-of-contents', styles.list)}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </nav>
  );
}
