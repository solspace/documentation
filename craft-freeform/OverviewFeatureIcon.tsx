import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './intro.module.css';

const heartbeat = 'M.4 13.66H5.36L6.93 10.05L8.73 16.34L10.32 12H11.98L13.43 15.05L15.38 6.45L18.65 18.25L20.25 13.66H47.25';
// Calibrate dashes so the original waveform still spans 100 dash units.
const heartbeatPathLength = 143.5;
const heartbeatTrail = Array.from({ length: 37 }, (_, step) => {
  const strength = step / 36;
  return { length: 128 - 122 * strength, opacity: 0.18 * strength ** 1.5 };
});

export default function OverviewFeatureIcon({ kind }: { kind: 'monitor' | 'dark-mode' }) {
  const icon = useRef<HTMLSpanElement>(null);
  const trailMaskId = useId();
  const trailBlurId = `${trailMaskId}-blur`;
  const [inView, setInView] = useState(false);
  const darkModeIcon = useBaseUrl('/icons/cards/dark-mode.svg');
  const isMonitor = kind === 'monitor';

  useEffect(() => {
    if (!icon.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.intersectionRatio >= 0.5);
    }, { threshold: 0.5 });
    observer.observe(icon.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={isMonitor ? icon : undefined}
      className={isMonitor ? styles.monitorPulse : styles.darkModeIcon}
      data-animate={inView || undefined}
      aria-hidden="true"
    >
      {isMonitor ? (
        <svg
          viewBox="0 0 48 24"
          fill="none"
          stroke="#ff6624"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ '--monitor-waveform-length': `${heartbeatPathLength}px` } as CSSProperties}
        >
          <defs>
            <filter id={trailBlurId} filterUnits="userSpaceOnUse" x="-3" y="-3" width="54" height="30">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
            <mask id={trailMaskId} maskUnits="userSpaceOnUse" x="-3" y="-3" width="54" height="30">
              <g className={styles.monitorPulseTrace} stroke="white" strokeWidth="2.5" filter={`url(#${trailBlurId})`}>
                {heartbeatTrail.map(({ length, opacity }) => (
                  <path
                    key={length}
                    d={heartbeat}
                    pathLength={heartbeatPathLength}
                    opacity={opacity}
                    style={{ '--monitor-trail-length': `${length}px` } as CSSProperties}
                  />
                ))}
              </g>
            </mask>
          </defs>
          <path className={styles.monitorPulseStill} d={heartbeat} />
          <path className={styles.monitorPulseTrail} d={heartbeat} stroke="#ff904b" mask={`url(#${trailMaskId})`} />
          <path className={styles.monitorPulseTip} d={heartbeat} pathLength={heartbeatPathLength} stroke="#ffe4c8" />
        </svg>
      ) : (
        <img src={`${darkModeIcon}#twinkle`} alt="" width="52" height="52" loading="lazy" />
      )}
    </span>
  );
}
