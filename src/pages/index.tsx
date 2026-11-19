import type { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Footer } from '@site/src/components/layout';
import { WhySolspace } from '@site/src/components/layout/WhySolspace';
import { craftPlugins, expressionEngineAddOns } from '@site/src/components/layout/pluginListingData';
import landingStyles from '@site/src/components/layout/LandingPage.module.css';
import listingStyles from '@site/src/components/layout/PluginListingPage.module.css';
import styles from './Home.module.css';

const platforms = [
  {
    id: 'craft',
    name: 'Craft CMS',
    heading: 'Craft CMS plugins',
    path: '/craft/',
    items: craftPlugins,
  },
  {
    id: 'expressionengine',
    name: 'ExpressionEngine',
    heading: 'ExpressionEngine add-ons',
    path: '/expressionengine/',
    items: expressionEngineAddOns,
  },
];

export default function Home(): JSX.Element {
  const iconBase = useBaseUrl('/icons/cards');

  return (
    <Layout
      title="Documentation"
      description="Browse Solspace documentation for Craft CMS plugins and ExpressionEngine add-ons."
    >
      <div className={landingStyles.shell}>
        <main className={landingStyles.page}>
          <header className={landingStyles.intro}>
            <h1>Software documentation</h1>
            <p>
              Find guides and product documentation for Solspace’s{' '}
              <Link to="https://craftcms.com">Craft CMS</Link> plugins and{' '}
              <Link to="https://expressionengine.com">ExpressionEngine</Link> add-ons.
            </p>
          </header>

          <div className={styles.platforms}>
            {platforms.map((platform) => (
              <section
                key={platform.id}
                id={platform.id}
                className={styles.platform}
                aria-labelledby={`${platform.id}-heading`}
              >
                <header className={styles.platformHeader}>
                  <h2 id={`${platform.id}-heading`}>{platform.heading}</h2>
                  <Link
                    className={styles.platformLink}
                    to={platform.path}
                    aria-label={`View all ${platform.heading}`}
                  >
                    View all
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 10h12m-5-5 5 5-5 5" />
                    </svg>
                  </Link>
                </header>

                <div className={styles.cards}>
                  {platform.items.map(({ id, name, icon = id, headline, summary = headline, path }) => {
                    const summaryId = `${platform.id}-${id}-summary`;

                    return (
                      <Link
                        key={id}
                        className={`${listingStyles.palette} ${styles.card}`}
                        data-plugin={id}
                        to={path}
                        aria-label={`${name} for ${platform.name}`}
                        aria-describedby={summaryId}
                      >
                        <span className={styles.watermark} aria-hidden="true">
                          <img src={`${iconBase}/${icon}.svg#art`} alt="" width={144} height={144} />
                        </span>
                        <img className={styles.icon} src={`${iconBase}/${icon}.svg`} alt="" width={36} height={36} />
                        <h3>{name}</h3>
                        <svg className={styles.cardArrow} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 10h12m-5-5 5 5-5 5" />
                        </svg>
                        <p id={summaryId}>{summary}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <WhySolspace />
        </main>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer showDeveloperSupport={false} />
      </footer>
    </Layout>
  );
}
