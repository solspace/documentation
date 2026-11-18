import type { ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import type { FreeformExtension } from '@solspace/freeform-core';
import { recommendedExtensions } from '@solspace/freeform-extensions';
import { Freeform, type FreeformReactTheme, type RendererOverrides } from '@solspace/freeform-react';
import { darkTheme, lightTheme } from '@solspace/freeform-theme-default';
import '@solspace/freeform-theme-default/styles.css';

type DocsFreeformProps = {
  handle: string;
  baseUrl?: string;
  fallback: ReactNode;
  extensions?: FreeformExtension[];
  theme?: FreeformReactTheme;
  allowRawHtml?: boolean;
  renderers?: RendererOverrides;
};

export default function DocsFreeform({
  handle,
  baseUrl,
  fallback,
  extensions = recommendedExtensions,
  theme,
  allowRawHtml,
  renderers,
}: DocsFreeformProps) {
  const { colorMode: docsColorMode } = useColorMode();

  return (
    <>
      <BrowserOnly>
        {() => (
          <Freeform
            key={JSON.stringify([baseUrl, handle])}
            handle={handle}
            baseUrl={baseUrl ?? window.location.origin}
            extensions={extensions}
            theme={theme ?? (docsColorMode === 'dark' ? darkTheme : lightTheme)}
            allowRawHtml={allowRawHtml}
            renderers={renderers}
            loadingFallback={<p role="status">Loading form…</p>}
            errorFallback={() => fallback}
          />
        )}
      </BrowserOnly>
      <noscript>{fallback}</noscript>
    </>
  );
}
