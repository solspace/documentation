import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';

import type {
  DocSearchModal as DocSearchModalType,
  DocSearchModalProps,
} from '@docsearch/react';
import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types';
import type { SearchClient } from 'algoliasearch/lite';

import docsTag from '@site/docsTag.json';

type DocSearchProps = Omit<
  DocSearchModalProps,
  'onClose' | 'initialScrollY'
> & {
  contextualSearch?: boolean;
  externalUrlRegex?: string;
  searchPagePath?: boolean | string;
};

let DocSearchModal: typeof DocSearchModalType | null = null;

function Hit({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit;
  children: React.ReactNode;
}) {
  return <Link to={hit.url}>{children}</Link>;
}

type ResultsFooterProps = {
  state: any;
  onClose: () => void;
};

function ResultsFooter({ state, onClose }: ResultsFooterProps) {
  const createSearchLink = useSearchLinkCreator();
  const { pathname } = useLocation();

  const [currentSection, currentVersion] = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const section =
      pathSegments.length > 1 ? `/${pathSegments[0]}/${pathSegments[1]}` : null;
    const version = pathSegments[2];
    return [section, version];
  }, [pathname]);

  const query = state.query;

  const tagVersion = useMemo(() => {
    if (currentSection && currentVersion && docsTag[currentSection]) {
      const tag = docsTag[currentSection].find(
        (t) => t.version === currentVersion
      );
      return tag?.version || null;
    }
    return null;
  }, [currentSection, currentVersion]);

  const searchLink = useMemo(() => {
    let baseLink = createSearchLink(query);

    const url = new URL(baseLink, window.location.origin);

    if (currentSection) {
      url.searchParams.append('plugin', currentSection);
    }

    if (tagVersion) {
      url.searchParams.append('version', tagVersion);
    }

    baseLink = url.toString();
    return baseLink;
  }, [query, tagVersion, currentSection]);

  return (
    <Link to={searchLink} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{ count: state.context.nbHits }}
      >
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}

type FacetFilters = Required<
  Required<DocSearchProps>['searchParameters']
>['facetFilters'];

function mergeFacetFilters(f1: FacetFilters, f2: FacetFilters): FacetFilters {
  const normalize = (
    f: FacetFilters
  ): readonly string[] | readonly (string | readonly string[])[] =>
    typeof f === 'string' ? [f] : f;
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

  const versionTags = useMemo(() => {
    const matchingKey = Object.keys(docsTag).find((key) =>
      pathname.startsWith(key)
    );

    if (!matchingKey) return [];

    const matchingTag = docsTag[matchingKey].find((tag) =>
      pathname.startsWith(`${matchingKey}/${tag.version}`)
    );

    if (matchingTag) {
      return [`docusaurus_tag:${matchingTag.id}`];
    }

    return docsTag[matchingKey].map((tag) => `docusaurus_tag:${tag.id}`);
  }, [pathname]);

  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters() || [];
  const configFacetFilters = props.searchParameters?.facetFilters ?? [];

  const facetFilters = useMemo(() => {
    const combinedFilters = [versionTags];
    return combinedFilters;
  }, [contextualSearchFacetFilters, configFacetFilters, versionTags]);

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
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [importDocSearchModalIfNeeded, prepareSearchContainer]);

  const closeModal = useCallback(() => {
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

  const transformItems = useRef<DocSearchModalProps['transformItems']>(
    (items) =>
      props.transformItems
        ? props.transformItems(items)
        : items.map((item) => ({
            ...item,
            url: processSearchResultUrl(item.url),
          }))
  ).current;

  const resultsFooterComponent: DocSearchProps['resultsFooterComponent'] =
    useMemo(
      () =>
        (footerProps: Omit<ResultsFooterProps, 'onClose'>): JSX.Element =>
          <ResultsFooter {...footerProps} onClose={closeModal} />,
      [closeModal]
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
            translations={translations.modal}
          />,
          searchContainer.current
        )}
    </>
  );
}

export default function SearchBar(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return <DocSearch {...(siteConfig.themeConfig.algolia as DocSearchProps)} />;
}
