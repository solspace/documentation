import type { JSX } from 'react';
import Link from '@docusaurus/Link';
import { PluginListingPage } from '@site/src/components/layout/PluginListingPage';
import { craftPlugins } from '@site/src/components/layout/pluginListingData';

export default function Craft(): JSX.Element {
  return (
    <PluginListingPage
      title="Craft CMS Plugins"
      description="Explore Freeform, Calendar, AI Assistant, and darkMode for Craft CMS."
      heading="Craft CMS plugins"
      intro={
        <>
          Build forms, manage events, create content, and customize the control panel with
          Solspace plugins for <Link to="https://craftcms.com">Craft CMS</Link>.
        </>
      }
      productTerm="plugin"
      plugins={craftPlugins}
    />
  );
}
