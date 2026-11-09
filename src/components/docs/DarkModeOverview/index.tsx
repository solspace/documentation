import React, { useEffect, useId, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type PluginLogo = { name: string; icon?: string; url: string; parent?: string };

function flightStyle(index: number): React.CSSProperties {
  const angle = index * 2.3999632297;
  const radius = 24 + (index * 13) % 23;
  const duration = 26 + (index * 7) % 13;
  const phase = (index * 0.61803398875 + 0.2) % 1;
  return {
    '--flight-x': `${50 + Math.cos(angle) * radius}%`,
    '--flight-y': `${50 + Math.sin(angle) * radius}%`,
    '--flight-duration': `${duration}s`,
    '--flight-delay': `${-phase * duration}s`,
    '--tilt-x': `${(index * 7) % 25 - 12}deg`,
    '--tilt-y': `${(index * 13) % 49 - 24}deg`,
  } as React.CSSProperties;
}

function Logo({ plugin, index, duplicate = false }: { plugin: PluginLogo; index: number; duplicate?: boolean }) {
  const [failed, setFailed] = useState(false);
  const fallback = useBaseUrl('/icons/plugins/default-plugin.svg');
  const source = useBaseUrl(plugin.icon || '/icons/plugins/default-plugin.svg');
  return <a href={plugin.url} target="_blank" rel="noopener noreferrer" className={styles.logo}
    aria-label={`${plugin.name} (opens in a new tab)`} style={flightStyle(index)}
    aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : undefined}>
    <span className={styles.logoObject}>
      <span className={styles.logoMark}>
        <img src={failed ? fallback : source} alt="" width="48" height="48"
          loading="lazy" decoding="async" onError={() => setFailed(true)} />
      </span>
      <span className={styles.logoLabel}>{plugin.name}</span>
    </span>
  </a>;
}

export function PluginLogoCloud({ plugins, names }: { plugins: PluginLogo[]; names: string[] }) {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const fieldRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '120px',
    });
    observer.observe(field);
    return () => observer.disconnect();
  }, []);
  const available = plugins.filter(plugin => !plugin.parent && plugin.name !== 'Craft CMS');
  const preferred = names.map(name => available.find(plugin => plugin.name === name))
    .filter((plugin): plugin is PluginLogo => Boolean(plugin));
  const ordered = [...preferred, ...available.filter(plugin => !names.includes(plugin.name))];
  const flights = [...ordered, ...ordered];
  return <div className={styles.logoCloudShell}>
    <div className={styles.motionControls}>
      <button type="button" className={styles.motionToggle} aria-pressed={paused}
        onClick={() => setPaused(current => !current)}>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          {paused ? <path d="m8 5 11 7-11 7Z" fill="currentColor" />
            : <path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" strokeWidth="2" />}
        </svg>
        {paused ? 'Resume animation' : 'Pause animation'}
      </button>
    </div>
    <div ref={fieldRef} className={styles.logoCloud} data-paused={paused || !inView} role="group" aria-label="Supported Craft plugins">
      <div className={styles.flightField}>
        {flights.map((plugin, index) => <Logo key={`${plugin.name}-${index}`} plugin={plugin} index={index}
          duplicate={index >= ordered.length} />)}
      </div>
    </div>
  </div>;
}

export type OverviewScreenshotData = {
  name: string; alt: string; caption: string; width?: number; height: number;
};

export function OverviewScreenshot({ name, alt, caption, width = 3000, height, onOpen }: OverviewScreenshotData & {
  onOpen: () => void;
}) {
  const image = useBaseUrl(`/img/craft/dark-mode/v1/overview/${name}.jpg`);
  const small = useBaseUrl(`/img/craft/dark-mode/v1/overview/${name}-800.jpg`);
  const medium = useBaseUrl(`/img/craft/dark-mode/v1/overview/${name}-1600.jpg`);

  return <figure className={styles.screenshot}>
    <button type="button" className={styles.screenshotTrigger} onClick={onOpen}
      aria-haspopup="dialog" aria-label={`Enlarge screenshot: ${caption}`}>
      <img src={medium} srcSet={`${small} 800w, ${medium} 1600w, ${image} 3000w`}
        sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1240px) 55vw, 680px"
        alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </button>
    <figcaption>{caption}</figcaption>
  </figure>;
}

export function ScreenshotLightbox({ screenshots, index, onNavigate, onClose }: {
  screenshots: OverviewScreenshotData[];
  index: number | null;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const open = index !== null;
  const screenshot = screenshots[index ?? 0];
  const image = useBaseUrl(`/img/craft/dark-mode/v1/overview/${screenshot.name}.jpg`);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.showModal();
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const navigate = (direction: number) => {
    onNavigate(((index ?? 0) + direction + screenshots.length) % screenshots.length);
  };
  const close = () => dialogRef.current?.close();

  return <dialog ref={dialogRef} className={styles.imageDialog} aria-labelledby={titleId}
    onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      navigate(event.key === 'ArrowLeft' ? -1 : 1);
    }}>
    <div className={styles.imageDialogHeader}>
      <div className={styles.imageDialogHeading}>
        <p id={titleId} aria-live="polite" aria-atomic="true">{screenshot.caption}</p>
        <span className={styles.imageDialogCount}>{String((index ?? 0) + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}</span>
      </div>
      <button type="button" className={styles.lightboxClose} onClick={close} aria-label="Close screenshots" autoFocus>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
    <div className={styles.imageViewport}>
      <button type="button" className={styles.lightboxPrevious} onClick={() => navigate(-1)}
        aria-label="Previous screenshot" aria-keyshortcuts="ArrowLeft">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M19 12H5m6-6-6 6 6 6" />
        </svg>
      </button>
      {open && <img className={styles.lightboxImage} src={image} alt={screenshot.alt}
        width={screenshot.width ?? 3000} height={screenshot.height} />}
      <button type="button" className={styles.lightboxNext} onClick={() => navigate(1)}
        aria-label="Next screenshot" aria-keyshortcuts="ArrowRight">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </button>
    </div>
  </dialog>;
}

export function ScreenshotPlaceholder({ title, caption }: { title: string; caption: string }) {
  return <figure className={styles.screenshot}>
    <div className={styles.screenshotSpace} role="img" aria-label={`Screenshot placeholder: ${title}`}>
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <rect x="4" y="5" width="24" height="22" rx="3" />
        <circle cx="11" cy="12" r="2" />
        <path d="m5 24 8-8 5 5 4-4 6 6" />
      </svg>
      <span className={styles.placeholderLabel}>Screenshot placeholder</span>
      <strong>{title}</strong>
    </div>
    <figcaption>{caption}</figcaption>
  </figure>;
}


export function ControlPanelTour() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const source = useBaseUrl('/videos/craft/dark-mode/v1/control-panel-tour-v6.mp4');
  const poster = useBaseUrl('/videos/craft/dark-mode/v1/control-panel-tour-v6.jpg');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setMotionAllowed(!preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    const observer = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (observer) observer.observe(video);
    else setInView(true);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', updatePreference);
    };
  }, [source]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && motionAllowed) void video.play().catch(() => {});
    else video.pause();
  }, [inView, motionAllowed, source]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  };

  return <div className={styles.tourFrame} data-paused={!inView || !playing}>
    <video key={source} ref={videoRef} className={styles.tourVideo}
    width="1666" height="986" poster={poster} preload="none"
    muted loop playsInline role="button" tabIndex={0}
    aria-label={`${playing ? 'Pause' : 'Play'} the Dark Mode control panel tour`}
    onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
    onClick={togglePlayback}
    onKeyDown={event => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        togglePlayback();
      }
    }}>
    <source src={source} type="video/mp4" />
    <a href={source}>Watch the Dark Mode control panel tour</a>
    </video>
  </div>;
}
