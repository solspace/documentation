import type { JSX } from 'react';
import styles from './LandingPage.module.css';

export function WhySolspace({ productTerm }: { productTerm?: 'plugin' | 'add-on' }): JSX.Element {
  const supportSubject = productTerm === 'add-on' ? 'an add-on' : 'a plugin';

  return (
    <section className={styles.whySolspace} aria-labelledby="why-solspace">
      <h2 id="why-solspace">Why Solspace</h2>
      <div className={styles.reasons}>
        <div>
          <h3>Support from the Solspace team</h3>
          <p>{productTerm
            ? `Get help choosing ${supportSubject}, setting it up, or troubleshooting an issue.`
            : 'Get help choosing, setting up, or troubleshooting our software.'}</p>
        </div>
        <div>
          <h3>25+ years of experience</h3>
          <p>We’ve built and supported software for more than 30,000 customers.</p>
        </div>
        <div>
          <h3>Active development</h3>
          <p>{`We maintain our ${productTerm ? `${productTerm}s` : 'software'} with new features, improvements, and bug fixes.`}</p>
        </div>
      </div>
    </section>
  );
}
