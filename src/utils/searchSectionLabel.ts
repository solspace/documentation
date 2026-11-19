import { translate } from '@docusaurus/Translate';

const versionBadgeLabel = /^\d+(?:\.(?:\d+|x))*\s*(?:✓\s*)?(?:Latest|Retired|Discontinued)$/i;

export function searchSectionLabel(label: string): string {
  const text = label.replace(/<[^>]*>/g, '').trim();
  return versionBadgeLabel.test(text)
    ? translate({ id: 'theme.Search.sectionOverview', message: 'Overview' })
    : label;
}
