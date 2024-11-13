import Layout from '@theme/Layout';
import { LeftNav, Footer } from '@site/src/components/layout';
import { PrimaryButtonWithLink } from '@site/src/components/utils';

export default function LegacyAccount(): JSX.Element {
  return (
    <Layout
      title="Legacy Account"
      description="The most dependable and user-friendly forms plugin for Craft CMS."
    >
      <div className="flex">
        <LeftNav />
        <div className="flex flex-col gap-3 md:ml-72 p-8">
          <main className="max-w-6xl m-auto my-3">
            <span className="page-section">Legacy Account</span>

            <h1>Legacy Account</h1>
            <p>
              Before the{' '}
              <a
                href="https://plugins.craftcms.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                Craft Plugin Store
              </a>{' '}
              and{' '}
              <a
                href="https://expressionengine.com/add-ons/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                ExpressionEngine Add-ons Store
              </a>{' '}
              existed, Solspace managed all purchases and downloads of licenses
              on its own website. It has been several years since it's been in
              operation, so chances are, you likely already have your license
              purchases or moved to the Craft/EE stores. In the event you still
              need to access old licenses on the Solspace store, you can view
              them by visiting your Solspace account here:
            </p>
            <PrimaryButtonWithLink
              to="https://accounts.solspace.com/"
              label="Solspace Legacy Account"
            />
          </main>
        </div>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer />
      </footer>
    </Layout>
  );
}
