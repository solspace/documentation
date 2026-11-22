import clsx from 'clsx';
import styles from './DocSectionIcons.module.css';

const iconsByLabel: Readonly<Partial<Record<string, string>>> = {
  overview: styles.overview,
  'how to buy': styles.purchase,
  'installing & updating': styles.install,
  'installation & updates': styles.install,
  'getting started': styles.guides,
  guides: styles.guides,
  'user guides': styles.guides,
  'using darkmode': styles.guides,
  setup: styles.configuration,
  configuration: styles.configuration,
  'forms & fields': styles.forms,
  forms: styles.forms,
  fields: styles.fields,
  'submission data': styles.submissions,
  'submissions data': styles.submissions,
  'form monitoring': styles.monitoring,
  integrations: styles.integrations,
  'plugin compatibility': styles.compatibility,
  templating: styles.templating,
  headless: styles.headless,
  developer: styles.developer,
  'plugin development': styles.developer,
  events: styles.events,
  calendars: styles.calendars,
  migrations: styles.migrations,
};

export function getDocSectionIconClass(label: string, placement: 'sidebarItem' | 'dropdownLink') {
  return clsx(styles[placement], iconsByLabel[label.trim().toLowerCase()] ?? styles.document);
}
