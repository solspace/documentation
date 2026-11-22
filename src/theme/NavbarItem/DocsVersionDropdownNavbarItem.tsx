import React from 'react';
import {
  useVersions,
  useActiveDocContext,
} from '@docusaurus/plugin-content-docs/client';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { Props } from '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import type { GlobalVersion } from '@docusaurus/plugin-content-docs/client';
import {
  useDocsPreferredVersion,
  useDocsVersionCandidates,
} from '@docusaurus/plugin-content-docs/client';

import versionsBadge from '@site/versionsBadge.json';

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId)!;

export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: Props): React.JSX.Element {
  const activeDocContext = useActiveDocContext(docsPluginId);
  const { search, hash, pathname } = useLocation();
  const versions = useVersions(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);
  const [dropdownVersion] = useDocsVersionCandidates(docsPluginId);

  if (!activeDocContext.activeVersion) {
    return null;
  }

  // Get version badges from the JSON file based on the current pathname
  const versionData = Object.keys(versionsBadge).find((key) =>
    pathname.startsWith(key)
  );
  const versionBadgeList = versionData ? versionsBadge[versionData] : [];

  const getVersionOrder = (version: GlobalVersion) => {
    const badgeIndex = versionBadgeList.findIndex(
      (v) => v.version === version.name
    );

    return badgeIndex === -1 ? Number.MAX_SAFE_INTEGER : badgeIndex;
  };

  const versionLinks = [...versions].sort(
    (a, b) => getVersionOrder(a) - getVersionOrder(b)
  ).map((version) => {
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);

    const isActive = version === activeDocContext.activeVersion;
    const status = versionBadgeList.find(
      (v) => v.version === version.name
    )?.badge;

    return {
      label: (
        <span className="navbar-version-option">
          <span>{version.label}</span>
          <span className="navbar-version-status" data-status={status?.toLowerCase()}>
            {status}
          </span>
          {isActive && <span className="navbar-version-check" aria-hidden="true" />}
        </span>
      ),
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => isActive,
      onClick: () => savePreferredVersionName(version.name),
    };
  });

  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];

  const currentStatus = versionBadgeList.find(
    (v) => v.version === dropdownVersion.name
  )?.badge;
  const versionClass = currentStatus
    ? `navbar-version navbar-version--${currentStatus.toLowerCase()}`
    : 'navbar-version';
  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
        id: 'theme.navbar.mobileVersionsDropdown.label',
        message: 'Versions',
      })
      : (
        <>
          {dropdownVersion.label}
          {currentStatus && <span className="sr-only"> {currentStatus}</span>}
        </>
      );

  const dropdownTo =
    mobile && items.length > 1
      ? undefined
      : getVersionMainDoc(dropdownVersion).path;

  if (items.length <= 1) {
    return (
      <DefaultNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
        className={versionClass}
      />
    );
  }

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
      className={versionClass}
    />
  );
}
