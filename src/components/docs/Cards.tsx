import { useId } from 'react';
import Link from '@docusaurus/Link';
import Image from '@theme/IdealImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { SimpleTextLink, Badge } from '@site/src/components/utils';

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

interface FieldProps {
  link: string;
  title: string;
  titleBadge?: string;
  popular?: string;
  description: string;
  icon?: string;
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
}

interface IntegrationCardsProps {
  items: IntegrationProps[];
  layout?: string;
}

interface CardSectionProps {
  items: CardProps[];
  promo?: boolean;
  layout?: string;
}

interface FieldCardsProps {
  items: FieldProps[];
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

const Card: React.FC<CardProps> = ({
  fullCardLink,
  linkWithDescription,
  linkWithDescriptionLabel,
  title,
  titleBadge,
  description,
  icon,
}) => {
  const iconSrc = icon && useBaseUrl(`/icons/cards/${icon}.svg`);

  if (fullCardLink) {
    return (
      <Link
        to={fullCardLink}
        className="group flex flex-row gap-3 border rounded-lg p-3 m-1 2xl:max-w-full transition-all duration-500 dark:text-white bg-[rgba(0,127,230,0.2)] dark:bg-[rgba(0,105,190,0.25)] hover:bg-[#87c9ff] hover:dark:bg-[#0069be] hover:m-0 hover:p-4"
      >
        {iconSrc && (
          <div className="flex justify-center">
            <img
              className="min-w-10 max-w-full !max-h-[50px] opacity-70	duration-500 transition-all filter-icons"
              src={iconSrc}
              alt={title || 'Freeform'}
            />
          </div>
        )}

        <div
          className={`pl-1 flex flex-col ${!description && 'justify-center'}`}
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
            <p className="text-sm text-gray-700 mb-1 dark:text-gray-300 transition-all duration-500 dark:group-hover:text-gray-50 ">
              {description}
            </p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="group flex flex-row gap-3 border rounded-lg py-2 px-3 max-w-fit transition-all duration-500 dark:text-white">
      {iconSrc && (
        <div className="flex justify-center">
          <img
            className="min-w-10 max-w-full !max-h-[50px] opacity-70	duration-500 transition-all filter-icons"
            src={iconSrc}
            alt={title || 'Freeform'}
          />
        </div>
      )}
      <div className="pl-2">
        <h3 className="text-lg font-semibold mb-0 text-black dark:text-white">
          {title}
          {titleBadge &&<Badge type="feature" text={titleBadge} />}
        </h3>
        <p className="text-gray-700 mb-1 dark:text-gray-300 leading-6">
          {description}{' '}
          {linkWithDescription && (
            <SimpleTextLink
              to={linkWithDescription}
              label={
                linkWithDescriptionLabel
                  ? linkWithDescriptionLabel
                  : 'Learn more'
              }
            />
          )}
        </p>
      </div>
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
          <p className="text-sm text-gray-700 mb-1 dark:text-gray-300 transition-all duration-500 dark:group-hover:text-gray-50 ">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};

const FlexCards: React.FC<CardSectionProps> = ({ items, promo }) => {
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

  return (
    <div className="menu-grid">
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
        />
      ))}
    </div>
  );
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
      <dd className="ml-0">
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

const bgColors = [
  'bg-sky-400/25',
  'bg-blue-400/25',
  'bg-indigo-400/25',
  'bg-purple-400/25',
  'bg-pink-400/25',
  'bg-red-400/25',
  'bg-orange-400/25',
  'bg-yellow-400/25',
  'bg-green-400/25',
  'bg-emerald-400/25',
  'bg-teal-400/25',
  'bg-cyan-400/25',
  'bg-sky-500/25',
  'bg-blue-500/25',
  'bg-indigo-500/25',
  'bg-purple-500/25',
  'bg-pink-500/25',
  'bg-red-500/25',
  'bg-orange-500/25',
  'bg-yellow-500/25',
  'bg-green-500/25',
  'bg-emerald-500/25',
  'bg-teal-500/25',
  'bg-cyan-500/25',
];

const getRandomColor = () => bgColors[Math.floor(Math.random() * bgColors.length)];

const FieldCards: React.FC<FieldCardsProps> = ({ items }) => {
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
              <span className={`inline-flex rounded-lg ${getRandomColor()} p-3 items-center justify-center`}>
                <img
                  src={useBaseUrl(`/icons/cards/${item.icon}.svg`)} alt={item.title}
                  className="w-5 h-auto opacity-100 duration-500 transition-all filter-icons"
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

const IntegrationCards: React.FC<IntegrationCardsProps> = ({ items, layout }) => {

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

const GuideCards: React.FC<GuideCardsProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
      {items.map((item, index) => (
        <Link
          key={`guide-cards-${index}`}
          to={item.link}
          className="relative flex flex-col rounded-lg p-4 m-1 hover:m-0 hover:p-5 transition-all duration-500 bg-[rgba(0,127,230,0.2)] dark:bg-[rgba(0,105,190,0.25)] hover:bg-[#87c9ff] hover:dark:bg-[#0069be]"
        >
          <h4 className="!text-[1.1rem] font-bold text-black dark:text-white !mt-0 !pt-0 !mb-2">
            {item.title}{' '}
            {item.popular && (
              <Badge type="recommended" text="Popular!" />
            )}
          </h4>
          <p className="text-[0.8rem] text-black/80 dark:text-white/80 mb-0">
            {item.description}
          </p>
        </Link>
      ))}
    </div>
  );
};

const ReviewCards: React.FC<GuideCardsProps> = ({ items }) => {
  return (
    <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen mt-20 flow-root">
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
  ReviewCards,
  FaqCards,
  GuideCards,
  IntegrationCards,
  OldIntegrationCards,
  AnswerCard,
  AnswerChecklist,
  TwoColumnCards,
  ColumnCardData,
};
