import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DocSearchButton, useDocSearchKeyboardEvents } from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';
import { searchSectionLabel } from '@site/src/utils/searchSectionLabel';

import type {
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react';
import type { LiteClient as SearchClient } from 'algoliasearch/lite';

import docsTag from '@site/docsTag.json';
import allPlugins from '@site/allPlugins.json';

type DocSearchProps = Omit<
  DocSearchModalProps,
  'onClose' | 'initialScrollY'
> & {
  contextualSearch?: boolean;
  externalUrlRegex?: string;
  searchPagePath?: boolean | string;
};

let DocSearchModal: typeof DocSearchModalType | null = null;
let activeSearchButton: HTMLButtonElement | null = null;

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}) {
  return <Link to={hit.url}>{children}</Link>;
}

function getSearchScope(pathname: string) {
  const [platformSlug, pluginSlug, versionSlug] = pathname.split('/').filter(Boolean);
  const pluginPath = `/${platformSlug}/${pluginSlug}`;
  const tags: { version: string; id: string }[] | undefined = docsTag[pluginPath];
  const platform = allPlugins.find(({ slug }) => slug === `/${platformSlug}`);
  const plugin = platform?.items.find(({ slug }) => slug === pluginPath);

  if (!tags || !platform || !plugin) return null;

  const tag = tags.find(({ version }) => version === versionSlug);
  return {
    pluginPath,
    label: `${platform.name} ${plugin.name}`,
    version: tag?.version,
    facetFilters: (tag ? [tag] : tags).map(({ id }) => `docusaurus_tag:${id}`),
  };
}

type SearchScope = ReturnType<typeof getSearchScope>;

function useModalSlot(container: HTMLDivElement | null, selector: string) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setSlot(container?.querySelector<HTMLElement>(selector) ?? null);
  }, [container, selector]);
  return slot;
}

function SearchScopeLabel({ container, scope }: {
  container: HTMLDivElement;
  scope: SearchScope;
}) {
  const header = useModalSlot(container, '.DocSearch-SearchBar');
  if (!header) return null;

  return createPortal(
    <div className="DocSearch-Scope">
      {scope ? (
        <>
          <Translate id="theme.SearchBar.searching">Searching</Translate>{' '}
          <strong>{scope.label}{scope.version && ` · ${scope.version}`}</strong>
        </>
      ) : (
        <Translate id="theme.SearchBar.allDocumentation">Searching all documentation</Translate>
      )}
    </div>,
    header,
  );
}

type ResultsFooterProps =
  Parameters<NonNullable<DocSearchProps['resultsFooterComponent']>>[0] & {
    container: HTMLDivElement | null;
    scope: SearchScope;
    onClose: () => void;
  };

function ResultsFooter({ state, container, scope, onClose }: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator();
  const footer = useModalSlot(container, '.DocSearch-Footer');
  const url = new URL(createSearchLink(state.query), window.location.origin);

  if (scope) {
    url.searchParams.set('plugin', scope.pluginPath);
    if (scope.version) url.searchParams.set('version', scope.version);
  }

  const link = (
    <Link className="DocSearch-AllResults" to={`${url.pathname}${url.search}`} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}
      >
        {'See all {count} results'}
      </Translate>
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 8h10m-4-4 4 4-4 4" />
      </svg>
    </Link>
  );

  return footer ? createPortal(link, footer) : link;
}

type FacetFilters = Required<
  Required<DocSearchProps>['searchParameters']
>['facetFilters'];

function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
  const normalize = (f: FacetFilters): unknown[] =>
    typeof f === 'string' ? [f] : (f as unknown[]);

  return [...normalize(f1), ...normalize(f2)] as FacetFilters;
}

function DocSearch({
  contextualSearch,
  externalUrlRegex,
  ...props
}: DocSearchProps) {
  const { siteMetadata } = useDocusaurusContext();
  const processSearchResultUrl = useSearchResultUrlProcessor();

  const { pathname } = useLocation();

  const scope = useMemo(() => getSearchScope(pathname), [pathname]);

  const contextualSearchFacetFilters =
    (useAlgoliaContextualFacetFilters() || []) as FacetFilters;
  const configFacetFilters = (props.searchParameters?.facetFilters ??
    []) as FacetFilters;

  const facetFilters = useMemo<FacetFilters>(
    () =>
      mergeFacetFilters(
        mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters),
        scope?.facetFilters ?? []
      ),
    [contextualSearchFacetFilters, configFacetFilters, scope]
  );

  const searchParameters = useMemo(
    () => ({
      ...props.searchParameters,
      facetFilters,
    }),
    [props.searchParameters, facetFilters]
  );

  const history = useHistory();
  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const button = searchButtonRef.current;
    return () => {
      if (activeSearchButton === button) activeSearchButton = null;
      searchContainer.current?.remove();
      searchContainer.current = null;
    };
  }, []);

  const importDocSearchModalIfNeeded = useCallback(() => {
    if (DocSearchModal) {
      return Promise.resolve();
    }

    return Promise.all([
      import('@docsearch/react/modal'),
      import('@docsearch/react/style'),
      import('./styles.css'),
    ]).then(([{ DocSearchModal: Modal }]) => {
      DocSearchModal = Modal;
    });
  }, []);

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div');
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);

  const openModal = useCallback(() => {
    const button = searchButtonRef.current;
    if (!button?.getClientRects().length || activeSearchButton) return;

    // Each search button receives the shortcut. Claim it before the modal loads.
    activeSearchButton = button;
    prepareSearchContainer();
    importDocSearchModalIfNeeded()
      .then(() => {
        if (activeSearchButton === button) setIsOpen(true);
      })
      .catch(error => {
        if (activeSearchButton === button) activeSearchButton = null;
        console.error('Unable to load documentation search.', error);
      });
  }, [importDocSearchModalIfNeeded, prepareSearchContainer]);

  const closeModal = useCallback(() => {
    if (activeSearchButton === searchButtonRef.current) activeSearchButton = null;
    setIsOpen(false);
    searchButtonRef.current?.focus();
  }, []);

  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'f' && (event.metaKey || event.ctrlKey)) {
        return;
      }
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal]
  );

  const navigator = useRef({
    navigate({ itemUrl }: { itemUrl?: string }) {
      if (isRegexpStringMatch(externalUrlRegex, itemUrl)) {
        window.location.href = itemUrl!;
      } else {
        history.push(itemUrl!);
      }
    },
  }).current;

  const transformItems = useRef<DocSearchModalProps['transformItems']>((items) => {
    const results = props.transformItems
      ? props.transformItems(items)
      : items.map((item) => ({ ...item, url: processSearchResultUrl(item.url) }));

    return results.map((item) => {
      if (typeof item.hierarchy?.lvl0 !== 'string') return item;
      const label = searchSectionLabel(item.hierarchy.lvl0);
      if (label === item.hierarchy.lvl0) return item;

      const highlight = item._highlightResult;
      const section = highlight?.hierarchy?.lvl0;
      return {
        ...item,
        hierarchy: { ...item.hierarchy, lvl0: label },
        _highlightResult: section
          ? {
              ...highlight,
              hierarchy: { ...highlight.hierarchy, lvl0: { ...section, value: label } },
            }
          : highlight,
      };
    });
  }).current;

  const resultsFooterComponent: DocSearchProps['resultsFooterComponent'] =
    useMemo(
      () =>
        (footerProps): React.JSX.Element => (
          <ResultsFooter
            {...footerProps}
            container={searchContainer.current}
            scope={scope}
            onClose={closeModal}
          />
        ),
      [closeModal, scope]
    );

  const transformSearchClient = useCallback(
    (searchClient: SearchClient) => {
      searchClient.addAlgoliaAgent(
        'docusaurus',
        siteMetadata.docusaurusVersion
      );

      return searchClient;
    },
    [siteMetadata.docusaurusVersion]
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
    isAskAiActive: false,
    onAskAiToggle: () => {},
  });

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal}
        ref={searchButtonRef}
        translations={translations.button}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <>
            <DocSearchModal
              onClose={closeModal}
              initialScrollY={window.scrollY}
              initialQuery={initialQuery}
              navigator={navigator}
              transformItems={transformItems}
              hitComponent={Hit}
              transformSearchClient={transformSearchClient}
              {...(props.searchPagePath && {
                resultsFooterComponent,
              })}
              {...props}
              searchParameters={searchParameters}
              placeholder={translations.placeholder}
              translations={{
                ...translations.modal,
                searchBox: {
                  ...translations.modal?.searchBox,
                  clearButtonTitle: translate({ id: 'theme.SearchBar.clear', message: 'Clear' }),
                },
              }}
            />
            <SearchScopeLabel container={searchContainer.current} scope={scope} />
          </>,
          searchContainer.current
        )}
    </>
  );
}

export default function SearchBar(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />;
}
