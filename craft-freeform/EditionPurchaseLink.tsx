import Link from '@docusaurus/Link';
import clsx from 'clsx';
import { editionPricing, editionPurchaseUrl } from './editionPricing';
import styles from './EditionPurchaseLink.module.css';

export default function EditionPurchaseLink({ edition, className }: {
  edition: keyof typeof editionPricing;
  className?: string;
}) {
  return (
    <Link to={editionPurchaseUrl} className={clsx(styles.link, className)} data-edition={edition}>
      {editionPricing[edition].action}
    </Link>
  );
}
