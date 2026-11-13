import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { createStorageSlot, useColorMode } from '@docusaurus/theme-common';

type Choice = 'light' | 'dark' | null;
const toChoice = (value: string | null): Choice =>
  value === 'light' || value === 'dark' ? value : null;

/** Temporary appearance only: never persist a different visitor preference. */
export default function IntroTheme() {
  const isBrowser = useIsBrowser();
  const { colorMode, setColorMode } = useColorMode();
  // The installed Docusaurus provider supports {persist:false}; its public
  // context type omits that optional argument. This does not alter the setter.
  const setTransient: (choice: Choice, options: { persist: boolean }) => void = setColorMode;

  useEffect(() => {
    if (!isBrowser) return undefined;
    let restore = toChoice(document.documentElement.getAttribute('data-theme-choice'));
    const preference = createStorageSlot('theme');
    const unsubscribe = preference.listen(event => {
      restore = toChoice(event.newValue);
    });
    setTransient('dark', { persist: false });
    return () => {
      unsubscribe();
      setTransient(restore, { persist: false });
    };
  }, [isBrowser, setTransient]);

  useEffect(() => {
    if (isBrowser && colorMode !== 'dark') setTransient('dark', { persist: false });
  }, [isBrowser, colorMode, setTransient]);

  return <Head>
    <script>{`document.documentElement.setAttribute('data-theme', 'dark');`}</script>
    <style>{`.navbar button[aria-label^="Switch between dark and light mode"] { display: none; }`}</style>
  </Head>;
}
