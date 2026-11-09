import React from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalColorModeToggle from '@theme-original/Navbar/ColorModeToggle';
import type { Props } from '@theme/Navbar/ColorModeToggle';

export default function NavbarColorModeToggle(props: Props) {
  const { pathname } = useLocation();
  if (/^\/craft\/dark-mode\/v1\/?$/.test(pathname)) return null;
  return <OriginalColorModeToggle {...props} />;
}
