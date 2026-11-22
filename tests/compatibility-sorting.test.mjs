import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sortGroups } from '../src/components/docs/CompatibilityTable/sortGroups.ts';

const calendar = [
  { developer: 'Solspace', version: '6.x' },
  { developer: 'Solspace', version: '5.0.33' },
];
const groups = [
  ['Vizy', [{ developer: 'Verbb' }]],
  ['Calendar', calendar],
  ['Formie', [{ developer: 'Verbb' }]],
  ['Blitz', [{ developer: 'PutYourLightsOn' }]],
];
const names = entries => entries.map(([name]) => name);

test('keeps the authored order until a sort is chosen', () => {
  assert.deepEqual(names(sortGroups(groups, null)), ['Vizy', 'Calendar', 'Formie', 'Blitz']);
});

test('sorts plugin groups in both directions without separating older versions', () => {
  const ascending = sortGroups(groups, { key: 'plugin', direction: 'ascending' });
  assert.deepEqual(names(ascending), ['Blitz', 'Calendar', 'Formie', 'Vizy']);
  assert.equal(ascending[1][1], calendar);
  assert.deepEqual(calendar.map(row => row.version), ['6.x', '5.0.33']);
  assert.deepEqual(names(sortGroups(groups, { key: 'plugin', direction: 'descending' })), ['Vizy', 'Formie', 'Calendar', 'Blitz']);
  assert.deepEqual(names(groups), ['Vizy', 'Calendar', 'Formie', 'Blitz']);
});

test('sorts developers in both directions with alphabetical plugin ties', () => {
  assert.deepEqual(names(sortGroups(groups, { key: 'developer', direction: 'ascending' })), ['Blitz', 'Calendar', 'Formie', 'Vizy']);
  assert.deepEqual(names(sortGroups(groups, { key: 'developer', direction: 'descending' })), ['Formie', 'Vizy', 'Calendar', 'Blitz']);
});

test('uses case-insensitive natural ordering for names', () => {
  const numeric = [['Plugin 10', [{ developer: 'zeta' }]], ['plugin 2', [{ developer: 'Alpha' }]]];
  assert.deepEqual(names(sortGroups(numeric, { key: 'plugin', direction: 'ascending' })), ['plugin 2', 'Plugin 10']);
  assert.deepEqual(names(sortGroups(numeric, { key: 'developer', direction: 'ascending' })), ['plugin 2', 'Plugin 10']);
});
