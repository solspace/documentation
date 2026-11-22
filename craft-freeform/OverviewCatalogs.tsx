import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { fieldCatalog } from './forms/fields/catalog';
import { alphabeticalIntegrations, integrationGroups } from './integrations/catalog';
import styles from './intro.module.css';

const contentIntegrationDocs = './configuration/content-integrations/';
const contentBlockDocs = `${contentIntegrationDocs}#matrix-neo-and-content-block-fields`;
const formLinkDocs = `${contentIntegrationDocs}#form-links`;

const contentIntegrations: IconItem[] = [
  { title: 'CKEditor', icon: 'craftcms-ckeditor', iconDirectory: 'plugins', link: `${contentIntegrationDocs}#ckeditor-59` },
  { title: 'Vizy', icon: 'verbb-vizy', iconDirectory: 'plugins', link: `${contentIntegrationDocs}#vizy-4` },
  { title: 'Navigation', icon: 'verbb-navigation', iconDirectory: 'plugins', link: `${contentIntegrationDocs}#navigation-3x-and-4x-on-craft-5` },
  { title: 'Hyper', icon: 'verbb-hyper', iconDirectory: 'plugins', link: `${contentIntegrationDocs}#hyper-fields` },
  { title: 'Linkit', icon: 'presseddigital-linkit', iconDirectory: 'plugins', link: formLinkDocs },
  { title: 'Neo', icon: 'spicyweb-craft-neo', iconDirectory: 'plugins', iconClassName: 'dark:brightness-90 dark:contrast-75 dark:invert', link: contentBlockDocs },
  { title: 'Craft Link', icon: 'craft-link', link: formLinkDocs },
  { title: 'Matrix', icon: 'craft-matrix', link: contentBlockDocs },
  { title: 'Content Block', icon: 'craft-content-block', link: contentBlockDocs },
];

const frameworks = [
  { title: 'Tailwind CSS', icon: 'tailwind', link: './templates/formatting/tailwind/' },
  { title: 'daisyUI', icon: 'daisyui', link: './templates/formatting/daisyui/' },
  { title: 'Bootstrap', icon: 'bootstrap', link: './templates/formatting/bootstrap/' },
  { title: 'React', icon: 'react', link: './headless/reactjs/' },
  { title: 'Next.js', icon: 'nextjs', link: './headless/nextjs/', filterIcon: true },
  { title: 'Vue.js', icon: 'vue', link: './headless/vuejs/' },
  { title: 'Nuxt', icon: 'nuxt', link: './headless/nuxt/' },
];

interface IconItem {
  title: string;
  icon: string;
  link: string;
  proOnly?: boolean;
  filterIcon?: boolean;
  color?: string;
  iconDirectory?: 'plugins';
  iconClassName?: string;
}

function withOverviewLink(item: IconItem): IconItem {
  return {
    ...item,
    link: item.link.startsWith('../')
      ? `./${item.link.slice(3)}`
      : `./integrations/${item.link.slice(2)}`,
  };
}

const spamProtectionLinks = integrationGroups.spam.map(withOverviewLink);
const spamProtectionTitles = new Set(spamProtectionLinks.map(item => item.title));
const integrationLinks = alphabeticalIntegrations
  .filter(item => !spamProtectionTitles.has(item.title))
  .map(withOverviewLink);

const logoPositions = {
  12: [
    [12, 24, 0.85], [29, 12, 0.3], [49, 18, 0.58], [70, 12, 0.98], [88, 24, 0.34], [8, 51, 0.72],
    [92, 53, 0.48], [88, 78, 0.12], [70, 88, 0.65], [50, 81, 0.37], [30, 89, 0.77], [12, 77, 0.22],
  ],
  9: [
    [13, 26, 0.82], [31, 13, 0.47], [51, 20, 0.19], [72, 12, 0.98], [89, 28, 0.58],
    [88, 74, 0.35], [68, 86, 0.77], [41, 83, 0.28], [15, 74, 0.62],
  ],
  7: [[12, 25, 0.95], [37, 13, 0.31], [67, 16, 0.72], [90, 32, 0.99], [90, 73, 0.52], [56, 87, 0.65], [12, 77, 0.41]],
} as const;

type LogoPosition = readonly [x: number, y: number, depth: number];

function placeTooltip(link: HTMLAnchorElement) {
  const tooltip = link.querySelector<HTMLElement>('[data-icon-tooltip]');
  if (!tooltip) return;

  tooltip.removeAttribute('data-dismissed');
  tooltip.style.removeProperty('--tooltip-offset');
  tooltip.removeAttribute('data-below');
  const bounds = tooltip.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const offset = Math.max(0, 8 - bounds.left) - Math.max(0, bounds.right - viewportWidth + 8);
  tooltip.style.setProperty('--tooltip-offset', `${offset}px`);
  if (bounds.top < 8) tooltip.setAttribute('data-below', '');
}

function IconGrid({ items, icons, positions }: {
  items: IconItem[];
  icons: 'fields' | 'integrations';
  positions?: readonly LogoPosition[];
}) {
  const iconBase = useBaseUrl('/icons');
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function dismissTooltip(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      grid.current?.querySelectorAll('a:is(:hover, :focus-visible) [data-icon-tooltip]').forEach(tooltip => {
        tooltip.setAttribute('data-dismissed', '');
      });
    }

    document.addEventListener('keydown', dismissTooltip);
    return () => document.removeEventListener('keydown', dismissTooltip);
  }, []);

  return (
    <ul ref={grid} className={styles.iconGrid} data-icons={icons} data-cloud={positions ? '' : undefined}>
      {items.map(({ title, icon, link, proOnly, filterIcon, color, iconDirectory, iconClassName }, index) => {
        const iconUrl = `${iconBase}/${iconDirectory ?? icons}/${icon}.svg`;
        const position = positions?.[index];

        return (
          <li key={title} style={position && {
            '--logo-x': `${position[0]}%`,
            '--logo-y': `${position[1]}%`,
            '--logo-depth': position[2],
            '--orbit-delay': `-${index * 2 + position[2] * 4}s`,
          } as CSSProperties}>
            <Link
              to={link}
              aria-label={proOnly ? `${title} (Freeform Pro)` : title}
              onPointerEnter={event => {
                if (event.pointerType !== 'touch') placeTooltip(event.currentTarget);
              }}
              onFocus={event => placeTooltip(event.currentTarget)}
            >
              <span
                className={styles.iconArt}
                data-field-color={filterIcon ? color : undefined}
                style={{ '--icon-mask': `url("${iconUrl}")` } as CSSProperties}
              >
                <img src={iconUrl} alt="" width={36} height={36} loading="lazy" className={filterIcon ? 'filter-icons' : iconClassName} />
              </span>
              {!positions && <span className={styles.iconName} aria-hidden="true">{title}</span>}
              <span className={styles.iconTooltip} data-icon-tooltip aria-hidden="true">{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function LogoCloud({ items, children }: { items: IconItem[]; children: ReactNode }) {
  const positions = logoPositions[items.length as keyof typeof logoPositions];

  return (
    <div className={styles.logoCloud} data-positioned={positions ? '' : undefined}>
      <div className={styles.cloudActions}>{children}</div>
      <IconGrid icons="integrations" items={items} positions={positions} />
    </div>
  );
}

export default function OverviewCatalogs() {
  return (
    <section className={styles.catalogs} aria-labelledby="catalog-heading">
      <div className={styles.catalogHeader}>
        <h2 id="catalog-heading">Customize and <span>connect.</span></h2>
      </div>
      <section className={styles.catalogBand} id="available-field-types" aria-labelledby="fields-heading">
        <div className={styles.sectionIntro}>
          <h3 id="fields-heading">30+ field types</h3>
          <p>From text and file uploads to calculations, signatures, and payments.</p>
          <Link to="./forms/fields/" className={`${styles.textAction} ${styles.outlinedAction}`}><span>Explore field types</span><span aria-hidden="true">→</span></Link>
        </div>
        <IconGrid icons="fields" items={fieldCatalog.map(item => ({
          ...item,
          link: `./forms/fields/${item.link.slice(2)}`,
        }))} />
      </section>
      <section className={styles.catalogBand} id="integrations" aria-labelledby="integration-directory">
        <div id="connect-and-extend" className={styles.sectionIntro}>
          <h3 id="integration-directory">Integrations</h3>
          <p>
            Connect forms to CRMs and payment providers, send{' '}
            <Link id="email-notifications" to="./forms/email-notifications/">email notifications</Link>, and extend Freeform with{' '}
            <Link id="and-more" to="./developer/events/form/">developer events</Link>.
          </p>
          <Link to="./integrations/" className={`${styles.textAction} ${styles.outlinedAction}`}><span>Browse integration docs</span><span aria-hidden="true">→</span></Link>
        </div>
        <IconGrid icons="integrations" items={integrationLinks} />
      </section>
      <div className={styles.catalogGroups}>
        <section className={styles.catalogGroup} id="spam-protection" aria-labelledby="spam-protection-heading" data-tone="teal">
          <div className={styles.sectionIntro}>
            <h3 id="spam-protection-heading">Spam protection</h3>
            <p>Filter unwanted submissions with built-in checks, CAPTCHAs, and AI spam analysis.</p>
          </div>
          <LogoCloud items={spamProtectionLinks}>
            <Link to="./forms/spam-protection/" className={styles.textAction}><span>See spam tools</span><span aria-hidden="true">→</span></Link>
          </LogoCloud>
        </section>
        <section className={styles.catalogGroup} id="content-integrations" aria-labelledby="content-integrations-heading" data-tone="blue">
          <div className={styles.sectionIntro}>
            <h3 id="content-integrations-heading">Content integrations</h3>
            <p>
              Embed forms in Craft 5 editors, menus, link fields, and content blocks.{' '}
              <Link id="translatable-forms" to="./configuration/sites/#translations">Translate per site</Link>.
            </p>
          </div>
          <LogoCloud items={contentIntegrations}>
            <Link to={`${contentIntegrationDocs}#supported-plugins-and-content-types`} className={styles.textAction} aria-label="See what’s supported by the content integrations"><span>See what’s supported</span><span aria-hidden="true">→</span></Link>
          </LogoCloud>
        </section>
        <section className={styles.catalogGroup} id="frameworks" aria-labelledby="frameworks-heading" data-tone="purple">
          <div className={styles.sectionIntro}>
            <h3 id="frameworks-heading">Front-end frameworks</h3>
            <p>Start with a template or build a headless front end.</p>
          </div>
          <LogoCloud items={frameworks}>
            <Link id="flexible-templating" to="./templates/formatting/" className={styles.textAction}><span>Starter templates</span><span aria-hidden="true">→</span></Link>
            <Link id="headless" to="./headless/" className={styles.textAction}><span>Headless forms</span><span aria-hidden="true">→</span></Link>
          </LogoCloud>
        </section>
      </div>
    </section>
  );
}
