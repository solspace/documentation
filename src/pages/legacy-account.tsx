import type { JSX } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { Footer } from '@site/src/components/layout';
import landingStyles from '@site/src/components/layout/LandingPage.module.css';
import styles from './LegacyAccount.module.css';

export default function LegacyAccount(): JSX.Element {
  return (
    <Layout
      title="Legacy Account"
      description="Access licenses purchased through the original Solspace store."
    >
      <div className={landingStyles.shell}>
        <main className={`${landingStyles.page} ${landingStyles.readingPage}`}>
          <header className={landingStyles.intro}>
            <h1>Legacy Account</h1>
          </header>

          <div className={landingStyles.readingPanel}>
            <p>
              The legacy account is only for older licenses purchased directly
              from Solspace through its original online store.
            </p>
            <p>
              If you bought your license through the{' '}
              <a
                href="https://plugins.craftcms.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                Craft Plugin Store
              </a>{' '}
              or the{' '}
              <a
                href="https://expressionengine.com/add-ons/"
                target="_blank"
                rel="noopener noreferrer"
                className="external-link"
              >
                ExpressionEngine Add-ons Store
              </a>, use your account on that store.
            </p>
            <Link to="https://accounts.solspace.com/" className={styles.accountLink}>
              Open legacy account
            </Link>
          </div>
        </main>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer showDeveloperSupport={false} />
      </footer>
    </Layout>
  );
}
