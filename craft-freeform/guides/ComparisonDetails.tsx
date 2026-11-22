import type { MouseEvent } from 'react';
import styles from './compare-editions.module.css';

function toggleRow(event: MouseEvent<HTMLElement>) {
  const disclosure = event.currentTarget.closest('details');
  const row = disclosure?.closest('tr');
  if (!disclosure || !row) return;

  const disclosures = row.querySelectorAll<HTMLDetailsElement>('details[data-comparison-details]');
  if (disclosures.length < 2) return;

  event.preventDefault();
  const open = !disclosure.open;
  disclosures.forEach(details => {
    details.open = open;
  });
}

export default function ComparisonDetails({label, items}: {
  label: string;
  items: string[];
}) {
  const scrollable = items.length > 12;

  return (
    <details data-comparison-details="">
      <summary onClick={toggleRow}>{label}</summary>
      <div className={styles.detailPanel}>
        <ul
          className={styles.detailList}
          data-scrollable={scrollable ? '' : undefined}
          tabIndex={scrollable ? 0 : undefined}
          aria-label={scrollable ? `${label} list` : undefined}
        >
          {items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
      {scrollable && <span className={styles.detailHint}>Scroll for all {items.length}</span>}
    </details>
  );
}
