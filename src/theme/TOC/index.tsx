import React, { useEffect } from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type { Props } from '@theme/TOC';

import { FeedbackButton } from 'pushfeedback-react';
import { defineCustomElements } from 'pushfeedback/loader';

import styles from './styles.module.css';
import 'pushfeedback/dist/pushfeedback/pushfeedback.css';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

const buttonThumbsUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);
const buttonThumbsDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
  </svg>
);

export default function TOC({ className, ...props }: Props): JSX.Element {
  const projectId = 'o9vrsuaik2';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      defineCustomElements(window);
    }
  }, []);

  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
      <div className="flex flex-wrap lg:justify-between bg-[var(--ifm-breadcrumb-item-background-active)] rounded-lg p-3 mt-6 ">
        <div>
          <b>Page Feedback</b>
        </div>
        <div className="flex items-center gap-1">
          <FeedbackButton
            project={projectId}
            rating={1}
            custom-font="True"
            button-style="default"
            modal-position="center"
          >
            <div
              className="flex justify-center  rounded-md px-1.5 py-1 transition-all duration-500 bg-gray-200 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-900"
              title="Yes"
            >
              {buttonThumbsUp}
            </div>
          </FeedbackButton>
          <FeedbackButton
            project={projectId}
            rating={0}
            custom-font="True"
            button-style="default"
            modal-position="center"
          >
            <div
              className="flex justify-center  rounded-md px-1.5 py-1 transition-all duration-500 bg-gray-200 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-900"
              title="No"
            >
              {buttonThumbsDown}
            </div>
          </FeedbackButton>
        </div>
      </div>
    </div>
  );
}
