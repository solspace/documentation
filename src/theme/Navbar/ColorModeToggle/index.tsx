import React from 'react';
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import OriginalColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import type { Props } from '@theme/Navbar/ColorModeToggle';

export default function NavbarColorModeToggle(props: Props) {
  const { pathname } = useLocation();
  if (/^\/craft\/dark-mode\/v1\/?$/.test(pathname)) return null;
  return <OriginalColorModeToggle {...props} className={clsx(props.className, 'navbar-color-mode')} />;
}
