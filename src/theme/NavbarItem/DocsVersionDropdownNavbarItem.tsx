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

const badgeObj = {
  Latest: (
    <div className="inline-block relative bg-green-100 text-green-800 text-[9px] font-medium me-2 px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
      ✓ Latest
    </div>
  ),
  Retired: (
    <div className="inline-block relative bg-gray-200 text-gray-800 text-[9px] font-medium me-2 px-2 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300">
      Retired
    </div>
  ),
  Discontinued: (
    <div className="inline-block relative bg-red-100 text-red-800 text-[9px] font-medium me-2 px-2 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      Discontinued
    </div>
  ),
};

const LabelWithBadge = ({ version, badge }) => (
  <div className="flex items-center gap-2">
    {version.label}
    {badgeObj[badge]}
  </div>
);

const getVersionMainDoc = (version: GlobalVersion) =>
  version.docs.find((doc) => doc.id === version.mainDocId)!;

export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: Props): JSX.Element {
  const activeDocContext = useActiveDocContext(docsPluginId);

  if (!activeDocContext.activeVersion) {
    return null;
  }

  const { search, hash, pathname } = useLocation();
  const versions = useVersions(docsPluginId);
  const { savePreferredVersionName } = useDocsPreferredVersion(docsPluginId);

  // Get version badges from the JSON file based on the current pathname
  const versionData = Object.keys(versionsBadge).find((key) =>
    pathname.startsWith(key)
  );
  const versionBadgeList = versionData ? versionsBadge[versionData] : [];

  const versionLinks = versions.map((version) => {
    const versionDoc =
      activeDocContext.alternateDocVersions[version.name] ??
      getVersionMainDoc(version);

    // Find the matching version badge
    const versionBadge = versionBadgeList.find(
      (v) => v.version === version.name
    );

    return {
      label: (
        <LabelWithBadge
          version={version}
          badge={versionBadge ? versionBadge.badge : null}
        />
      ),
      to: `${versionDoc.path}${search}${hash}`,
      isActive: () => version === activeDocContext.activeVersion,
      onClick: () => savePreferredVersionName(version.name),
    };
  });

  const items = [
    ...dropdownItemsBefore,
    ...versionLinks,
    ...dropdownItemsAfter,
  ];

  const dropdownVersion = useDocsVersionCandidates(docsPluginId)[0];

  const dropdownLabel =
    mobile && items.length > 1 ? (
      translate({
        id: 'theme.navbar.mobileVersionsDropdown.label',
        message: 'Versions',
      })
    ) : (
      <LabelWithBadge
        version={dropdownVersion}
        badge={
          versionBadgeList.find((v) => v.version === dropdownVersion.name)
            ?.badge || null
        }
      />
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
      />
    );
  }

  return (
    <div className="version">
      <DropdownNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        items={items}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
        className="flex items-center"
      />
    </div>
  );
}
