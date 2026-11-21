import styles from './EditionLabel.module.css';

const icons = {
  Express: 'M13.5 2.75 5.75 13h5.6l-.85 8.25L18.25 11h-5.6l.85-8.25Z',
  Lite: 'm12 3.5 8.5 4.8-8.5 4.8-8.5-4.8 8.5-4.8ZM3.5 12l8.5 4.8 8.5-4.8M3.5 15.8l8.5 4.7 8.5-4.7',
  Pro: 'M4 7h6m4 0h6M4 12h2m4 0h10M4 17h10m4 0h2'
    + 'M14 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM10 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM18 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
} as const;

export default function EditionLabel({ edition, watermark = false }: {
  edition: keyof typeof icons;
  watermark?: boolean;
}) {
  return (
    <span className={watermark ? `${styles.label} ${styles.watermark}` : styles.label} data-edition-label={edition}>
      <span className={styles.icon} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={watermark ? 1 : 1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d={icons[edition]} />
        </svg>
      </span>
      <span>{edition}</span>
    </span>
  );
}
