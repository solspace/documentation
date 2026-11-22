// This is guidance only; it never changes or blocks the submitted value.
export function needsVersionHint(value: unknown): boolean {
  const text = String(value ?? '').trim().replace(/[.,;:!]+$/, '');
  if (!text) return false;
  if (/[~^<>*]/.test(text)) return true;

  const versions = text.match(/(?:^|[^\d.])v?\d+\.\d+(?:\.\d+)*(?:-[0-9a-z.-]+)?(?:\+[0-9a-z.-]+)?(?![\w.])/gi);
  return versions?.length !== 1;
}
