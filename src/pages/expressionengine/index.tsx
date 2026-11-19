import type { JSX } from 'react';
import Link from '@docusaurus/Link';
import { PluginListingPage } from '@site/src/components/layout/PluginListingPage';
import { expressionEngineAddOns } from '@site/src/components/layout/pluginListingData';

export default function ExpressionEngine(): JSX.Element {
  return (
    <PluginListingPage
      title="ExpressionEngine Add-ons"
      description="Explore Freeform and Calendar for ExpressionEngine CMS."
      heading="ExpressionEngine add-ons"
      intro={
        <>
          Build forms and manage events with Solspace add-ons for{' '}
          <Link to="https://expressionengine.com">ExpressionEngine</Link>.
        </>
      }
      productTerm="add-on"
      plugins={expressionEngineAddOns}
    />
  );
}
