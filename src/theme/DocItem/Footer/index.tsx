import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';

import { Footer } from '@site/src/components/layout';

export default function DocItemFooter() {
  // const { metadata } = useDoc();
  // const { editUrl, lastUpdatedAt, lastUpdatedBy, tags } = metadata;

  // const canDisplayTagsRow = tags.length > 0;
  // const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  // const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  // if (!canDisplayFooter) {
  //   return null;
  // }

  return (
    <footer
      className={clsx(
        ThemeClassNames.docs.docFooter,
        'docusaurus-mt-lg docs-footer'
      )}
    >
      {/* {canDisplayTagsRow && (
        <div
          className={clsx(
            'row margin-top--sm',
            ThemeClassNames.docs.docFooterTagsRow
          )}
        >
          <div className="col">
            <TagsListInline tags={tags} />
          </div>
        </div>
      )} */}
      {/* {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx(
            'margin-top--sm',
            ThemeClassNames.docs.docFooterEditMetaRow
          )}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )} */}
      <Footer />
    </footer>
  );
}