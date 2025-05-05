import React, { ReactElement, isValidElement } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Player from 'react-player';
import { IntroCards } from '@site/src/components/docs';

interface IntroSectionProps {
  iconSrc?: string;
  imgSrc?: string;
  imgAlt?: string;
  mediaPosition?: 'left' | 'right' | 'top';
  title: string;
  anchor?: string;
  description?: string;
  children?: React.ReactNode;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  iconSrc,
  imgSrc,
  imgAlt,
  mediaPosition,
  title,
  anchor,
  description,
  children,
}) => {
  // Support for three children passed as an array
  let video: React.ReactNode = null;
  let introcards: React.ReactNode = null;
  let extracards: React.ReactNode = null;

  // Normalize and classify children
  const childrenArray = React.Children.toArray(children);

  childrenArray.forEach(child => {
    if (isValidElement(child)) {
      if (child.type === Player) {
        video = child;
      } else if (child.type === IntroCards) {
        introcards = child;
      } else {
        extracards = child;
      }
    }
  });

  if (mediaPosition === 'left' || mediaPosition === 'right') {
    return (
      <section className={`intro-section overflow-hidden bg-gradient-to-tr from-[#64a3f1]/5 to-[#c3dff8]/5 py-10 my-10 px-8 ${mediaPosition === 'left' ? 'lg:pr-16' : 'lg:pl-16'} rounded-3xl`} id={anchor}>
        <div className="mx-auto px-0">
          <div className="mx-auto flex flex-col lg:flex-row max-w-2xl gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
            <div className={`lg:w-2/5 flex-1 ${mediaPosition === 'left' ? 'lg:ml-auto lg:pt-4 lg:pl-4' : 'lg:pt-4 lg:pr-8'}`}>
              <div>
                {iconSrc && (
                  <div className="max-w-20">
                    <img
                      className="min-w-20 filter-icons"
                      src={useBaseUrl(`/icons/cards/${iconSrc}.svg`)}
                      alt={title}
                    />
                  </div>
                )}
                <h2 className="mt-2 text-4xl lg:text-5xl font-semibold text-pretty text-black dark:text-white">
                  {title}
                </h2>
                <p className="mt-6 text-base md:text-lg/7 text-gray-700 dark:text-gray-300">
                  {description}
                </p>
                {introcards}
              </div>
            </div>
            {imgSrc && (
              <div className={`lg:w-3/5 ${mediaPosition === 'left' ? 'flex items-start justify-end lg:order-first' : ''}`}>
                <img
                  src={useBaseUrl(`/img/${imgSrc}`)} alt={imgAlt}
                  className={`w-full max-w-none rounded-xl shadow-xl ring-1 ring-black/10 dark:ring-white/10 sm:w-[70rem] ${mediaPosition === 'left' ? 'md:-mr-4 lg:-mr-0' : 'md:-ml-4 lg:-ml-0'}`}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (mediaPosition === 'top') {
    return (
      <section className="intro-section py-10 md:py-20" id={anchor}>
        <div className="mx-auto px-6">
          <div className="mx-auto max-w-2xl text-center">
            {iconSrc && (
              <div className="mx-auto max-w-20 mb-3">
                <img
                  className="mx-auto min-w-20 filter-icons"
                  src={useBaseUrl(`/icons/cards/${iconSrc}.svg`)}
                  alt={title}
                />
              </div>
            )}
            <h2 className="mt-2 text-4xl lg:text-5xl font-semibold text-pretty text-black dark:text-white">{title}</h2>
            <p className="mt-6 text-base md:text-lg/8 text-gray-700 dark:text-gray-300">{description}</p>
          </div>
          {video && (
            <div className="relative overflow-hidden pt-5 md:pt-10">
              <div className="mx-auto px-0">
                <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                  {video}
                </div>
                <div className="relative" aria-hidden="true">
                  <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white dark:from-[#0c1016] pt-[10%]"></div>
                </div>
              </div>
            </div>
          )}
          {imgSrc && (
            <div className="relative overflow-hidden pt-5 md:pt-10">
              <div className="mx-auto px-0">
                <div className="mx-auto w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                  <img
                    src={useBaseUrl(`/img/${imgSrc}`)} alt={imgAlt}
                    className="rounded-xl w-full"
                  />
                </div>
                <div className="relative" aria-hidden="true">
                  <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white dark:from-[#0c1016] pt-[10%]"></div>
                </div>
              </div>
            </div>
          )}
          {introcards && (
          <div className="mx-auto mt-10 px-0 xl:px-10">
            {introcards}
          </div>
          )}
          {extracards && (
            <div className="mx-auto mt-10 px-0 xl:px-10">
              {extracards}
            </div>
          )}
        </div>
      </section>
    );
  }
};

export { IntroSection };