import { useEffect, useRef, type PropsWithChildren } from 'react';
import styles from './intro.module.css';

export default function PricingEditions({ children }: PropsWithChildren) {
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grid.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        target.classList.add(styles.editionRevealed);
        observer.unobserve(target);
      }
    });

    for (const edition of Array.from(grid.current.children)) {
      observer.observe(edition);
    }

    return () => observer.disconnect();
  }, []);

  return <div className={styles.editions} ref={grid}>{children}</div>;
}
