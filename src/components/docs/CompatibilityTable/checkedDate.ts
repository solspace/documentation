const fullDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
});

export function formatCheckedDate(checked: string, now: Date | null = null) {
  const date = new Date(`${checked}T00:00:00Z`);
  const fullDate = fullDateFormat.format(date);
  let label = fullDate;

  if (now) {
    // Compare calendar days rather than elapsed hours, including across DST.
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const days = (today - date.getTime()) / 86_400_000;
    if (days === 0) label = 'Today';
    else if (days === 1) label = 'Yesterday';
    else if (days > 1 && days < 30) label = `${days} days ago`;
  }

  return { label, fullDate };
}
