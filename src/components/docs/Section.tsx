import useBaseUrl from '@docusaurus/useBaseUrl';

interface SectionProps {
  imgSrc?: string;
  title: string;
  subtitle: string;
  description?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  imgSrc,
  title,
  subtitle,
  description,
  children,
}) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 w-full xl:w-3/4">
          {imgSrc && (
            <div className="max-w-24">
              <img
                className="min-w-20 filter-icons"
                src={useBaseUrl(`/card-icons/${imgSrc}.svg`)}
                alt={title}
              />
            </div>
          )}
          <h2 className="text-6xl font-normal text-[#ff6624] mb-2" id="title">
            {title}
          </h2>
          <h3 className="text-2xl text-center font-normal dark:text-gray-300 mb-4">
            {subtitle}
          </h3>
          {description && (
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
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
