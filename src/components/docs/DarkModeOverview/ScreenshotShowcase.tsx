import React, { useEffect, useRef, useState } from 'react';
import { OverviewScreenshot, ScreenshotLightbox } from './index';
import styles from './styles.module.css';

const screenshots = [
  { name: 'dashboard', label: 'Dashboard', height: 1770,
    alt: 'The Northstar dashboard in Dark Mode, with submission charts, recent submissions, and Commerce widgets.',
    caption: 'Your dashboard, comfortably dark.' },
  { name: 'entry-list', label: 'Entries', height: 1878,
    alt: 'Craft’s Entries screen in Dark Mode, with content titles, statuses, sections, dates, and authors.',
    caption: 'Browse your entries in Dark Mode.' },
  { name: 'entry-detail', label: 'Entry editor', height: 1216,
    alt: 'The Side Quest Coffee entry editor in Dark Mode, with project data, table fields, assets, and publishing settings.',
    caption: 'Author your content in Dark Mode.' },
  { name: 'assets', label: 'Assets', height: 1394,
    alt: 'Craft’s Assets screen in Dark Mode, with the Northstar folder, image thumbnails, file details, and a selected asset.',
    caption: 'Manage your assets in Dark Mode.' },
  { name: 'freeform', label: 'Freeform', height: 1849,
    alt: 'Freeform’s Project estimate form builder in Dark Mode, with field types and a two-column form layout.',
    caption: 'Dark Mode support for Freeform.' },
  { name: 'formie', label: 'Formie', height: 1856,
    alt: 'Formie’s Product enquiries form builder in Dark Mode, with the Dropdown field editor and its options open.',
    caption: 'Dark Mode support for Formie.' },
  { name: 'commerce', label: 'Commerce', height: 1879,
    alt: 'A Craft Commerce order in Dark Mode, showing customer details, addresses, line items, and payment status.',
    caption: 'Manage your Commerce orders in Dark Mode.' },
];

export default function ScreenshotShowcase() {
  // Start with the entry editor centered, keeping screenshots in their listed order.
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const modalOpen = modalIndex !== null;
  const [inView, setInView] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const cards = useRef<Array<HTMLDivElement | null>>([]);
  const lastHover = useRef<{ x: number; y: number } | null>(null);
  const hoverTimer = useRef<number | null>(null);
  const hoverCandidate = useRef<{ index: number; x: number; y: number } | null>(null);

  const cancelHover = () => {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    hoverCandidate.current = null;
  };

  useEffect(() => () => {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 761px)');
    const updateMotion = () => setMotionAllowed(!motion.matches && desktop.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    motion.addEventListener('change', updateMotion);
    desktop.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (observer && rootRef.current) observer.observe(rootRef.current);
    else setInView(true);
    return () => {
      observer?.disconnect();
      motion.removeEventListener('change', updateMotion);
      desktop.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!motionAllowed || !inView || !pageVisible || paused || hovered || focused || modalOpen) return undefined;
    const timer = window.setTimeout(() => setActive(current => (current + 1) % screenshots.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active, motionAllowed, inView, pageVisible, paused, hovered, focused, modalOpen]);

  const hover = (event: React.PointerEvent, index: number) => {
    if (event.pointerType !== 'mouse' || index === active) return;
    const { clientX: x, clientY: y } = event;
    const previous = lastHover.current;
    // Ignore another card moving beneath a stationary pointer.
    if (previous && Math.hypot(x - previous.x, y - previous.y) < 12) return;
    if (hoverCandidate.current?.index === index) {
      hoverCandidate.current = { index, x, y };
      return;
    }
    cancelHover();
    hoverCandidate.current = { index, x, y };
    hoverTimer.current = window.setTimeout(() => {
      const candidate = hoverCandidate.current;
      if (candidate) {
        lastHover.current = { x: candidate.x, y: candidate.y };
        setActive(candidate.index);
      }
      hoverTimer.current = null;
      hoverCandidate.current = null;
    }, 400);
  };

  const select = (index: number) => {
    cancelHover();
    setActive(index);
    if (window.matchMedia('(max-width: 760px)').matches) {
      cards.current[index]?.scrollIntoView({
        inline: 'center', block: 'nearest',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  };

  return <section ref={rootRef} className={styles.showcase} aria-label="Dark Mode screenshots"
    aria-roledescription="carousel" data-paused={paused || !inView || !pageVisible || modalOpen}
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
    onPointerLeave={() => { cancelHover(); setHovered(false); lastHover.current = null; }}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
    }}>
    <div className={styles.showcaseStage}>
      {screenshots.map((screenshot, index) => {
        const offset = (index - active + screenshots.length) % screenshots.length;
        const position = offset > Math.floor(screenshots.length / 2) ? offset - screenshots.length : offset;
        return <div key={screenshot.name} ref={node => { cards.current[index] = node; }}
          className={styles.showcaseCard} data-position={position} data-active={index === active}
          role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${screenshots.length}: ${screenshot.label}`}
          onPointerEnter={event => hover(event, index)}
          onPointerMove={event => hover(event, index)}
          onPointerLeave={() => { if (hoverCandidate.current?.index === index) cancelHover(); }}
          onFocusCapture={() => { cancelHover(); if (!modalOpen) setActive(index); }}>
          <OverviewScreenshot {...screenshot} onOpen={() => setModalIndex(index)} />
        </div>;
      })}
    </div>
    <ScreenshotLightbox screenshots={screenshots} index={modalIndex}
      onNavigate={index => { setModalIndex(index); setActive(index); }}
      onClose={() => setModalIndex(null)} />
    <div className={styles.showcaseControls}>
      <div className={styles.showcaseChoices} role="group" aria-label="Choose a screenshot">
        {screenshots.map((screenshot, index) => <button key={screenshot.name} type="button"
          aria-pressed={index === active} onClick={() => select(index)}>
          <span className={styles.showcaseDot} aria-hidden="true" />{screenshot.label}
        </button>)}
      </div>
      <button type="button" className={styles.showcasePause} aria-pressed={paused}
        onClick={() => setPaused(current => !current)} aria-label={paused ? 'Resume screenshot rotation' : 'Pause screenshot rotation'}>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          {paused ? <path d="m8 5 11 7-11 7Z" fill="currentColor" />
            : <path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" strokeWidth="2" />}
        </svg>
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  </section>;
}
