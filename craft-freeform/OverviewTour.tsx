import Link from '@docusaurus/Link';
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import VideoPreview from './VideoPreview';
import styles from './intro.module.css';

const features = [
  {
    id: 'build-and-publish', headingId: 'convenience', tone: 'teal', title: 'Build and edit forms in Craft', navLabel: 'Builder',
    video: '/videos/craft/freeform/v5/builder-layout-demo.mp4',
    poster: '/img/craft/freeform/v5/feature/builder-layout-demo-poster.webp',
    width: 1600, height: 1000,
    alt: 'Freeform builder demo. Phone is dropped beside Email address, then Date & Time is added on its own row. Selecting month-first order and a 24-hour clock updates the field’s placeholder.',
    description: <>
      Drag fields into place and organize them into pages.{' '}
      <Link id="submission-data" to="./submissions/overview/">Manage submissions</Link> and{' '}
      <Link to="./configuration/limited-users/">set editor permissions</Link> in Craft.
    </>,
    link: './forms/builder/', linkLabel: 'Explore the builder',
  },
  {
    id: 'notifications', headingId: 'notifications-heading', tone: 'warm', title: 'Send the right email', navLabel: 'Notifications',
    video: '/videos/craft/freeform/v5/admin-notification-demo.mp4',
    poster: '/img/craft/freeform/v5/feature/admin-notification-demo-poster.webp',
    width: 1600, height: 1000,
    alt: 'Freeform notification demo. An Admin notification gets two recipients and a Form Name tag in the subject. The Configuration tab and rendered email preview are shown before saving.',
    description: 'Use the Notifications tab to email your team, confirm submissions with visitors, or route messages based on their answers.',
    link: './forms/email-notifications/', linkLabel: 'Set up email notifications',
  },
  {
    id: 'builder-rules', headingId: 'builder-rules-heading', tone: 'blue', title: 'Show the right fields', navLabel: 'Rules',
    video: '/videos/craft/freeform/v5/conditional-rules-demo.mp4',
    poster: '/img/craft/freeform/v5/feature/conditional-rules-demo-poster.webp',
    width: 1600, height: 1000,
    alt: 'Freeform conditional rules demo. The right-hand rules panel sets Invoice number to appear when Support topic is Billing. On the front-end form, choosing Billing reveals Invoice number and Amount charged.',
    description: 'Use conditional rules to show or hide fields and skip pages based on a visitor’s answers.',
    link: './forms/conditional-rules/', linkLabel: 'Set up conditional rules',
  },
  {
    id: 'translations', headingId: 'translations-heading', tone: 'translation', title: 'Build multilingual forms', navLabel: 'Translations',
    video: '/videos/craft/freeform/v5/builder-translations.mp4',
    poster: '/img/craft/freeform/v5/feature/builder-translations-poster.jpg',
    width: 1888, height: 1016,
    alt: 'Freeform demo switching to the French site and translating a dropdown’s label, instructions, and choices.',
    description: 'Use Freeform’s control panel in English, French, Dutch, German, or Italian. With Pro, translate field labels, choices, buttons, and messages for each Craft site directly in the builder.',
    link: './configuration/sites/#translations', linkLabel: 'Explore form translations',
  },
  {
    id: 'ai', headingId: 'builder-ai-heading', tone: 'purple', title: 'Create forms with AI', navLabel: 'AI',
    video: '/videos/craft/freeform/v5/ai-form-demo.mp4',
    poster: '/img/craft/freeform/v5/feature/ai-form-demo-poster.webp',
    width: 1600, height: 1000,
    alt: 'Freeform AI demo. From the Forms list, a workshop registration screenshot and a prompt are added. The draft opens in the builder with Dietary requirements and Photo consent fields.',
    description: 'With Freeform Pro and a compatible AI integration, turn a description, PDF, or screenshot into an editable draft.',
    link: './forms/builder/create-with-ai/', linkLabel: 'Explore AI form creation',
  },
  {
    id: 'reliability', headingId: 'ab-testing-heading', tone: 'purple', title: 'Find the form that converts', navLabel: 'A/B testing',
    video: '/videos/craft/freeform/v5/ab-testing-demo.mp4',
    poster: '/img/craft/freeform/v5/feature/ab-testing-demo-poster.webp',
    width: 1600, height: 1000,
    alt: 'Freeform A/B testing demo comparing versions of the same form. It shows recent contact sales impressions, the winning project enquiry layout, and early results for two event registration forms.',
    description: 'Split live traffic between form variants and compare completed submissions. Freeform serves the winning form when the test ends.',
    link: './forms/ab-testing/', linkLabel: 'Set up an A/B test',
  },
] as const;

const cardDisplayTime = 30000;

const illustrationViewBoxes = {
  teal: '15 0 200 80',
  blue: '28 0 200 80',
  warm: '16 0 200 80',
  purple: '16 0 272 80',
  translation: '10 0 200 80',
};

function BuilderIllustration({ tone }: { tone: typeof features[number]['tone'] }) {
  return (
    <svg className={styles.builderArt} viewBox={illustrationViewBoxes[tone]} fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {tone === 'teal' && <>
        <g opacity=".25" strokeWidth="1.35">
          <rect x="16" y="23" width="55" height="10" rx="3" />
          <rect x="16" y="44" width="55" height="10" rx="3" />
        </g>
        <path d="M78 39h17m-5-5 5 5-5 5" opacity=".55" />
        <rect x="105" y="10" width="79" height="60" rx="8" className={styles.builderArtSurface} />
        <path d="M117 21h31" strokeWidth="3" />
        <rect x="117" y="28" width="55" height="10" rx="3" opacity=".6" />
        <g fill="none" strokeWidth="1.35" strokeDasharray="2.5 3">
          <rect x="117" y="41" width="55" height="10" rx="3" className={styles.builderDropTarget} />
          <rect x="117" y="54" width="55" height="10" rx="3" className={styles.builderDropTarget} />
        </g>
        <g className={styles.builderFields}>
          <g className={styles.builderFieldToken}>
            <rect x="16" y="23" width="55" height="10" rx="3" className={styles.builderArtSurface} />
            <path d="M24 28h4m5 0h23" opacity=".65" />
          </g>
          <g className={styles.builderFieldToken}>
            <rect x="16" y="44" width="55" height="10" rx="3" className={styles.builderArtSurface} />
            <path d="M24 49h4m5 0h17" opacity=".65" />
          </g>
        </g>
      </>}
      {tone === 'blue' && <>
        <rect x="29" y="7" width="142" height="66" rx="9" className={styles.builderArtSurface} opacity=".85" />
        <rect x="42" y="18" width="15" height="15" rx="3" />
        <path d="m45.5 25 3 3 5-5.5" strokeWidth="2" className={styles.builderRuleCheck} />
        <path d="M65 25.5h55" strokeWidth="3" opacity=".58" />
        <rect x="42" y="43" width="116" height="18" rx="4" strokeDasharray="3 4" opacity=".3" />
        <g className={styles.builderRuleField}>
          <rect x="42" y="43" width="116" height="18" rx="4" className={styles.builderArtSurface} />
          <path d="M51 52h41" strokeWidth="3" opacity=".6" />
        </g>
      </>}
      {tone === 'warm' && <>
        <rect x="17" y="20" width="66" height="42" rx="7" className={styles.builderArtSurface} />
        <path d="m19 24 26 21a8 8 0 0 0 10 0l26-21" />
        <path d="M89 41h54" strokeDasharray="3 5" opacity=".48" />
        <circle cx="163" cy="41" r="16" className={styles.builderArtSurface} />
        <path d="m155 41 5 5 10-10" strokeWidth="2" />
        <circle className={styles.notificationSignal} cx="90" cy="41" r="3" fill="currentColor" stroke="none" />
      </>}
      {tone === 'translation' && <>
        <rect x="17" y="17" width="71" height="46" rx="8" className={styles.builderArtSurface} />
        <path d="m35 51 9-22 9 22m-15-7h12m11-9h13m-13 9h10" />
        <path d="M96 40h22m-6-6 6 6-6 6" opacity=".52" />
        <circle cx="97" cy="40" r="2.7" className={styles.translationSignal} fill="currentColor" stroke="none" />
        <rect x="126" y="17" width="71" height="46" rx="8" className={styles.translationSurface} />
        <circle cx="147" cy="40" r="11" />
        <ellipse cx="147" cy="40" rx="4.5" ry="11" />
        <path d="M136 40h22" />
        <path d="M167 36h16m-16 9h12" pathLength="1" className={styles.translationLines} />
      </>}
      {tone === 'purple' && <>
        <g>
          <rect x="17" y="16" width="105" height="48" rx="8" className={styles.builderArtSurface} />
          <path className={styles.builderPrompt} d="M30 30h56m-56 10h73m-73 10h38" pathLength="1" strokeWidth="3" opacity=".61" />
          <g className={styles.builderPromptSend}>
            <circle cx="114" cy="58" r="12" fill="currentColor" stroke="none" />
            <path d="M109 58h10m-4-4 4 4-4 4" className={styles.builderArtArrow} />
          </g>
        </g>
        <path className={styles.builderSpark} d="m143 14 6 13 13 6-13 6-6 13-6-13-13-6 13-6Z" />
        <path className={styles.builderSpark} d="m166 43 3.5 7.5 7.5 3.5-7.5 3.5-3.5 7.5-3.5-7.5-7.5-3.5 7.5-3.5Z" opacity=".64" />
        <g className={styles.builderDraft}>
          <rect x="188" y="10" width="69" height="60" rx="8" className={styles.builderArtSurface} />
          <path d="M199 21h27" strokeWidth="3" />
          <g fill="none" strokeWidth="1.4" opacity=".68">
            <rect x="199" y="28" width="47" height="9" rx="3" />
            <rect x="199" y="41" width="47" height="9" rx="3" />
            <rect x="199" y="54" width="47" height="9" rx="3" />
          </g>
        </g>
      </>}
    </svg>
  );
}

function TestIllustration() {
  return (
    <div className={styles.testDiagram} aria-hidden="true">
      <svg viewBox="2 0 334 104" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect className={styles.testSource} x="3" y="30" width="58" height="44" rx="10" />
        <path className={styles.testSourceLines} d="M16 44h26m-26 8h31m-31 8h19" />
        <path className={styles.testRouteBase} d="M61 52h42c28 0 28-29 56-29h30m-86 29c28 0 28 29 56 29h30" />
        <path className={styles.testRoute} data-tone="blue" pathLength="1" d="M61 52h42c28 0 28-29 56-29h30" />
        <path className={styles.testRoute} data-tone="purple" pathLength="1" d="M61 52h42c28 0 28 29 56 29h30" />
        <g className={styles.testVariant} data-tone="blue">
          <rect x="189" y="4" width="110" height="39" rx="9" />
          <text x="202" y="30">A</text>
          <path d="m227 32 13-5 11 2 13-9 11 2 12-8" />
        </g>
        <g className={styles.testVariant} data-tone="purple">
          <rect x="189" y="61" width="110" height="39" rx="9" />
          <text x="202" y="87">B</text>
          <path d="m227 89 13-7 11 4 13-6 11 1 12-6" />
        </g>
        <g className={styles.testWinner}>
          <circle cx="318" cy="80.5" r="11" />
          <path d="m313.5 80.5 3 3 5.5-5.5" />
        </g>
      </svg>
    </div>
  );
}

function cardSpacing(rail: HTMLDivElement) {
  const [first, second] = Array.from(rail.children) as HTMLElement[];
  return second.offsetLeft - first.offsetLeft;
}

function scrollToCard(rail: HTMLDivElement | null, index: number, behavior: ScrollBehavior = 'auto') {
  if (rail && index >= 0 && index < features.length) {
    rail.scrollTo({ left: index * cardSpacing(rail), behavior });
  }
}

export default function OverviewTour() {
  const rail = useRef<HTMLDivElement>(null);
  const remainingTime = useRef(cardDisplayTime);
  const railId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isRotating = autoplay && inView && pageVisible && hoveredCard !== activeIndex;

  useEffect(() => {
    const scrollArea = rail.current;
    if (!scrollArea) return;

    function syncActiveCard() {
      const spacing = cardSpacing(scrollArea);
      if (spacing > 0) {
        setActiveIndex(Math.max(0, Math.min(features.length - 1, Math.round(scrollArea.scrollLeft / spacing))));
      }
    }

    syncActiveCard();
    scrollArea.addEventListener('scroll', syncActiveCard, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(syncActiveCard);
    observer?.observe(scrollArea);
    const visibilityThreshold = 0.3;
    const visibilityObserver = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(([entry]) => {
      setInView(entry.intersectionRatio >= visibilityThreshold);
    }, { threshold: visibilityThreshold });
    visibilityObserver?.observe(scrollArea);
    if (!visibilityObserver) setInView(true);

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAutoplay(!preference.matches && visibilityObserver !== null);

    function pauseForReducedMotion() {
      if (preference.matches) setAutoplay(false);
    }

    function syncPageVisibility() {
      setPageVisible(!document.hidden);
    }

    syncPageVisibility();
    preference.addEventListener('change', pauseForReducedMotion);
    document.addEventListener('visibilitychange', syncPageVisibility);

    return () => {
      scrollArea.removeEventListener('scroll', syncActiveCard);
      observer?.disconnect();
      visibilityObserver?.disconnect();
      preference.removeEventListener('change', pauseForReducedMotion);
      document.removeEventListener('visibilitychange', syncPageVisibility);
    };
  }, []);

  useEffect(() => {
    remainingTime.current = cardDisplayTime;
  }, [activeIndex]);

  useEffect(() => {
    if (!isRotating) return;

    const duration = remainingTime.current;
    const startedAt = window.performance.now();
    const timeout = window.setTimeout(() => {
      const next = (activeIndex + 1) % features.length;
      scrollToCard(rail.current, next, next === 0 ? 'instant' : 'auto');
    }, duration);

    return () => {
      window.clearTimeout(timeout);
      remainingTime.current = Math.max(0, duration - (window.performance.now() - startedAt));
    };
  }, [activeIndex, isRotating]);

  function showCard(index: number) {
    scrollToCard(rail.current, index);
  }

  function handleRailKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const targets = { ArrowLeft: activeIndex - 1, ArrowRight: activeIndex + 1, Home: 0, End: features.length - 1 };
    const target = targets[event.key as keyof typeof targets];
    if (target !== undefined) {
      event.preventDefault();
      showCard(target);
    }
  }

  return (
    <section
      className={styles.featureTour}
      aria-labelledby="feature-tour-heading"
      onFocusCapture={event => {
        if (event.target.matches(':focus-visible')) setAutoplay(false);
      }}
    >
      <div className={styles.tourHeader}>
        <h2 id="feature-tour-heading">Freeform <span>in action.</span></h2>
      </div>
      <div
        ref={rail} id={railId} className={styles.tourRail} role="region" aria-label="Feature cards" tabIndex={0}
        onKeyDown={handleRailKeys}
      >
        {features.map((feature, index) => (
          <section key={feature.id} id={feature.id} aria-labelledby={feature.headingId}
            className={styles.featureStory} data-tone={feature.tone}
            onPointerMoveCapture={event => {
              // Start a hover pause only when the mouse moves onto or within the card.
              if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0)) {
                setHoveredCard(index);
              }
            }}
            onPointerLeave={event => {
              if (event.pointerType === 'mouse') setHoveredCard(null);
            }}
          >
            <div className={styles.featureCopy}>
              <div className={styles.featureIllustration}>
                {feature.id === 'reliability' ? <TestIllustration /> : <BuilderIllustration tone={feature.tone} />}
              </div>
              <div className={styles.storyCopy}>
                <h3 id={feature.headingId}>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={styles.storyActions}>
                  <Link to={feature.link} className={styles.textAction}><span>{feature.linkLabel}</span><span aria-hidden="true">→</span></Link>
                  {feature.id === 'build-and-publish' && (
                    <Link to="#available-field-types" className={styles.textAction} id="powerful-fields"><span>Explore field types</span><span aria-hidden="true">→</span></Link>
                  )}
                </div>
              </div>
            </div>
            <figure className={`${styles.storyMedia} ${styles.featureVideo}`} id={feature.id === 'build-and-publish' ? 'builder-layout' : undefined}>
              <VideoPreview
                label={feature.alt}
                video={feature.video}
                poster={feature.poster}
                width={feature.width}
                height={feature.height}
                active={index === activeIndex && inView && pageVisible}
              />
            </figure>
          </section>
        ))}
      </div>
      <div className={styles.tourControls} role="group" aria-label="Feature tour controls">
        <div className={styles.tourSteps} role="group" aria-label="Jump to a feature"
          data-rotating={isRotating || undefined} style={{ '--tour-dwell': `${cardDisplayTime}ms` } as CSSProperties}>
          {features.map((feature, index) => (
            <button key={feature.id} type="button" aria-controls={railId} aria-label={feature.navLabel}
              aria-current={activeIndex === index ? 'true' : undefined} onClick={() => showCard(index)}>
              <span className={styles.tourStepLabel}>{feature.navLabel}</span>
              <span className={styles.tourStepProgress} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={styles.tourArrows}>
          <button type="button" aria-controls={railId} aria-label="Previous feature" disabled={activeIndex === 0} onClick={() => showCard(activeIndex - 1)}>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 10H4m5-5-5 5 5 5" />
            </svg>
          </button>
          <button type="button" aria-controls={railId} aria-label="Next feature" disabled={activeIndex === features.length - 1} onClick={() => showCard(activeIndex + 1)}>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h12m-5-5 5 5-5 5" />
            </svg>
          </button>
          <button type="button" aria-controls={railId} aria-label={autoplay ? 'Pause autoplay' : 'Play feature tour'}
            title={autoplay ? 'Pause autoplay' : 'Play feature tour'} onClick={() => setAutoplay(value => !value)}>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {autoplay ? <path d="M7 4v12m6-12v12" /> : <path d="m7 4 9 6-9 6z" />}
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
