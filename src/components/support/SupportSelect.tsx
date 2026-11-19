import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { ReactFieldRendererProps } from '@solspace/freeform-react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './SupportPage.module.css';

const subjectIcons: Record<string, string> = {
  'Technical issue or bug': 'M8 9h8v7a4 4 0 0 1-8 0V9Zm1-4 1 2h4l1-2M12 9v11M4 9l4 2m8 0 4-2M3 15h5m8 0h5M4 21l4-3m8 0 4 3',
  'Product question or how-to': 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM9.1 8a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5M12 17h.01',
  'Upgrade help': 'M12 16V3m-5 5 5-5 5 5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4',
  'Feature request': 'm12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Zm7-2v4m-2-2h4',
  'Account or license help': 'M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
};

const productIcons: Record<string, string> = {
  Freeform: 'freeform',
  Calendar: 'calendar',
  'AI Assistant': 'ai-assistant',
  darkMode: 'dark-mode',
};

const cmsFamily = (label: string) => /^craft(?:\s|\d|$)/i.test(label.trim())
  ? 0
  : /^expressionengine(?:\s|\d|$)/i.test(label.trim()) ? 1 : 2;

const isCraftOnlyProduct = (option: { label: string; value: string }) =>
  [option.label, option.value].some((name) =>
    ['aiassistant', 'darkmode'].includes(name.replace(/[^a-z0-9]/gi, '').toLowerCase()),
  );

function SelectIcon({ handle, value, label = value }: { handle: string; value: string; label?: string }) {
  const icons = useBaseUrl('/icons');
  if (handle === 'edition') return null;
  if (handle === 'cms' && cmsFamily(label) === 0) {
    return <img src={`${icons}/plugins/craftcms-cms.svg`} alt="" width={18} height={18} aria-hidden="true" />;
  }
  if (handle === 'cms' && cmsFamily(label) === 1) {
    return <img src={`${icons}/support/expressionengine-mark.svg`} alt="" width={18} height={18} aria-hidden="true" />;
  }
  const productIcon = productIcons[label] ?? productIcons[value];
  if (handle === 'product' && productIcon) {
    return <img src={`${icons}/cards/${productIcon}.svg`} alt="" width={18} height={18} aria-hidden="true" />;
  }
  const fallback = handle === 'cms'
    ? 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'
    : handle === 'product'
      ? 'm12 2 10 5-10 5L2 7l10-5ZM2 7v10l10 5 10-5V7M12 12v10'
      : 'M20 14a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2ZM8 8h8m-8 4h5';
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={handle === 'subject' ? subjectIcons[label] ?? subjectIcons[value] ?? fallback : fallback} />
    </svg>
  );
}

export default function SupportSelect({ field, form, value, input, errors }: ReactFieldRendererProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const search = useRef({ text: '', time: 0 });
  const id = String(input.id ?? `freeform-${field.handle}`);
  const allOptions = field.options ?? [];
  const cmsValue = String(form.values.cms ?? '');
  const cmsLabel = form.manifest.fields.cms?.options?.find((option) => option.value === cmsValue)?.label ?? cmsValue;
  const filterProducts = field.handle === 'product' && cmsFamily(cmsLabel) === 1;
  const options = filterProducts ? allOptions.filter((option) => !isCraftOnlyProduct(option)) : allOptions;
  const blockedSelection = filterProducts && allOptions.some((option) =>
    option.value === String(value ?? '') && isCraftOnlyProduct(option),
  );
  const choices = options.some((option) => option.value === '')
    ? options
    : [{ value: '', label: field.placeholder || 'Please select...' }, ...options];
  const selectedIndex = choices.findIndex((option) => option.value === String(value ?? ''));
  const selected = choices[selectedIndex];
  const disabled = Boolean(input.disabled) || form.isSubmitting;
  const markTouched = () => (input.onBlur as (() => void) | undefined)?.();

  useEffect(() => {
    if (blockedSelection) form.setValue(field.handle, '');
  }, [blockedSelection, field.handle, form.setValue]);

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  useEffect(() => {
    if (!open || !list.current) return;
    const menu = list.current;
    const option = menu.children[activeIndex] as HTMLElement | undefined;
    if (!option) return;
    if (option.offsetTop < menu.scrollTop) menu.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > menu.scrollTop + menu.clientHeight) {
      menu.scrollTop = option.offsetTop + option.offsetHeight - menu.clientHeight;
    }
  }, [activeIndex, open]);

  function choose(index: number) {
    const option = choices[index];
    if (!option) return;
    form.setValue(field.handle, option.value);
    markTouched();
    setOpen(false);
    trigger.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }
    if (event.key === 'Escape') {
      if (open) event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) choose(activeIndex);
      else {
        setActiveIndex(Math.max(0, selectedIndex));
        setOpen(true);
      }
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (event.key === 'Home') setActiveIndex(0);
      else if (event.key === 'End') setActiveIndex(choices.length - 1);
      else {
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const start = open ? activeIndex : selectedIndex;
        setActiveIndex(Math.max(0, Math.min(choices.length - 1, start + direction)));
      }
      setOpen(true);
      return;
    }
    if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const text = (now - search.current.time < 600 ? search.current.text : '') + event.key.toLowerCase();
      search.current = { text, time: now };
      const start = open ? activeIndex : selectedIndex;
      const order = choices.map((_, index) => (Math.max(0, start) + index + 1) % choices.length);
      const match = order.find((index) => choices[index].label.toLowerCase().startsWith(text));
      if (match !== undefined) {
        setActiveIndex(match);
        setOpen(true);
      }
    }
  }

  return (
    <div
      className={styles.subjectPicker}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
          markTouched();
        }
      }}
    >
      <input type="hidden" name={String(input.name ?? field.handle)} value={String(value ?? '')} disabled={disabled} />
      <button
        className={styles.subjectTrigger}
        ref={trigger}
        id={id}
        type="button"
        role="combobox"
        aria-label={field.label}
        data-placeholder={!selected?.value || undefined}
        aria-required={Boolean(input.required)}
        aria-invalid={errors.length > 0}
        aria-describedby={input['aria-describedby'] as string | undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-options`}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        disabled={disabled}
        onKeyDown={onKeyDown}
        onClick={() => {
          setActiveIndex(Math.max(0, selectedIndex));
          setOpen(!open);
        }}
      >
        <SelectIcon handle={field.handle} value={selected?.value ?? ''} label={selected?.label} />
        <span>{selected?.label ?? field.placeholder ?? 'Please select...'}</span>
        <span className={styles.pickerChevron} aria-hidden="true" />
      </button>
      {open && (
        <div className={styles.subjectMenu} id={`${id}-options`} role="listbox" aria-label={field.label} ref={list}>
          {choices.map((option, index) => (
            <div
              className={styles.subjectOption}
              id={`${id}-option-${index}`}
              key={option.value}
              role="option"
              aria-selected={option.value === String(value ?? '')}
              data-active={index === activeIndex || undefined}
              onPointerMove={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              <SelectIcon handle={field.handle} value={option.value} label={option.label} />
              <span>{option.label}</span>
              {option.value === String(value ?? '') && <span className={styles.subjectCheck} aria-hidden="true">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
