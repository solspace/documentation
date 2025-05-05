import useBaseUrl from '@docusaurus/useBaseUrl';

interface SectionProps {
  imgSrc?: string;
  title: string;
  anchor?: string;
  subtitle: string;
  description?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  imgSrc,
  title,
  anchor,
  subtitle,
  description,
  children,
}) => {
  return (
    <section className="flex flex-col my-28" id={anchor}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 w-full xl:w-3/4">
          {imgSrc && (
            <div className="max-w-24">
              <img
                className="min-w-20 filter-icons"
                src={useBaseUrl(`/icons/cards/${imgSrc}.svg`)}
                alt={title}
              />
            </div>
          )}
          <h2 className="text-4xl md:text-6xl font-normal text-center text-[#ff6624] mb-1 md:mb-2 section-title">
            {title}
          </h2>
          <h3 className="text-1xl md:text-2xl text-center font-normal dark:text-gray-300 mb-1 md:mb-2">
            {subtitle}
          </h3>
          {description && (
            <p className="text-sm md:text-base text-center text-gray-600 dark:text-gray-400 mb-6">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </section>
  );
};

export { Section };
