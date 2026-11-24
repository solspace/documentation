import type { SVGProps } from 'react';

function BannerIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function InfoIcon() {
  return (
    <BannerIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.75" r="1" fill="currentColor" stroke="none" />
    </BannerIcon>
  );
}

export function WarningIcon() {
  return (
    <BannerIcon>
      <path d="M10.4 4.3a1.8 1.8 0 0 1 3.2 0l7.65 13.3a1.8 1.8 0 0 1-1.6 2.7H4.35a1.8 1.8 0 0 1-1.6-2.7z" />
      <path d="M12 9v4" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </BannerIcon>
  );
}

export function DangerIcon() {
  return (
    <BannerIcon>
      <path d="M8.3 3h7.4L21 8.3v7.4L15.7 21H8.3L3 15.7V8.3z" />
      <path d="M8 12h8" />
    </BannerIcon>
  );
}

export function TipIcon() {
  return (
    <BannerIcon>
      <path d="M12 6.5C9.5 4.5 6.7 4.1 3 5v14c3.7-.9 6.5-.5 9 1.5 2.5-2 5.3-2.4 9-1.5V5c-3.7-.9-6.5-.5-9 1.5Zm0 0v14" />
    </BannerIcon>
  );
}
