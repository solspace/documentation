import React, { type ComponentType } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  useActivePlugin,
  useDocVersionSuggestions,
  type GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/DocVersionBanner';
import type {
  VersionBanner,
  PropVersionMetadata,
} from '@docusaurus/plugin-content-docs';
import {
  useDocsVersion,
  useDocsPreferredVersion,
} from '@docusaurus/plugin-content-docs/client';

type BannerLabelComponentProps = {
  siteTitle: string;
  versionMetadata: PropVersionMetadata;
  productName: string;
};

function getCurrentProductName(): string {
  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  // Extract product name from the URL. For example:
  // - /craft/freeform -> Freeform
  // - /expressionengine/calendar -> Calendar
  const segments = currentPath.split('/').filter(Boolean);
  if (segments.length > 1) {
    return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
  }

  return 'Product';
}

function UnreleasedVersionLabel({
  siteTitle,
  versionMetadata,
  productName,
}: BannerLabelComponentProps) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that they're browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
        productName,
      }}
    >
      {
        'This is unreleased documentation for {siteTitle} {versionLabel} version of {productName}.'
      }
    </Translate>
  );
}

function UnmaintainedVersionLabel({
  siteTitle,
  versionMetadata,
  productName,
}: BannerLabelComponentProps) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that they're browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
        productName,
      }}
    >
      {
        'You are viewing an older version of the {productName} documentation ({versionLabel}).'
      }
    </Translate>
  );
}

const BannerLabelComponents: {
  [banner in VersionBanner]: ComponentType<BannerLabelComponentProps>;
} = {
  unreleased: UnreleasedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};

function BannerLabel(props: BannerLabelComponentProps) {
  const BannerLabelComponent =
    BannerLabelComponents[props.versionMetadata.banner!];
  return <BannerLabelComponent {...props} />;
}

function LatestVersionSuggestionLabel({
  versionLabel,
  to,
  onClick,
}: {
  to: string;
  onClick: () => void;
  versionLabel: string;
}) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel: (
          <Link
            className="text-black dark:text-white latest-version-link"
            to={to}
          >
            View the latest version (<b>{versionLabel}</b>) →
          </Link>
        ),
        latestVersionLink: (
          <b>
            <Link to={to} onClick={onClick}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label"
              >
                latest version
              </Translate>
            </Link>
          </b>
        ),
      }}
    >
      {'{versionLabel}'}
    </Translate>
  );
}

function DocVersionBannerEnabled({
  className,
  versionMetadata,
}: Props & {
  versionMetadata: PropVersionMetadata;
}): JSX.Element {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { pluginId } = useActivePlugin({ failfast: true })!;

  const getVersionMainDoc = (version: GlobalVersion) =>
    version.docs.find((doc) => doc.id === version.mainDocId)!;

  const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);

  const { latestDocSuggestion, latestVersionSuggestion } =
    useDocVersionSuggestions(pluginId);

  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);

  const productName = getCurrentProductName();

  return (
    <Link to={latestVersionSuggestedDoc.path}>
      <div
        className={clsx(
          className,
          ThemeClassNames.docs.docVersionBanner,
          'top-notice'
        )}
        role="alert"
      >
        <div className="flex flex-wrap ml-2">
          <BannerLabel
            siteTitle={siteTitle}
            versionMetadata={versionMetadata}
            productName={productName}
          />

          <div className="ml-1">
            <LatestVersionSuggestionLabel
              versionLabel={latestVersionSuggestion.label}
              to={latestVersionSuggestedDoc.path}
              onClick={() =>
                savePreferredVersionName(latestVersionSuggestion.name)
              }
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function DocVersionBanner({
  className,
}: Props): JSX.Element | null {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.banner) {
    return (
      <DocVersionBannerEnabled
        className={className}
        versionMetadata={versionMetadata}
      />
    );
  }
  return null;
}
