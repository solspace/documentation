import React, { useEffect, useId, useState } from 'react';
import { formatCheckedDate } from './checkedDate';
import { sortGroups, type CompatibilitySort } from './sortGroups';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type CompatibilityRow = {
  name: string;
  developer: string;
  url: string;
  icon?: string;
  version: string;
  compatible: boolean;
  adapter: boolean;
  checked: string | null;
  darkModeSince: string;
  parent?: string;
};

function Check({ label, neutral = false }: { label: string; neutral?: boolean }) {
  return <span role="img" aria-label={label} className={neutral ? styles.adapterCheck : styles.check}>✓</span>;
}

function PluginIcon({ icon }: { icon?: string }) {
  const [failed, setFailed] = useState(false);
  const fallback = useBaseUrl('/icons/plugins/default-plugin.svg');
  const source = useBaseUrl(icon || '/icons/plugins/default-plugin.svg');
  const missing = !icon || failed;
  return <img src={missing ? fallback : source} alt="" width="24" height="24" loading="lazy"
    className={`${styles.pluginIcon} ${missing ? styles.placeholderIcon : ''}`}
    onError={() => setFailed(true)} />;
}

function SortHeader({ sortKey, label, sort, onSort }: {
  sortKey: CompatibilitySort['key'];
  label: string;
  sort: CompatibilitySort | null;
  onSort: (key: CompatibilitySort['key']) => void;
}) {
  const direction = sort?.key === sortKey ? sort.direction : 'none';
  const path = direction === 'ascending' ? 'm4 10 4-4 4 4'
    : direction === 'descending' ? 'm4 6 4 4 4-4' : 'm5 6 3-3 3 3m-6 4 3 3 3-3';
  return <th scope="col" aria-sort={direction}>
    <button type="button" className={styles.sortButton}
      aria-label={`Sort by ${sortKey === 'plugin' ? 'plugin' : 'developer'} name`}
      onClick={() => onSort(sortKey)}>
      {label}
      <svg className={`${styles.sortIcon} ${direction !== 'none' ? styles.sortActive : ''}`}
        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={path} />
      </svg>
    </button>
  </th>;
}

function CheckedDate({ date, now }: { date: string; now: Date | null }) {
  const { label, fullDate } = formatCheckedDate(date, now);
  return <time dateTime={date} title={fullDate}
    aria-label={label === fullDate ? fullDate : `${label} (${fullDate})`}>
    {label}
  </time>;
}

export default function CompatibilityTable({ rows }: { rows: CompatibilityRow[] }) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);
  const [sort, setSort] = useState<CompatibilitySort | null>(null);
  const toggleSort = (key: CompatibilitySort['key']) => setSort(current => ({
    key,
    direction: current?.key === key && current.direction === 'ascending' ? 'descending' : 'ascending',
  }));
  const [now, setNow] = useState<Date | null>(null);
  // Keep server output and hydration identical, then use the visitor's local date.
  useEffect(() => { setNow(new Date()); }, []);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered = rows.filter(row => {
    const text = `${row.name} ${row.developer}`.toLowerCase();
    return terms.every(term => text.includes(term));
  });
  const groups = new Map<string, CompatibilityRow[]>();
  for (const row of filtered) {
    const name = row.parent ?? row.name;
    groups.set(name, [...(groups.get(name) ?? []), row]);
  }

  return (
    <section aria-label="Plugin compatibility" className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.search}>
          <label htmlFor={`${id}-search`} className={styles.srOnly}>Search plugins or developers</label>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <input id={`${id}-search`} type="text" role="searchbox" enterKeyHint="search"
            placeholder="Search plugins or developers…" value={query} spellCheck={false}
            onChange={event => setQuery(event.target.value)} aria-controls={`${id}-table`}
            onKeyDown={event => { if (event.key === 'Escape') setQuery(''); }} />
          {query !== '' && <button type="button" className={styles.clear}
            aria-label="Clear search" onClick={() => {
              setQuery('');
              document.getElementById(`${id}-search`)?.focus();
            }}>Clear</button>}
        </div>
      </div>
      <p className={styles.count} role="status" aria-live="polite" aria-atomic="true">
        {filtered.length === rows.length ? `${rows.length} versions` : `${filtered.length} of ${rows.length} versions`}
      </p>
      <div className={styles.scroll} role="region" aria-label="Compatibility results" tabIndex={0}>
        <table id={`${id}-table`} className={styles.table}>
          <caption className={styles.srOnly}>Plugins, developers, and darkMode compatibility</caption>
          <thead><tr>
            <th scope="col" className={styles.iconCell}><span className={styles.srOnly}>Plugin icon</span></th>
            <SortHeader sortKey="plugin" label="Plugin" sort={sort} onSort={toggleSort} />
            <SortHeader sortKey="developer" label="Developer" sort={sort} onSort={toggleSort} />
            <th scope="col">Version checked</th>
            <th scope="col" className={styles.center}>Compatible</th>
            <th scope="col" className={styles.center}>Adapter included</th>
            <th scope="col" title="First compatible darkMode release">Supported since</th>
            <th scope="col">Last checked</th>
          </tr></thead>
          {sortGroups(Array.from(groups), sort).map(([name, versions]) => {
            const isExpanded = terms.length > 0 || expanded.includes(name);
            const visible = isExpanded ? versions : versions.filter(row => !row.parent);
            const hasOlderVersions = versions.some(row => row.parent);
            return <tbody key={name}>
              {visible.map((row, index) => (
                <tr key={`${row.name}-${row.version}`} className={row.parent ? styles.earlierRow : undefined}>
                  {index === 0 && <td rowSpan={visible.length} className={styles.iconCell}>
                    <a href={row.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                      <PluginIcon icon={row.icon} />
                    </a>
                  </td>}
                  {index === 0 && <th scope="rowgroup" rowSpan={visible.length} className={styles.name}>
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className={styles.pluginLink}>
                      {name}<span className={styles.srOnly}> (opens in a new tab)</span>
                    </a>
                    {hasOlderVersions && terms.length === 0 && <button type="button"
                      className={styles.expand} aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Hide' : 'Show'} older versions of ${name}`}
                      onClick={() => setExpanded(current => current.includes(name)
                        ? current.filter(item => item !== name) : [...current, name])}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="m5 6 3 3 3-3" />
                      </svg>
                      {isExpanded ? 'Hide older versions' : 'Older versions'}
                    </button>}
                  </th>}
                  <td className={styles.developer}>{row.parent ? null : row.developer}</td>
                  <td>
                    {row.version}
                  </td>
                  <td className={styles.center}>{row.compatible ? <Check label="Compatible" /> : '—'}</td>
                  <td className={styles.center}>{row.adapter ? <Check label="Adapter included" neutral /> : '—'}</td>
                  <td>{row.darkModeSince}</td>
                  <td className={styles.date}>{row.checked
                    ? <CheckedDate date={row.checked} now={now} /> : '—'}</td>
                </tr>
              ))}
            </tbody>;
          })}
          {!filtered.length && <tbody><tr><td colSpan={8} className={styles.empty}>No matching plugins. Try another plugin or developer name.</td></tr></tbody>}
        </table>
      </div>
    </section>
  );
}
