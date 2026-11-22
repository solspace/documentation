import { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './intro.module.css';

type VideoPreviewProps = {
  label: string;
  video: string;
  poster: string;
  width: number;
  height: number;
  active?: boolean;
  eagerPoster?: boolean;
};

export default function VideoPreview({ label, video, poster, width, height, active = true, eagerPoster = false }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackOverride = useRef<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const [posterInRange, setPosterInRange] = useState(false);
  const source = useBaseUrl(video);
  const posterSource = useBaseUrl(poster);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || eagerPoster || posterInRange) return;
    if (typeof IntersectionObserver === 'undefined') {
      setPosterInRange(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPosterInRange(true);
        observer.disconnect();
      }
    }, { rootMargin: '240px 0px' });

    observer.observe(video);
    return () => observer.disconnect();
  }, [eagerPoster, posterInRange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      video.pause();
      return;
    }

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = typeof IntersectionObserver === 'undefined';

    function syncPlayback() {
      if (inView && (playbackOverride.current ?? !preference.matches)) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    function onPreferenceChange() {
      playbackOverride.current = null;
      syncPlayback();
    }

    const observer = typeof IntersectionObserver === 'undefined' ? null
      : new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      }, { threshold: 0.15 });

    observer?.observe(video);
    preference.addEventListener('change', onPreferenceChange);
    syncPlayback();

    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [active]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    playbackOverride.current = video.paused;
    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  const action = playing ? 'Pause' : 'Play';

  return (
    <div className={styles.preview}>
      <div className={styles.previewFrame}>
        <video
          ref={videoRef}
          aria-label={label}
          src={source}
          poster={eagerPoster || posterInRange ? posterSource : undefined}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <button
        type="button"
        className={styles.previewToggle}
        aria-label={`${action} ${label}`}
        title={`${action} preview`}
        disabled={!active}
        onClick={togglePlayback}
      >
        <span className={playing ? styles.pauseIcon : styles.playIcon} aria-hidden="true" />
      </button>
    </div>
  );
}
