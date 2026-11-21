import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig, type NavbarLogo } from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import type { Props } from '@theme/Logo';
import { useLocation } from '@docusaurus/router';

const platformIcons = {
  Craft: 'logos/icons/craft-mark.svg',
  ExpressionEngine: 'icons/support/expressionengine-mark.svg',
};

interface LogoItem {
  pathname: string;
  latestVersionSlug?: string;
  title: string;
  platform?: keyof typeof platformIcons;
  src: string;
}

const logos: LogoItem[] = [
  {
    pathname: '/craft/freeform',
    latestVersionSlug: '/craft/freeform/v5',
    title: 'Freeform',
    platform: 'Craft',
    src: 'icons/cards/freeform-blue.svg',
  },
  {
    pathname: '/craft/calendar',
    latestVersionSlug: '/craft/calendar/v5',
    title: 'Calendar',
    platform: 'Craft',
    src: 'logos/icons/calendar.png',
  },
  {
    pathname: '/craft/ai-assistant',
    latestVersionSlug: '/craft/ai-assistant/v1',
    title: 'AI Assistant',
    platform: 'Craft',
    src: 'icons/cards/ai-assistant.svg',
  },
  {
    pathname: '/craft/dark-mode',
    latestVersionSlug: '/craft/dark-mode/v1',
    title: 'darkMode',
    platform: 'Craft',
    src: 'logos/icons/dark-mode.svg',
  },
  {
    pathname: 'https://discontinued-docs.solspace.com/express-forms/',
    title: 'Express Forms',
    platform: 'Craft',
    src: 'logos/icons/express-forms.png',
  },
  {
    pathname: '/expressionengine/freeform',
    latestVersionSlug: '/expressionengine/freeform/v3',
    title: 'Freeform',
    platform: 'ExpressionEngine',
    src: 'icons/cards/freeform-blue.svg',
  },
  {
    pathname: '/expressionengine/calendar',
    latestVersionSlug: '/expressionengine/calendar/v5',
    title: 'Calendar',
    platform: 'ExpressionEngine',
    src: 'logos/icons/calendar.png',
  },
];

export function NavbarPlatformMark({
  mobile,
}: {
  mobile?: boolean;
}): React.JSX.Element | null {
  const { pathname } = useLocation();
  const platform = logos.find((logo) => pathname.startsWith(logo.pathname))?.platform;
  const src = useBaseUrl(platform ? platformIcons[platform] : '');

  if (mobile || !platform) {
    return null;
  }

  return (
    <>
      <span className="navbar-product-platform" aria-hidden="true">
        <img src={src} alt="" width={24} height={24} />
        {platform === 'ExpressionEngine' ? (
          <>
            <span className="hidden sm:inline">{platform}</span>
            <span className="sm:hidden">EE</span>
          </>
        ) : platform}
      </span>
      <div id="navbar-doc-breadcrumbs" className="navbar-doc-breadcrumbs" />
    </>
  );
}

function LogoThemedImage({
  logo,
  alt,
  imageClassName,
}: {
  logo: NavbarLogo;
  alt: string;
  imageClassName?: string;
}) {
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      className={logo.className}
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={alt}
      style={logo.style}
    />
  );

  return imageClassName ? (
    <div className={imageClassName}>{themedImage}</div>
  ) : (
    themedImage
  );
}

export default function Logo(props: Props): React.JSX.Element {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const { pathname } = useLocation();
  const { imageClassName, titleClassName, ...propsRest } = props;

  const fallbackAlt = navbarTitle ? '' : title;
  const alt = logo?.alt ?? fallbackAlt;

  const matchedLogo = logos.find((l) => pathname.startsWith(l.pathname));

  const defaultLogo: LogoItem = {
    pathname: '/',
    title: navbarTitle || 'Solspace',
    src: logo?.src || 'logos/icons/solspace.png',
  };

  const currentLogo: LogoItem & NavbarLogo = matchedLogo
    ? { ...logo, ...matchedLogo }
    : { ...logo, ...defaultLogo };

  return (
    <Link
      to={currentLogo.latestVersionSlug ?? '/'}
      aria-label={matchedLogo && `${matchedLogo.title} for ${matchedLogo.platform}`}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {currentLogo && (
        <>
          <LogoThemedImage
            logo={currentLogo}
            alt={matchedLogo || navbarTitle ? '' : alt}
            imageClassName={`${imageClassName} ${
              !matchedLogo && 'solspace-logo'
            }`}
          />
          {matchedLogo && (
            <b className="navbar__title navbar-product-title text--truncate">
              {matchedLogo.title}
            </b>
          )}
        </>
      )}
      {navbarTitle != null && !matchedLogo && (
        <b className={titleClassName}>{navbarTitle}</b>
      )}
    </Link>
  );
}
