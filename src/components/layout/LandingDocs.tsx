import React from 'react';
import { useLocation } from '@docusaurus/router';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import type { Props } from '@theme/NavbarItem/DropdownNavbarItem';
import { getDocSectionIconClass } from '@site/src/components/docs/DocSectionIcons';

const calendarDocs: [label: string, path: string][] = [
  ['Installing & Updating', 'setup/installing-updating/'],
  ['User Guides', 'guides/getting-started/'],
  ['Configuration', 'configuration/settings/'],
  ['Events', 'events/'],
  ['Calendars', 'calendars/'],
  ['Templating', 'templates/queries/events/'],
  ['Headless', 'headless/graphql/'],
  ['Developer', 'developer/events/'],
];

const landingDocs: Record<string, [label: string, path: string][]> = {
  '/craft/freeform/v5': [
    ['Installing & Updating', 'setup/'],
    ['User Guides', 'guides/'],
    ['Configuration', 'configuration/'],
    ['Forms & Fields', 'forms/'],
    ['Submission Data', 'submissions/'],
    ['Form Monitoring', 'monitoring/'],
    ['Integrations', 'integrations/'],
    ['Templating', 'templates/'],
    ['Headless', 'headless/'],
    ['Developer', 'developer/'],
  ],
  '/craft/calendar/v5': calendarDocs,
  '/craft/calendar/v6': calendarDocs,
  '/craft/ai-assistant/v1': [
    ['Installing & Updating', 'setup/installing-updating/'],
    ['User Guides', 'guides/getting-started/'],
    ['Configuration', 'configuration/'],
    ['Integrations', 'configuration/integrations/'],
    ['Developer', 'developer/api-endpoints/'],
  ],
  '/expressionengine/freeform/v3': [
    ['Installing & Updating', 'setup/installing-updating/'],
    ['User Guides', 'guides/getting-started/'],
    ['Configuration', 'configuration/settings/'],
    ['Forms', 'forms/forms-composer/'],
    ['Fields', 'forms/fields-field-types/'],
    ['Submission Data', 'submissions/overview/'],
    ['Integrations', 'integrations/crm/'],
    ['Templating', 'templating/form/'],
    ['Developer', 'developer/extension-hooks/'],
  ],
  '/expressionengine/calendar/v5': [
    ['Installing & Updating', 'setup/installing-updating/'],
    ['User Guides', 'guides/getting-started/'],
    ['Configuration', 'guides/control-panel/'],
    ['Templating', 'templating/events/'],
  ],
  '/craft/dark-mode/v1': [
    ['Installation & Updates', 'setup/installation/'],
    ['Using darkMode', 'users/'],
    ['Plugin Compatibility', 'compatibility/'],
    ['Plugin Development', 'developer/'],
  ],
};

export function LandingDocs({
  mobile,
  onClick,
}: Pick<Props, 'mobile' | 'onClick'>): React.JSX.Element | null {
  const { pathname } = useLocation();
  const landingPath = pathname.replace(/\/$/, '');
  const links = landingDocs[landingPath];

  if (!links) {
    return null;
  }

  return (
    <DropdownNavbarItem
      mobile={mobile}
      onClick={onClick}
      label="Docs"
      items={links.map(([label, path]) => ({
        label,
        to: `${landingPath}/${path}`,
        className: getDocSectionIconClass(label, 'dropdownLink'),
      }))}
    />
  );
}
