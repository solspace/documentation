import type { JSX, ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { Footer } from './Footer';
import { WhySolspace } from './WhySolspace';
import type { PluginListingItem } from './pluginListingData';
import landingStyles from './LandingPage.module.css';
import styles from './PluginListingPage.module.css';

interface Props {
  title: string;
  description: string;
  heading: string;
  intro: ReactNode;
  productTerm: 'plugin' | 'add-on';
  plugins: readonly PluginListingItem[];
}

export function PluginListingPage({ title, description, heading, intro, productTerm, plugins }: Props): JSX.Element {
  const iconBase = useBaseUrl('/icons/cards');
  const imageBase = useBaseUrl('/img');

  return (
    <Layout
      title={title}
      description={description}
    >
      <div className={landingStyles.shell}>
        <main className={landingStyles.page}>
          <header className={landingStyles.intro}>
            <h1>{heading}</h1>
            <p>{intro}</p>
          </header>

          <div className={styles.pluginList}>
            {plugins.map(({ id, name, icon = id, path, guide = 'guides/getting-started/', headline, description, features, image }, index) => (
              <section key={id} id={id} data-plugin={id} className={`${styles.palette} ${styles.plugin}`} aria-labelledby={`${id}-heading`}>
                <div className={styles.watermark} aria-hidden="true">
                  <img src={`${iconBase}/${icon}.svg#art`} alt="" width={416} height={416} />
                </div>
                <div>
                  <h2 id={`${id}-heading`} className={styles.pluginName}>
                    <img src={`${iconBase}/${icon}.svg`} alt="" width={36} height={36} />
                    {name}
                  </h2>
                  <p className={styles.headline}>{headline}</p>
                  <p className={styles.description}>{description}</p>
                  <ul className={styles.features}>
                    {features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <div className={styles.cardActions}>
                    <Link className={styles.cardAction} to={path}>
                      Explore {name}
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 10h12m-5-5 5 5-5 5" />
                      </svg>
                    </Link>
                    <Link
                      className={`${styles.cardAction} ${styles.docsAction}`}
                      to={`${path}${guide}`}
                      aria-describedby={`${id}-heading`}
                    >
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M10 5.5C8 4 5.5 3.5 2.5 4.5v10c3-1 5.5-.5 7.5 1 2-1.5 4.5-2 7.5-1v-10c-3-1-5.5-.5-7.5 1Zm0 0v10" />
                      </svg>
                      Read the docs
                    </Link>
                  </div>
                </div>
                <div className={styles.screenshotFrame}>
                  <img
                    className={styles.screenshot}
                    src={`${imageBase}/${image.src}`}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              </section>
            ))}
          </div>

          <WhySolspace productTerm={productTerm} />
        </main>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer showDeveloperSupport={false} />
      </footer>
    </Layout>
  );
}
