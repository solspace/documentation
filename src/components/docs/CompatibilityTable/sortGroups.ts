export type CompatibilitySort = {
  key: 'plugin' | 'developer';
  direction: 'ascending' | 'descending';
};

const names = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

export function sortGroups<T extends { developer: string }>(
  groups: [string, T[]][],
  sort: CompatibilitySort | null,
): [string, T[]][] {
  const result = [...groups];
  if (!sort) return result;

  return result.sort(([aName, aRows], [bName, bRows]) => {
    const a = sort.key === 'plugin' ? aName : aRows[0].developer;
    const b = sort.key === 'plugin' ? bName : bRows[0].developer;
    const primary = names.compare(a, b);
    return (sort.direction === 'ascending' ? primary : -primary)
      || names.compare(aName, bName);
  });
}
