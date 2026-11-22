import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatCheckedDate } from '../src/components/docs/CompatibilityTable/checkedDate.ts';

test('uses the exact date until the browser is ready', () => {
  assert.deepEqual(formatCheckedDate('2026-11-08'), {
    label: 'Nov 8, 2026', fullDate: 'Nov 8, 2026',
  });
});

test('uses calendar days for today, yesterday and recent checks', () => {
  const now = new Date(2026, 10, 8, 23, 59);
  for (const [checked, expected] of [
    ['2026-11-08', 'Today'],
    ['2026-11-07', 'Yesterday'],
    ['2026-11-06', '2 days ago'],
    ['2026-10-10', '29 days ago'],
    ['2026-10-09', 'Oct 9, 2026'],
  ]) {
    assert.equal(formatCheckedDate(checked, now).label, expected);
  }
  assert.equal(formatCheckedDate('2026-11-08', now).fullDate, 'Nov 8, 2026');
});

test('shows actual dates for older and future checks', () => {
  const now = new Date(2026, 10, 8);
  assert.equal(formatCheckedDate('2025-11-08', now).label, 'Nov 8, 2025');
  assert.equal(formatCheckedDate('2026-11-09', now).label, 'Nov 9, 2026');
});

test('handles local midnight and year boundaries', () => {
  assert.equal(formatCheckedDate('2026-11-08', new Date(2026, 10, 8, 0, 1)).label, 'Today');
  assert.equal(formatCheckedDate('2026-12-31', new Date(2027, 0, 1, 0, 1)).label, 'Yesterday');
});

test('counts leap days and daylight saving transitions as calendar days', () => {
  assert.equal(formatCheckedDate('2024-02-28', new Date(2024, 2, 1)).label, '2 days ago');
  assert.equal(formatCheckedDate('2026-03-08', new Date(2026, 2, 9, 0, 1)).label, 'Yesterday');
  assert.equal(formatCheckedDate('2026-10-31', new Date(2026, 10, 1, 23, 59)).label, 'Yesterday');
});
