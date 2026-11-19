import { builtinRenderers, type ReactFieldRendererProps } from '@solspace/freeform-react';
import styles from './SupportPage.module.css';
import { needsVersionHint } from './versionHint';

const TextField = builtinRenderers.types.text;
const HtmlField = builtinRenderers.types.html;
const noticeName = (handle: string) => handle.replace(/[^a-z]/gi, '').toLowerCase();

export function isVersionHintField(field: ReactFieldRendererProps['field']) {
  return noticeName(field.handle) === 'warnlatest';
}

// Freeform owns the notice copy. Keep semantic content from legacy banners,
// while the support page supplies their layout, icon, and colors.
function noticeField(field: ReactFieldRendererProps['field']) {
  const html = field.content?.rendered?.html?.trim();
  if (!html) return field;
  const document = new DOMParser().parseFromString(html, 'text/html');
  const paragraphs = Array.from(document.body.querySelectorAll('p'));
  if (paragraphs.length) document.body.replaceChildren(...paragraphs);
  document.body.querySelectorAll('[class], [style]').forEach((element) => {
    element.removeAttribute('class');
    element.removeAttribute('style');
  });
  document.body.querySelectorAll('a[target="_blank"]').forEach((link) => {
    link.setAttribute('rel', 'noopener noreferrer');
  });
  return {
    ...field,
    content: {
      ...field.content,
      rendered: { ...field.content?.rendered, html: document.body.innerHTML },
    },
  };
}

export function SupportVersionField(props: ReactFieldRendererProps) {
  const showHint = needsVersionHint(props.value ?? props.input.value);
  const hintId = `${String(props.input.id ?? props.field.uid)}-hint`;
  const example = props.field.placeholder?.match(/\d+(?:\.\d+)+/)?.[0] ?? '5.2.6';
  const describedBy = [props.input['aria-describedby'], showHint ? hintId : undefined]
    .filter(Boolean).join(' ') || undefined;

  return (
    <>
      <TextField {...props} input={{ ...props.input, 'aria-describedby': describedBy }} />
      {showHint && (
        <div className={styles.versionHint} id={hintId} role="status">
          Use an exact version, e.g. {example}.
        </div>
      )}
    </>
  );
}

export function SupportHtmlNotice(props: ReactFieldRendererProps) {
  const name = noticeName(props.field.handle);
  if (!['warneesupport', 'warncraftsupport'].includes(name) || !props.allowRawHtml) {
    return <HtmlField {...props} />;
  }

  return (
    <div className={styles.supportNotice} role="note">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m8.6 3-6.3 11a1.6 1.6 0 0 0 1.4 2.4h12.6a1.6 1.6 0 0 0 1.4-2.4L11.4 3a1.6 1.6 0 0 0-2.8 0ZM10 7v4m0 2.5h.01" />
      </svg>
      <HtmlField {...props} field={noticeField(props.field)} classNames={{ ...props.classNames, content: styles.noticeCopy }} />
    </div>
  );
}
