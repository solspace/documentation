import {useEffect} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';

type Props = {targets: Record<string, string>};

/** Preserve section links when a reference is split into separate pages. */
export default function LegacyReferenceRedirect({targets}: Props) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const target = targets[decodeURIComponent(location.hash.slice(1))];
    if (!target) return;

    const base = new URL(window.location.href);
    base.pathname = base.pathname.replace(/\/?$/, '/');
    const destination = new URL(target, base);
    history.replace({
      pathname: destination.pathname,
      search: location.search,
      hash: destination.hash,
    });
  }, [history, location.hash, location.search, targets]);

  return null;
}
