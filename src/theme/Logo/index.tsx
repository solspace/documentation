import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig, type NavbarLogo } from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import type { Props } from '@theme/Logo';
import { useLocation } from '@docusaurus/router';

interface LogoItem {
  pathname: string;
  title: string;
  logoLine: string;
  src: string;
}

const logos: LogoItem[] = [
  {
    pathname: '/craft/freeform',
    title: 'Freeform',
    logoLine: 'for Craft',
    src: 'img/icons/freeform.png',
  },
  {
    pathname: '/craft/calendar',
    title: 'Calendar',
    logoLine: 'for Craft',
    src: 'img/icons/calendar.png',
  },
  {
    pathname: 'https://discontinued-docs.solspace.com/express-forms/',
    title: 'Express Forms',
    logoLine: 'for Craft',
    src: 'img/icons/express-forms.png',
  },
  {
    pathname: '/expressionengine/freeform',
    title: 'Freeform',
    logoLine: 'for ExpressionEngine',
    src: 'img/icons/freeform.png',
  },
  {
    pathname: '/expressionengine/calendar',
    title: 'Calendar',
    logoLine: 'for ExpressionEngine',
    src: 'img/icons/calendar.png',
  },
];

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

export default function Logo(props: Props): JSX.Element {
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
    logoLine: '',
    src: logo?.src || 'img/icons/solspace.png',
  };

  const currentLogo: LogoItem & NavbarLogo = matchedLogo
    ? { ...logo, ...matchedLogo }
    : { ...logo, ...defaultLogo };

  return (
    <Link
      to={currentLogo.pathname}
      {...propsRest}
      {...(logo?.target && { target: logo.target })}
    >
      {currentLogo && (
        <>
          <LogoThemedImage
            logo={currentLogo}
            alt={currentLogo.alt || alt}
            imageClassName={`${imageClassName} ${
              !matchedLogo && 'solspace-logo'
            }`}
          />
          {matchedLogo && (
            <div className="flex items-center gap-2">
              <b className="navbar__title text--truncate">
                {matchedLogo.title}
              </b>
              <span className="logo-line">{matchedLogo.logoLine}</span>
            </div>
          )}
        </>
      )}
      {navbarTitle != null && !matchedLogo && (
        <b className={titleClassName}>{navbarTitle}</b>
      )}
    </Link>
  );
}
