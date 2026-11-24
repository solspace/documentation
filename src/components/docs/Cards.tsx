import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SimpleTextLink, Badge } from '@site/src/components/utils';
import fieldStyles from './FieldCards.module.css';
import navigationStyles from './NavigationCards.module.css';

interface CardProps {
  fullCardLink?: string;
  linkWithDescription?: string;
  linkWithDescriptionLabel?: string;
  title: string;
  titleBadge?: string;
  description?: string;
  icon?: string;
  filterIcon?: boolean;
}

interface NavigationCardProps extends CardProps {
  proOnly?: boolean;
}

interface FieldProps {
  link: string;
  title: string;
  titleBadge?: string;
  popular?: string;
  description: string;
  icon?: string;
  color?: string;
  filterIcon?: boolean;
  category?: string;
  proOnly?: boolean;
}

interface IntegrationLogoProps {
  title: string;
  iconSrc: string;
  link: string;
}

interface OldIntegrationCardsProps {
  items: IntegrationLogoProps[];
}

interface IntegrationProps {
  title: string;
  icon: string;
  link: string;
  filterIcon?: boolean;
  description?: string;
  proOnly?: boolean;
}

interface IntegrationCardsProps {
  items: IntegrationProps[];
  layout?: string;
}

interface CardSectionProps {
  items: CardProps[];
  promo?: boolean;
  layout?: string;
  navCards?: boolean;
}

interface FieldCardsProps {
  items: FieldProps[];
  catalog?: boolean;
  searchable?: boolean;
  headingLevel?: 3 | 4;
}

interface GuideCardsProps {
  items: FieldProps[];
}

interface ChildrenProps {
  children: React.ReactNode;
}

interface ChecklistItem {
  text: React.ReactNode;
}

interface ChecklistSection {
  items: ChecklistItem[];
}

interface IconsCardItem {
  iconSrc: string;
  iconTitle: string;
  link: string;
  extraContent?: string;
}

interface IconsCardProps {
  items: IconsCardItem[];
}

const IconCards: React.FC<IconsCardProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 mb-6 justify-start gap-4 icon-cards">
      {items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="flex flex-col relative items-start rounded-2xl transition-all duration-500 dark:text-white bg-[rgba(0,127,230,0.2)] dark:bg-[rgba(0,105,190,0.25)] hover:bg-[#87c9ff] hover:dark:bg-[#0069be]"
        >
          {item.iconSrc && (
            <Image
              alt={item.iconTitle || 'Solspace Freeform'}
              className="px-4 py-5"
              img={item.iconSrc}
            />
          )}
          {item.extraContent && (
            <div className="absolute bottom-0 left-0 right-0 py-1.5 text-center font-semibold rounded-b-2xl text-sm text-white bg-green-600 dark:bg-green-800 w-full">
              {item.extraContent}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

const AnswerChecklist: React.FC<ChecklistSection> = ({ items }) => {
  const id = useId();

  return (
    <div className="checklist">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-start mb-2">
            <input
              type="checkbox"
              id={`${id}-${index}`}
              className="mt-1 mr-2"
            />
            <label htmlFor={`${id}-${index}`} className="flex flex-col">
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnswerCard: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="border border-solid border-green-500 dark:border-green-600 p-5 mt-5 rounded-lg bg-green-100 dark:bg-[#09230c] answer-card">
      <div className="flex">
        <div className="circle">
          <div className="checkmark"></div>
        </div>
        <h4>Answer</h4>
      </div>

      {children}
    </div>
  );
};

const Card: React.FC<NavigationCardProps> = ({
  fullCardLink,
  linkWithDescription,
  linkWithDescriptionLabel,
  title,
  titleBadge,
  description,
  icon,
  filterIcon,
  proOnly,
}) => {
  const iconSrc = useBaseUrl(icon ? `/icons/cards/${icon}.svg` : '');

  if (fullCardLink) {
    return (
      <Link to={fullCardLink} className={navigationStyles.card}>
        {icon && (
          <img
            src={iconSrc}
            className={clsx(navigationStyles.icon, filterIcon && 'filter-icons')}
            alt=""
            width={22}
            height={22}
          />
        )}
        <span className={navigationStyles.copy}>
          <span className={navigationStyles.heading}>
            <span><CatalogMatchText text={title} /></span>
            {titleBadge && (
              <Badge type="feature" text={titleBadge} />
            )}
            {proOnly && (
              <Badge type="pro" text="Pro" ariaLabel="Available in Freeform Pro only" />
            )}
          </span>
          {description && (
            <span className={navigationStyles.description}><CatalogMatchText text={description} /></span>
          )}
        </span>
        <span className={navigationStyles.chevron} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <div className="relative pl-9">
      <dt className="font-semibold text-lg text-black dark:text-white">
        {icon && (
          <img
            src={iconSrc}
            className={`absolute top-1 left-1 size-5 mb-2 ${filterIcon ? 'filter-icons' : ''}`}
            alt={title || 'Freeform'}
          />
        )}
        {title}{' '}
        {titleBadge && (
          <Badge type="feature" text={titleBadge} />
        )}
      </dt>
      <dd className={clsx("ml-0", navigationStyles.descriptionTone)}>
        {description}{' '}
        {linkWithDescription && (
          <span className="whitespace-nowrap">
            <SimpleTextLink
              to={linkWithDescription}
              label={
                linkWithDescriptionLabel
                  ? linkWithDescriptionLabel
                  : 'Learn more'
              }
            />
          </span>
        )}
      </dd>
    </div>
  );
};

const PromoCard: React.FC<CardProps> = ({
  fullCardLink,
  title,
  titleBadge,
  description,
  icon,
}) => {
  return (
    <Link
      to={fullCardLink}
      className="flex items-start gap-2 border rounded-lg p-3 m-1 2xl:max-w-full transition-all duration-500 dark:text-white bg-[rgba(0,127,230,0.2)] dark:bg-[rgba(0,105,190,0.25)] hover:bg-[#87c9ff] hover:dark:bg-[#0069be] hover:m-0 hover:p-4"
    >
      {icon && (
        <div className="flex-shrink-0">
          <Image
            alt={title || 'Promo Image'}
            img={require(`@site/static/icons/old/${icon}.png`)}
            className="w-10 h-10"
          />
        </div>
      )}

      <div
        className={`flex flex-col justify-start ${
          !description && 'justify-center'
        } pl-2`}
      >
        <h3
          className={`font-semibold mb-0 text-black dark:text-white ${
            description ? 'text-lg' : 'text-2xl'
          }`}
        >
          {title}
          {titleBadge &&<Badge type="feature" text={titleBadge} />}
        </h3>
        {description && (
          <p className={clsx("text-sm mb-1", navigationStyles.descriptionTone, navigationStyles.descriptionOnTint)}>
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

const FlexCards: React.FC<CardSectionProps> = ({ items, promo, navCards }) => {
  if (promo) {
    return (
      <div className="menu-grid">
        {items.map((item, index) => (
          <PromoCard
            key={`flex-cards-${index}`}
            fullCardLink={item.fullCardLink}
            title={item.title}
            titleBadge={item?.titleBadge}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    );
  }

  const cards = (
    <div className={navCards ? navigationStyles.grid : 'max-w-none text-sm/5 text-gray-700 dark:text-gray-300 mx-auto my-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3'}>
      {items.map((item, index) => (
        <Card
          key={`flex-cards-${index}`}
          fullCardLink={item.fullCardLink}
          linkWithDescription={item.linkWithDescription}
          linkWithDescriptionLabel={item.linkWithDescriptionLabel}
          title={item.title}
          titleBadge={item?.titleBadge}
          description={item.description}
          icon={item.icon}
          filterIcon={item.filterIcon}
        />
      ))}
    </div>
  );

  return navCards ? <div className={navigationStyles.collection}>{cards}</div> : cards;
};

const IntroCard: React.FC<CardProps> = ({
  title,
  titleBadge,
  description,
  icon,
  filterIcon,
  linkWithDescription,
  linkWithDescriptionLabel,
}) => {
  const iconSrc = icon && useBaseUrl(`/icons/cards/${icon}.svg`);

  return (
    <div className="relative pl-9">
      <dt className="font-semibold text-lg text-black dark:text-white">
        {icon && (
          <img
            src={iconSrc}
            className={`absolute top-1 left-1 size-5 mb-2 ${filterIcon ? 'filter-icons' : ''}`}
            alt={title || 'Freeform'}
          />
        )}
        {title}{' '}
        {titleBadge && (
          <Badge type="feature" text={titleBadge} />
        )}
      </dt>
      <dd className={clsx("ml-0", navigationStyles.descriptionTone)}>
        {description}{' '}
        {linkWithDescription && (
          <span className="whitespace-nowrap">
            <SimpleTextLink
              to={linkWithDescription}
              label={
                linkWithDescriptionLabel
                  ? linkWithDescriptionLabel
                  : 'Learn more'
              }
            />
          </span>
        )}
      </dd>
    </div>
  );
};

const IntroCards: React.FC<CardSectionProps> = ({ items, layout }) => {
  return (
    <dl className={`lg:max-w-none text-sm/5 text-gray-700 dark:text-gray-300 ${layout === 'inline' ? 'mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:grid-cols-3' : 'mt-10 max-w-xl space-y-8'}`}>
      {items.map((item, index) => (
        <IntroCard
          key={`intro-cards-${index}`}
          linkWithDescription={item.linkWithDescription}
          linkWithDescriptionLabel={item.linkWithDescriptionLabel}
          title={item.title}
          titleBadge={item?.titleBadge}
          description={item.description}
          icon={item.icon}
          filterIcon={item.filterIcon}
        />
      ))}
    </dl>
  );
};

interface CatalogCardProps extends FieldProps {
  iconDirectory?: 'fields' | 'integrations';
  searchQuery?: string;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ iconDirectory = 'fields', searchQuery, ...item }) => {
  const iconSrc = useBaseUrl(`/icons/${iconDirectory}/${item.icon}.svg`);

  return (
    <Link to={item.link} className={`${fieldStyles.card} bg-slate-500/5 hover:bg-slate-500/10`}>
      {item.icon && (
        <span className={`${iconDirectory !== 'fields' ? fieldStyles.integrationIcon : fieldStyles.icon} ${item.color || ''}`}>
          <img
            src={iconSrc}
            alt=""
            className={item.filterIcon ? 'filter-icons' : undefined}
          />
        </span>
      )}
      <span className={fieldStyles.copy}>
        <span className={fieldStyles.heading}>
          <span className={fieldStyles.title}><CatalogMatchText text={item.title} query={searchQuery} /></span>
          {item.proOnly && (
            <Badge type="pro" text="Pro" ariaLabel="Available in Freeform Pro only" />
          )}
        </span>
        <span className={fieldStyles.description}><CatalogMatchText text={item.description} query={searchQuery} /></span>
      </span>
    </Link>
  );
};

interface CatalogSearchItem {
  title: string;
  description?: string;
}

function filterCatalogItems<T extends CatalogSearchItem>(items: T[], query: string): T[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return items;

  const terms = normalizedQuery.split(/\s+/);
  return items.filter(({ title, description = '' }) => {
    const searchableText = `${title} ${description}`.toLowerCase();
    return terms.every((term) => searchableText.includes(term));
  });
}

interface CatalogSearchProps {
  label: string;
  query: string;
  onQueryChange: (query: string) => void;
  emptyMessage: string;
}

function CatalogSearch({ label, query, onQueryChange, emptyMessage }: CatalogSearchProps) {
  return (
    <>
      <div className={clsx(fieldStyles.search, "docs-catalog-search")} role="search" aria-label={label}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" strokeWidth="1.4" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <input
          type="search"
          aria-label={label}
          placeholder={`${label}…`}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </div>
      <div className={fieldStyles.searchStatus} role="status">{emptyMessage}</div>
    </>
  );
}

const CatalogSearchContext = createContext('');

interface SearchableCardCatalogProps extends ChildrenProps {
  items: CatalogSearchItem[];
  label: string;
  emptyMessage: string;
  shortcuts?: React.ReactNode;
}

function SearchableCardCatalog({ items, label, emptyMessage, shortcuts, children }: SearchableCardCatalogProps) {
  const [query, setQuery] = useState('');
  const hasResults = filterCatalogItems(items, query).length > 0;

  return (
    <>
      <CatalogSearch
        label={label}
        query={query}
        onQueryChange={setQuery}
        emptyMessage={hasResults ? '' : emptyMessage}
      />
      {!query.trim() && shortcuts}
      <CatalogSearchContext.Provider value={query}>
        {children}
      </CatalogSearchContext.Provider>
    </>
  );
}

const issueHighlightName = 'common-issue-search';

function getCatalogSearchExpression(query: string) {
  const terms = query.trim().split(/\s+/).sort((a, b) => b.length - a.length);
  const alternatives = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  return new RegExp(`(${alternatives})`, 'gi');
}

function CatalogMatchText({ text, query }: { text: string; query?: string }) {
  const contextQuery = useContext(CatalogSearchContext);
  const activeQuery = query ?? contextQuery;
  if (!activeQuery.trim()) return text;

  return text.split(getCatalogSearchExpression(activeQuery)).map((part, index) => (
    index % 2 === 0 ? part : <mark key={index} className={fieldStyles.searchMatch}>{part}</mark>
  ));
}

function collectIssueHighlights(root: HTMLElement, expression: RegExp, ranges: Range[], panels: Set<HTMLDetailsElement>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node as Text;
    const matches = Array.from(text.data.matchAll(expression));
    if (!matches.length) continue;

    for (const match of matches) {
      const range = document.createRange();
      range.setStart(text, match.index);
      range.setEnd(text, match.index + match[0].length);
      ranges.push(range);
    }

    const parent = text.parentElement;
    let panel = parent?.closest<HTMLDetailsElement>('details');
    if (panel && parent?.closest('summary')?.parentElement === panel) {
      panel = panel.parentElement?.closest<HTMLDetailsElement>('details');
    }
    while (panel && root.contains(panel)) {
      panels.add(panel);
      panel = panel.parentElement?.closest<HTMLDetailsElement>('details');
    }
  }
}

function isIssueOpen(panel: HTMLDetailsElement) {
  // Docusaurus keeps `open` set until the closing animation ends.
  const collapsed = panel.getAttribute('data-collapsed');
  return collapsed === null ? panel.open : collapsed === 'false';
}

function SearchableIssues({ children, shortcuts }: ChildrenProps & { shortcuts: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [hasResults, setHasResults] = useState(true);
  const issuesRef = useRef<HTMLDivElement>(null);
  const autoOpened = useRef(new Set<HTMLDetailsElement>());

  useEffect(() => {
    const sections = issuesRef.current?.querySelectorAll<HTMLElement>(':scope > section');
    if (!sections) return;

    const expression = query.trim() ? getCatalogSearchExpression(query) : null;
    const ranges: Range[] = [];
    const panelsToOpen = new Set<HTMLDetailsElement>();
    let hasMatches = false;
    sections.forEach((section) => {
      const heading = section.querySelector('h2');
      const title = heading?.textContent ?? '';
      const issues = Array.from(section.querySelectorAll<HTMLDetailsElement>(':scope > details'), (element) => ({
        element,
        title,
        description: element.textContent ?? '',
      }));
      const matches = new Set(filterCatalogItems(issues, query));
      issues.forEach((issue) => { issue.element.hidden = !matches.has(issue); });
      section.hidden = matches.size === 0;
      hasMatches ||= matches.size > 0;

      if (expression && matches.size) {
        if (heading) collectIssueHighlights(heading, expression, ranges, panelsToOpen);
        matches.forEach(({ element }) => collectIssueHighlights(element, expression, ranges, panelsToOpen));
      }
    });

    for (const panel of autoOpened.current) {
      if (panelsToOpen.has(panel)) continue;
      // Let a hidden panel close when it becomes visible so Details can finish its transition.
      if (panel.closest('[hidden]')) continue;
      if (isIssueOpen(panel)) panel.querySelector<HTMLElement>(':scope > summary')?.click();
      autoOpened.current.delete(panel);
    }
    for (const panel of panelsToOpen) {
      if (isIssueOpen(panel)) continue;
      panel.querySelector<HTMLElement>(':scope > summary')?.click();
      autoOpened.current.add(panel);
    }

    const highlights = CSS.highlights as HighlightRegistry & Pick<Map<string, Highlight>, 'set' | 'delete'>;
    if (typeof Highlight === 'function' && highlights && ranges.length) {
      highlights.set(issueHighlightName, new Highlight(...ranges));
    }
    setHasResults(hasMatches);
    return () => { highlights?.delete(issueHighlightName); };
  }, [children, query]);

  return (
    <>
      <CatalogSearch
        label="Search common issues"
        query={query}
        onQueryChange={setQuery}
        emptyMessage={hasResults ? '' : 'No issues match your search.'}
      />
      {!query.trim() && shortcuts}
      <div ref={issuesRef} className="common-issues">
        {children}
      </div>
    </>
  );
}

const FieldCards: React.FC<FieldCardsProps> = ({ items, catalog = false, searchable = false, headingLevel = 3 }) => {
  const id = useId();
  const [query, setQuery] = useState('');
  const CategoryHeading = headingLevel === 4 ? 'h4' : 'h3';

  if (catalog) {
    const categories = new Map<string, FieldProps[]>();
    filterCatalogItems(items, query).forEach((item) => {
      const category = item.category || 'Fields';
      const group = categories.get(category) || [];
      group.push(item);
      categories.set(category, group);
    });

    return (
      <div className={fieldStyles.catalog}>
        {searchable && (
          <CatalogSearch
            label="Search fields"
            query={query}
            onQueryChange={setQuery}
            emptyMessage={categories.size === 0 ? 'No fields match your search.' : ''}
          />
        )}
        {Array.from(categories, ([category, fields], index) => (
          <section
            key={category}
            className={fieldStyles.section}
            aria-labelledby={`${id}-${index}`}
          >
            <CategoryHeading id={`${id}-${index}`} className={fieldStyles.category}>
              {category}
            </CategoryHeading>
            <div className={fieldStyles.grid}>
              {fields.map((item) => (
                <CatalogCard key={item.link} searchQuery={query} {...item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center rounded-lg">
      {items.map((item, index) => (
        <Link
          key={`field-cards-${index}`}
          to={item.link}
          className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/7 xl:w-1/8 2xl:w-1/10 p-4 flex flex-col items-center text-center text-black dark:text-white rounded-2xl hover:bg-slate-500/10"
        >
          <div>
            {item.icon && (
              <span className={`inline-flex rounded-lg ${item.color} p-3 items-center justify-center`}>
                <img
                  src={useBaseUrl(`/icons/fields/${item.icon}.svg`)} alt={item.title}
                  className={`w-5 h-auto opacity-100 duration-500 transition-all ${item.filterIcon ? 'filter-icons' : ''}`}
                />
              </span>
            )}
          </div>
          <div className="mt-2">
            <p className="mb-0 text-sm font-semibold">
              {item.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

const SettingsCards: React.FC<FieldCardsProps> = ({ items }) => (
  <div className={fieldStyles.catalog}>
    <div className={navigationStyles.grid}>
      {items.map((item) => (
        <Card key={item.link} {...item} fullCardLink={item.link} />
      ))}
    </div>
  </div>
);

function SettingsCatalogGroup({ items, children }: ChildrenProps & Pick<FieldCardsProps, 'items'>) {
  const query = useContext(CatalogSearchContext);
  const matches = filterCatalogItems(items, query);
  if (!matches.length) return null;

  return (
    <>
      {children}
      <SettingsCards items={matches} />
    </>
  );
}

const IntegrationCards: React.FC<IntegrationCardsProps> = ({ items, layout }) => {

  if (layout === 'catalog') {
    return (
      <div className={fieldStyles.catalog}>
        <div className={fieldStyles.grid}>
          {items.map((item) => (
            <CatalogCard
              key={`${item.link}-${item.title}`}
              {...item}
              description={item.description || ''}
              iconDirectory="integrations"
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === 'large') {
    return (
      <div className="flex flex-wrap rounded-lg">
        {items.map((item, index) => (
          <Link
            key={`integration-cards-${index}`}
            to={item.link}
            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/4 xl:w-1/7 2xl:w-1/8 p-4 flex flex-col items-center text-center text-black dark:text-white rounded-2xl hover:bg-slate-500/10"
          >
            <div>
              {item.icon && (
                <span className={`inline-flex rounded-lg p-3 items-center justify-center`}>
                  <img
                    src={useBaseUrl(`/icons/integrations/${item.icon}.svg`)} alt={item.title}
                    className={`w-20 h-auto opacity-100 duration-500 transition-all ${item.filterIcon ? 'filter-icons' : ''}`}
                  />
                </span>
              )}
            </div>
            <div className="mt-2">
              <p className="mb-0 text-base font-semibold">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center rounded-lg mb-20">
      {items.map((item, index) => (
        <Link
          key={`integration-cards-${index}`}
          to={item.link}
          className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/7 xl:w-1/8 2xl:w-1/10 p-4 flex flex-col items-center text-center text-black dark:text-white rounded-2xl hover:bg-slate-500/10"
        >
          <div>
            {item.icon && (
              <span className={`inline-flex rounded-lg p-3 items-center justify-center`}>
                <img
                  src={useBaseUrl(`/icons/integrations/${item.icon}.svg`)} alt={item.title}
                  className={`w-12 h-auto opacity-100 duration-500 transition-all ${item.filterIcon ? 'filter-icons' : ''}`}
                />
              </span>
            )}
          </div>
          <div className="mt-2">
            <p className="mb-0 text-sm font-semibold">
              {item.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

interface IntegrationCatalogProps extends ChildrenProps {
  items: IntegrationProps[];
}

function SearchableIntegrationCatalog({ items, children }: IntegrationCatalogProps) {
  return (
    <div className={fieldStyles.integrationLanding}>
      <SearchableCardCatalog
        items={items}
        label="Search integrations"
        emptyMessage="No integrations match your search."
      >
        {children}
      </SearchableCardCatalog>
    </div>
  );
}

function IntegrationCatalogGroup({ items, children }: Omit<IntegrationCatalogProps, 'children'> & { children?: React.ReactNode }) {
  const query = useContext(CatalogSearchContext);
  const matches = filterCatalogItems(items, query);
  if (!matches.length) return null;

  return (
    <>
      {children}
      <IntegrationCards layout="catalog" items={matches} />
    </>
  );
}

type GuideTone = 'blue' | 'teal' | 'violet' | 'rose' | 'amber';

type GuideCollectionProps = GuideCardsProps & { tone?: GuideTone };

function GuideIllustration({ icon }: { icon: string }) {
  const iconUrl = useBaseUrl(`/icons/cards/${icon}.svg`);

  return (
    <span className={navigationStyles.guideIllustration} aria-hidden="true">
      <span className={navigationStyles.guideGlyph} style={{ maskImage: `url("${iconUrl}")` }} />
    </span>
  );
}

const GuideCards: React.FC<GuideCollectionProps> = ({ items, tone = 'blue' }) => (
  <div className={navigationStyles.guideCollection} data-tone={tone}>
    <ul className={navigationStyles.guideList} role="list">
      {items.map((item) => (
        <li key={item.link}>
          <Link to={item.link} className={navigationStyles.guideLink}>
            {item.icon && <GuideIllustration icon={item.icon} />}
            <span className={navigationStyles.heading}>
              <span><CatalogMatchText text={item.title} /></span>
              {item.popular && <span className={navigationStyles.guideBadge}>Popular</span>}
            </span>
            <span className={navigationStyles.description}><CatalogMatchText text={item.description} /></span>
            <span className={navigationStyles.chevron} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

function GuideCatalogGroup({ items, tone, children }: ChildrenProps & GuideCollectionProps) {
  const query = useContext(CatalogSearchContext);
  const matches = filterCatalogItems(items, query);
  if (!matches.length) return null;

  return (
    <>
      {children}
      <GuideCards items={matches} tone={tone} />
    </>
  );
}

const ReviewCards: React.FC<GuideCardsProps> = ({ items }) => {
  return (
    <div className="relative left-1/2 right-1/2 ml-[-49.5vw] mr-[-49.5vw] w-[99vw] mt-20 flow-root">
      <div className="review-card -mt-10 sm:columns-2 sm:text-[0] lg:columns-3 xl:columns-4">
        {items.map((item, index) => (
          <div className="pt-0 sm:pt-10 inline-block w-full" key={`review-cards-${index}`}>
            <figure className="rounded-2xl bg-gradient-to-tr from-[#64a3f1]/5 to-[#c3dff8]/5 p-6 text-sm/6">
              <p className="stars">★★★★★</p>
              <blockquote>
                <p className="text-gray-800 dark:text-gray-200">“{item.description}”</p>
              </blockquote>
              <figcaption className="mt-3">
                <cite className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</cite>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

const FaqCards: React.FC<GuideCardsProps> = ({ items }) => {
  return (
    <dl className="faq-card mx-auto max-w-6xl mt-20">
      {items.map((item, index) => (
        <div
          key={`faq-cards-${index}`}
          className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 gap-8"
        >
          <dt className="text-lg font-semibold text-black/90 dark:text-white/90 lg:col-span-4">
            {item.title}
          </dt>
          <dd className="mt-4 ml-0 lg:mt-0 lg:col-span-8">
            <p
              className="text-base mb-0 text-black/80 dark:text-white/80"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
};

const PhotoCards: React.FC<OldIntegrationCardsProps> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <a
          key={`${item.title}-${index}`}
          href={item.link}
          className="flex flex-col items-center p-3 m-2 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
        >
          <Image img={item.iconSrc} alt={item.title} />
        </a>
      ))}
    </>
  );
};

const OldIntegrationCards: React.FC<OldIntegrationCardsProps> = ({
  items,
}) => {
  return (
    <div className="relative block overflow-hidden rounded-lg mb-10">
      <div className="api-grid-wrapper-inner">
        <div className="api-grid-wrapper-outer">
          <div className="feature-grid feature-api-grid">
            {[...Array(3)].map((_value: undefined, index: number) => (
              <PhotoCards key={index} items={items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ColumnCardData: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="pr-5">{children}</div>;
};

const TwoColumnCards: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="grid grid-cols-2 gap-6 two-column-cards">{children}</div>;
};

export {
  IconCards,
  Card,
  FlexCards,
  IntroCards,
  FieldCards,
  SettingsCards,
  SettingsCatalogGroup,
  SearchableCardCatalog,
  SearchableIssues,
  ReviewCards,
  FaqCards,
  GuideCards,
  GuideCatalogGroup,
  IntegrationCards,
  IntegrationCatalogGroup,
  SearchableIntegrationCatalog,
  OldIntegrationCards,
  AnswerCard,
  AnswerChecklist,
  TwoColumnCards,
  ColumnCardData,
};
