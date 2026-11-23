import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';

interface Props {
  alt: string;
  className?: string;
  onBlue?: boolean;
}

export default function FreeformWordmark({ alt, className, onBlue }: Props) {
  const icon = useBaseUrl('/icons/cards/freeform-blue.svg');
  const light = useBaseUrl('/img/intro/freeform-light.png');
  const dark = useBaseUrl('/img/intro/freeform-dark.png');

  return (
    <span className={[styles.logo, className].filter(Boolean).join(' ')}>
      <img className={styles.icon} src={icon} width={82} height={82} alt="" />
      <span className={styles.wordmark}>
        <ThemedImage sources={{ light: onBlue ? dark : light, dark }} width={1929} height={520} alt={alt} />
      </span>
    </span>
  );
}
