import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory, useLocation } from '@docusaurus/router';
import useIsomorphicLayoutEffect from '@docusaurus/useIsomorphicLayoutEffect';
import NotFound from '@theme/NotFound';
import { useColorMode } from '@docusaurus/theme-common';
import { Children, createContext, isValidElement, useContext, useEffect, useRef, useState, useSyncExternalStore, type ComponentProps, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createStripePaymentExtension, recommendedExtensions } from '@solspace/freeform-extensions';
import { builtinComponents } from '@solspace/freeform-react';
import { darkTheme, lightTheme } from '@solspace/freeform-theme-default';
import DocsFreeform from '@site/src/components/forms/DocsFreeform';
import { Footer } from '@site/src/components/layout';
import allPlugins from '@site/allPlugins.json';
import DevelopmentServices from './DevelopmentServices';
import SupportSelect from './SupportSelect';
import { isVersionHintField, SupportHtmlNotice, SupportVersionField } from './SupportNotices';
import styles from './SupportPage.module.css';

const priorityUrl = '/support/priority/';
const termsQuery = '(min-width: 900px)';

function subscribeToTermsLayout(update: () => void) {
  const query = window.matchMedia(termsQuery);
  query.addEventListener('change', update);
  return () => query.removeEventListener('change', update);
}

const useSideTerms = () => useSyncExternalStore(
  subscribeToTermsLayout,
  () => window.matchMedia(termsQuery).matches,
  () => false,
);

const SupportMode = createContext<{
  priority: boolean;
  price: string;
  sideTerms: HTMLElement | null;
  setPrice: (price: string) => void;
}>(null);

const SupportCms = createContext(false);

function SupportLabel({ field, ...props }: ComponentProps<typeof builtinComponents.Label>) {
  const isExpressionEngine = useContext(SupportCms);
  const displayField = isExpressionEngine
    ? { ...field, label: field.label?.replace(/\bplugin\b/gi, 'Add-on') }
    : field;
  return <builtinComponents.Label {...props} field={displayField} />;
}

function SupportField({ field, ...props }: ComponentProps<typeof builtinComponents.FieldWrapper>) {
  const { sideTerms } = useContext(SupportMode);
  if (field.handle === 'supportLevel' || isVersionHintField(field)) return null;

  const content = <builtinComponents.FieldWrapper {...props} field={field} />;
  return field.handle === 'prioritySupport' && sideTerms ? createPortal(content, sideTerms) : content;
}

function SupportNextButton(props: ComponentProps<typeof builtinComponents.NextButton>) {
  const { priority } = useContext(SupportMode);
  return <builtinComponents.NextButton {...props} label={priority ? 'Continue to payment' : props.label} />;
}

function SupportPageFields({ children, ...props }: ComponentProps<typeof builtinComponents.Page>) {
  const { priority } = useContext(SupportMode);
  if (!priority || props.pageIndex !== 0) {
    return <builtinComponents.Page {...props}>{children}</builtinComponents.Page>;
  }

  const layout = props.form.manifest.layout.pages[props.pageIndex];
  const optIn = layout?.rows.find((row) => row.fields.length === 1 && row.fields[0] === 'subscribe');
  const terms = layout?.rows.find((row) => row.fields.includes('prioritySupport'));
  const rows: ReactNode[] = [];
  Children.forEach(children, (row) => rows.push(row));
  const optInIndex = rows.findIndex((row) => isValidElement(row) && row.key === optIn?.uid);
  const termsIndex = rows.findIndex((row) => isValidElement(row) && row.key === terms?.uid);
  if (termsIndex >= 0 && optInIndex > termsIndex) {
    const [optInRow] = rows.splice(optInIndex, 1);
    rows.splice(termsIndex, 0, optInRow);
  }

  return <builtinComponents.Page {...props}>{rows}</builtinComponents.Page>;
}

function SupportButtonRow({ children, ...props }: ComponentProps<typeof builtinComponents.ButtonRow>) {
  const { priority, price } = useContext(SupportMode);
  return (
    <builtinComponents.ButtonRow {...props}>
      {children}
      {!priority && (
        <Link className={styles.prioritySwitch} to={priorityUrl}>
          Switch to Priority Support{price && ` (${price})`}
        </Link>
      )}
    </builtinComponents.ButtonRow>
  );
}

function SupportForm({ children, ...props }: ComponentProps<typeof builtinComponents.Form>) {
  const { priority, setPrice } = useContext(SupportMode);
  const { currentPageIndex, fieldErrors, formErrors, pageErrors, goBack, isSubmitting, manifest, setValue, values } = props.form;
  const returningToStandard = !priority && currentPageIndex > 0;
  const attemptedReturn = useRef(false);
  const level = priority ? 'priority' : 'standard';
  const cmsValue = String(values.cms ?? '');
  const cmsLabel = manifest.fields.cms?.options?.find((option) => option.value === cmsValue)?.label ?? cmsValue;
  const isExpressionEngine = /^expressionengine(?:\s|\d|$)/i.test(cmsLabel.trim());

  useEffect(() => {
    const label = manifest.fields.supportLevel?.options?.find((option) => option.value === 'priority')?.label;
    setPrice(label?.match(/\$[\d,.]+/)?.[0] ?? '');
  }, [manifest, setPrice]);

  useEffect(() => {
    if (returningToStandard) {
      if (!attemptedReturn.current && !isSubmitting) {
        attemptedReturn.current = true;
        void goBack();
      }
      return;
    }

    attemptedReturn.current = false;
    if (values.supportLevel !== level) setValue('supportLevel', level);
  }, [goBack, isSubmitting, level, returningToStandard, setValue, values.supportLevel]);

  if (returningToStandard) {
    return (
      <div className={props.className}>
        {isSubmitting ? <p role="status">Returning to ticket details…</p> : (
          <>
            <builtinComponents.Errors errors={[...formErrors, ...pageErrors]} />
            <builtinComponents.BackButton label="Return to ticket details" onClick={() => void goBack()} />
          </>
        )}
      </div>
    );
  }

  const showSummary = !formErrors.length &&
    (pageErrors.length > 0 || Object.values(fieldErrors).some((errors) => errors.length > 0));

  return (
    <SupportCms.Provider value={isExpressionEngine}>
      <builtinComponents.Form {...props}>
        {showSummary && (
          <p className={styles.errorSummary} role="alert">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM7.47 7.47a.75.75 0 0 1 1.06 0L10 8.94l1.47-1.47a.75.75 0 0 1 1.06 1.06L11.06 10l1.47 1.47a.75.75 0 0 1-1.06 1.06L10 11.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L8.94 10 7.47 8.53a.75.75 0 0 1 0-1.06Z" />
            </svg>
            Please review the highlighted fields and try again.
          </p>
        )}
        {children}
      </builtinComponents.Form>
    </SupportCms.Provider>
  );
}

const supportFormRenderer = {
  handles: {
    subject: SupportSelect,
    cms: SupportSelect,
    product: SupportSelect,
    edition: SupportSelect,
    version: SupportVersionField,
  },
  types: { html: SupportHtmlNotice },
  components: {
    Form: SupportForm,
    FieldWrapper: SupportField,
    Label: SupportLabel,
    Page: SupportPageFields,
    NextButton: SupportNextButton,
    ButtonRow: SupportButtonRow,
  },
};
const supportThemes = {
  dark: { ...darkTheme, renderers: supportFormRenderer },
  light: { ...lightTheme, renderers: supportFormRenderer },
};

function createSupportExtensions(mode: 'dark' | 'light') {
  const isDark = mode === 'dark';
  const colorPrimary = isDark ? '#3b82f6' : '#2563eb';
  const colorDanger = isDark ? '#ff8b82' : '#b42318';
  const colorBackground = isDark ? '#1e242b' : '#ffffff';
  const colorBorder = isDark ? '#353b42' : '#bac6d7';
  const stripe = createStripePaymentExtension({
    theme: isDark ? 'night' : 'stripe',
    variables: {
      colorPrimary,
      colorBackground,
      colorText: isDark ? '#ffffff' : '#132139',
      colorTextSecondary: isDark ? '#d1d5db' : '#4b5870',
      colorTextPlaceholder: isDark ? '#9ca3af' : '#626f84',
      colorDanger,
      fontFamily: 'sans-serif',
      fontSizeBase: '16px',
      spacingUnit: '4px',
      borderRadius: '6px',
      gridColumnSpacing: '16px',
      gridRowSpacing: '16px',
    },
    rules: {
      '.Label': { fontSize: '14px', fontWeight: '500', marginBottom: '4px' },
      '.Input': {
        padding: '6px 12px',
        lineHeight: '22px',
        border: `1px solid ${colorBorder}`,
        boxShadow: 'none',
      },
      '.Input:focus': {
        borderColor: colorPrimary,
        boxShadow: `0 0 0 1px ${colorPrimary}`,
      },
      '.Input--invalid': {
        borderColor: colorDanger,
        boxShadow: 'none',
      },
      '.Block': {
        border: `1px solid ${colorBorder}`,
        backgroundColor: colorBackground,
        boxShadow: 'none',
      },
    },
  });
  return recommendedExtensions.map((extension) => extension.name === stripe.name ? stripe : extension);
}

const supportExtensions = {
  dark: createSupportExtensions('dark'),
  light: createSupportExtensions('light'),
};

function TicketForm() {
  const { colorMode } = useColorMode();

  return (
    <DocsFreeform
      handle="support"
      theme={supportThemes[colorMode]}
      extensions={supportExtensions[colorMode]}
      // The support team's conditional notices and Priority Support terms contain HTML.
      allowRawHtml
      fallback={(
        <iframe
          title="Support Form"
          src="https://support.solspace.com/software/support"
          height="850"
          width="100%"
          className="block border-0"
        />
      )}
    />
  );
}

const githubLabels = {
  issues: 'GitHub Issues',
  discussions: 'GitHub Discussions',
};

type CommunityDestinations = {
  questions: string;
  github?: { repository: string; channels: (keyof typeof githubLabels)[] };
};

const craftCommunity: CommunityDestinations = {
  questions: 'https://craftcms.stackexchange.com/questions/tagged/solspace',
};

const communityDestinations: Record<string, CommunityDestinations> = {
  '/craft/freeform': {
    questions: 'https://craftcms.stackexchange.com/questions/tagged/plugin-freeform',
    github: { repository: 'craft-freeform', channels: ['issues', 'discussions'] },
  },
  '/craft/calendar': {
    questions: 'https://craftcms.stackexchange.com/questions/tagged/plugin-solspacecalendar',
    github: { repository: 'craft-calendar', channels: ['issues', 'discussions'] },
  },
  '/craft/ai-assistant': {
    ...craftCommunity,
    github: { repository: 'craft-aiassistant', channels: ['issues'] },
  },
  '/craft/dark-mode': {
    ...craftCommunity,
    github: { repository: 'craft-dark-mode', channels: ['issues', 'discussions'] },
  },
  '/expressionengine/freeform': {
    questions: 'https://expressionengine.stackexchange.com/questions/tagged/solspace-freeform',
  },
  '/expressionengine/calendar': {
    questions: 'https://expressionengine.stackexchange.com/questions/tagged/solspace-calendar',
  },
};

const pluginIcons: Record<string, string> = {
  Freeform: 'freeform',
  Calendar: 'calendar',
  'AI Assistant': 'ai-assistant',
  darkMode: 'dark-mode',
};

const communityPlatforms = allPlugins.map((platform) => ({
  ...platform,
  name: platform.name === 'Craft' ? 'Craft CMS' : platform.name,
}));

function PublicSupport() {
  const [pluginSlug, setPluginSlug] = useState('');
  const picker = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLElement>(null);
  const icons = useBaseUrl('/icons/cards');
  const communityIcons = useBaseUrl('/icons/support');
  const platform = communityPlatforms.find(({ items }) => items.some(({ slug }) => slug === pluginSlug));
  const plugin = platform?.items.find(({ slug }) => slug === pluginSlug);
  const destinations = communityDestinations[pluginSlug] ??
    (pluginSlug.startsWith('/craft/') ? craftCommunity : undefined);
  const github = destinations?.github;
  const isCraft = platform?.slug === '/craft';

  function closePicker() {
    if (picker.current) picker.current.open = false;
    trigger.current?.focus();
  }

  return (
    <article className={styles.publicOption}>
      <h2>Public support</h2>
      <p>Find community help for your plugin.</p>
      <details
        className={styles.pluginPicker}
        ref={picker}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && event.currentTarget.open) {
            event.preventDefault();
            closePicker();
          }
        }}
      >
        <summary ref={trigger}>
          {plugin ? (
            <>
              <img src={`${icons}/${pluginIcons[plugin.name] ?? 'support'}.svg`} alt="" width={24} height={24} />
              <span className={styles.pluginSelection}>{plugin.name}<small>{platform.name}</small></span>
            </>
          ) : (
            <span>Choose a plugin</span>
          )}
          <span className={styles.pickerChevron} aria-hidden="true" />
        </summary>
        <div className={styles.pluginMenu}>
          {communityPlatforms.map(({ slug: platformSlug, name, items }) => (
            <div className={styles.pluginGroup} key={platformSlug} role="group" aria-label={name}>
              <p>{name}</p>
              {items.map(({ name: pluginName, slug }) => (
                <button
                  key={slug}
                  type="button"
                  aria-pressed={slug === pluginSlug}
                  onClick={() => {
                    setPluginSlug(slug);
                    closePicker();
                  }}
                >
                  <img src={`${icons}/${pluginIcons[pluginName] ?? 'support'}.svg`} alt="" width={24} height={24} />
                  <span>{pluginName}</span>
                  {slug === pluginSlug && <span className={styles.pluginCheck} aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      </details>
      {destinations && (
        <div className={styles.communityLinks}>
          {github?.channels.map((channel) => (
            <Link
              key={channel}
              className={styles.optionLink}
              to={`https://github.com/solspace/${github.repository}/${channel}`}
            >
              <img className={styles.githubMark} src={`${icons}/github.svg`} alt="" width={18} height={18} />
              <span className={styles.linkLabel}>{githubLabels[channel]}</span> <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link className={styles.optionLink} to={destinations.questions}>
            <img
              src={`${communityIcons}/${isCraft ? 'craftcms-stackexchange' : 'expressionengine-answers'}.png`}
              alt=""
              width={18}
              height={18}
            />
            <span className={styles.linkLabel}>{isCraft ? 'Craft CMS Stack Exchange' : 'ExpressionEngine Answers'}</span>{' '}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </article>
  );
}

export default function SupportPage({ view = 'ticket' }: { view?: 'ticket' | 'development' }) {
  const location = useLocation();
  const history = useHistory();
  const ticketPath = useBaseUrl('/support/');
  const priorityPath = useBaseUrl(priorityUrl);
  const pathname = location.pathname.replace(/\/?$/, '/');
  const isDevelopment = view === 'development';
  const legacyPriority = pathname === ticketPath && location.hash === '#priority';
  const priority = !isDevelopment && pathname === priorityPath;
  const [price, setPrice] = useState('');
  const [termsHost, setTermsHost] = useState<HTMLElement | null>(null);
  const sideTerms = useSideTerms() ? termsHost : null;
  const tabScroll = useRef<{ pathname: string; top: number } | null>(null);

  useEffect(() => {
    if (legacyPriority) history.replace({ pathname: priorityPath, search: location.search });
  }, [history, legacyPriority, location.search, priorityPath]);

  useIsomorphicLayoutEffect(() => {
    const pendingScroll = tabScroll.current;
    tabScroll.current = null;
    if (pendingScroll?.pathname !== pathname) return;

    // Docusaurus scrolls on route changes. Restore the position before paint for tab switches.
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: pendingScroll.top, behavior: 'instant' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  function preserveTabScroll(event: MouseEvent<HTMLAnchorElement>, destination: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    if (isDevelopment) return;
    if (pathname === destination) {
      event.preventDefault();
    } else {
      tabScroll.current = { pathname: destination, top: window.scrollY };
    }
  }

  if (!isDevelopment && pathname !== ticketPath && pathname !== priorityPath) return <NotFound />;

  return (
    <Layout
      title={isDevelopment ? 'Custom Development Services' : 'Software Support'}
      description="Get help with Solspace plugins, ask a question before purchasing, or talk to us about custom development."
    >
      <div className={styles.supportShell}>
        <main className={styles.supportPage}>
          <header className={styles.intro}>
            <h1>Software Support</h1>
            <p>
              Get help with a Solspace plugin, ask a question before buying, or talk to us about a custom project.
            </p>
          </header>
          <SupportMode.Provider value={{ priority, price, setPrice, sideTerms }}>
            <div
              className={isDevelopment ? styles.developmentLayout : styles.supportLayout}
              data-priority={priority || undefined}
            >
              <nav className={styles.supportViews} aria-label="Support options">
                <Link to="/support/" onClick={(event) => preserveTabScroll(event, ticketPath)} aria-current={!isDevelopment && !priority ? 'page' : undefined}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 14a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2ZM8 8.5h8m-8 4h5" />
                  </svg>
                  Support ticket
                </Link>
                <Link className={styles.priorityView} to={priorityUrl} onClick={(event) => preserveTabScroll(event, priorityPath)} aria-current={priority ? 'page' : undefined}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m13 2-9 12h7l-1 8 10-12h-7l1-8Z" />
                  </svg>
                  <span>Priority Support</span>
                </Link>
                <Link to="/support/custom-development/" aria-current={isDevelopment ? 'page' : undefined}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-13-4 16" />
                  </svg>
                  Custom development
                </Link>
              </nav>
              {isDevelopment ? <DevelopmentServices /> : (
                <div className={styles.supportContent} data-priority={priority || undefined}>
                  <section className={styles.ticketPanel} aria-labelledby="support-ticket-heading">
                    {priority && <aside className={styles.priorityTerms} aria-label="Priority Support terms" ref={setTermsHost} />}
                    <div className={styles.ticketPanelBody}>
                      <header className={styles.ticketIntro}>
                        <div>
                          <h2 id="support-ticket-heading">{priority ? 'Request Priority Support' : 'Create a support ticket'}</h2>
                          <p>
                            {priority
                              ? 'Get expedited help from the Solspace team.'
                              : 'Send us a private ticket and we’ll reply by email.'}
                          </p>
                        </div>
                        {priority && price && <span className={styles.priorityPrice}>{price}</span>}
                      </header>
                      <div id="support-form" className={styles.supportForm}>
                        <TicketForm />
                      </div>
                    </div>
                  </section>
                  {!priority && (
                    <section className={styles.supportOptions} aria-label="More support resources">
                      <PublicSupport />
                      <article className={styles.developerOption}>
                        <h2>Developer support</h2>
                        <p>Bring in an experienced developer when you need an extra pair of hands on your project.</p>
                        <ul>
                          <li>Track down bugs and improve site performance.</li>
                          <li>Connect APIs, CRMs, and other third-party services.</li>
                          <li>Get help with Craft CMS, ExpressionEngine, or custom code.</li>
                        </ul>
                        <p>Tell us what’s slowing you down. We’ll discuss your project and plan the next steps together.</p>
                        <Link className={styles.optionLink} to="https://solspace.com/services/developer-support/">
                          <span className={styles.linkLabel}>Get developer support</span> <span aria-hidden="true">↗</span>
                        </Link>
                      </article>
                    </section>
                  )}
                </div>
              )}
            </div>
          </SupportMode.Provider>
        </main>
      </div>
      <footer className="docusaurus-mt-lg docs-footer">
        <Footer showDeveloperSupport={false} />
      </footer>
    </Layout>
  );
}
