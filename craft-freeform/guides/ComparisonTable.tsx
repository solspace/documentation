import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import EditionLabel from '../EditionLabel';
import { editionPricing, editionPurchaseUrl } from '../editionPricing';
import styles from './compare-editions.module.css';

const editions = ['Express', 'Lite', 'Pro'] as const;

export default function ComparisonTable({ children }: { children: ReactNode }) {
  const pricing = useRef<HTMLElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [isHeaderPinned, setIsHeaderPinned] = useState(false);

  function syncScroll(scrollLeft: number) {
    for (const region of [pricing.current, labels.current, scroller.current]) {
      if (region && region.scrollLeft !== scrollLeft) region.scrollLeft = scrollLeft;
    }
  }

  useEffect(() => {
    const chart = scroller.current;
    const header = labels.current;
    if (!chart || !header) return;

    // The header and chart share a top edge until sticky positioning moves the header.
    function updateHeader() {
      setIsHeaderPinned(chart.getBoundingClientRect().top < header.getBoundingClientRect().top - 1);
    }

    syncScroll(chart.scrollLeft);
    updateHeader();
    const resizeObserver = new ResizeObserver(updateHeader);
    if (pricing.current) resizeObserver.observe(pricing.current);
    resizeObserver.observe(chart);
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, []);

  return (
    <div>
      <div className={styles.pricingArea}>
        <aside className={styles.pricingAside} aria-label="Free trial and compatibility">
          <div>
            <h2 className={styles.trialHeading}>Explore Freeform</h2>
            <Link className={styles.trialLink} to={editionPurchaseUrl}>
              <span>Start a free, unlimited trial</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className={styles.compatibility}>
            All editions support <Link to="/craft/freeform/v5/setup/installing-updating/#requirements">Craft 4, Craft 5, and Craft Cloud</Link>.
          </p>
        </aside>
        <p className={styles.scrollHint}>Scroll sideways to see all editions.</p>
        <section
          ref={pricing}
          className={styles.pricingScroller}
          aria-label="Edition pricing"
          tabIndex={0}
          onScroll={event => syncScroll(event.currentTarget.scrollLeft)}
        >
          <div className={styles.pricing}>
            <div className={styles.pricingGutter} aria-hidden="true" />
            {editions.map(name => {
              const { description, price, term, renewal } = editionPricing[name];
              return (
                <div key={name} className={styles.pricingCard} data-edition={name}>
                  <h2 className={styles.pricingName}><EditionLabel edition={name} watermark /></h2>
                  <p className={styles.pricingDescription}>{description}</p>
                  <p className={styles.price}><strong>{price}</strong> <span>{term}</span></p>
                  <p className={styles.renewal}>{renewal ?? 'No renewal'}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div ref={labels} className={styles.editionHeader} data-pinned={isHeaderPinned} aria-hidden="true">
        <div className={styles.editionLabels}>
          <span>Feature</span>
          {editions.map(name => <div key={name}><EditionLabel edition={name} /></div>)}
        </div>
      </div>
      <div
        ref={scroller}
        className={styles.table}
        role="region"
        aria-label="Freeform edition comparison"
        tabIndex={0}
        onScroll={event => syncScroll(event.currentTarget.scrollLeft)}
      >
        {children}
      </div>
    </div>
  );
}
