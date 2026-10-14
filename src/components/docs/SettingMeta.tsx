import styles from './SettingMeta.module.css';

type Props = {
  configKey: string;
  defaultValue: string;
  example?: string;
};

export function SettingMeta({configKey, defaultValue, example}: Props) {
  return (
    <dl className={styles.metadata}>
      <div><dt>Configuration key</dt><dd><code>{configKey}</code></dd></div>
      <div><dt>Default</dt><dd><code>{defaultValue}</code></dd></div>
      {example && <div><dt>Example</dt><dd><code>{example}</code></dd></div>}
    </dl>
  );
}
