/**
 * Swizzled: adds doc-md-inline-link so custom.css can style markdown links only
 * (Docusaurus 3 often sets className on MDX anchors, so a:not([class]) no longer matches).
 */
import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useAnchorTargetClassName } from '@docusaurus/theme-common';
import type { Props } from '@theme/MDXComponents/A';

export default function MDXA(props: Props): ReactNode {
  const anchorTargetClassName = useAnchorTargetClassName(props.id);

  return (
    <Link
      {...props}
      className={clsx(
        'doc-md-inline-link',
        anchorTargetClassName,
        props.className,
      )}
    />
  );
}
