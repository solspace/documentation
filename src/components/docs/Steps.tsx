import React, { useState, useEffect, useRef } from 'react';

interface StepMarkdownProps {
  stepTitle?: string;
  stepNumber?: number;
  children?: React.ReactNode;
}

const StepMarkdown: React.FC<StepMarkdownProps> = ({
  children,
  stepNumber,
  stepTitle,
}) => {
  const [isDone, setIsDone] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // const handleClick = () => {
  //   setIsDone((prevIsDone) => !prevIsDone);
  // };

  // useEffect(() => {
  //   const contentElement = contentRef.current;

  //   if (!stepTitle && contentElement) {
  //     const h3Element = contentElement.querySelector('h3');

  //     if (h3Element) {
  //       h3Element.classList.add('text-[#ff6624]', 'cursor-pointer');
  //       h3Element.addEventListener('click', handleClick);

  //       return () => {
  //         h3Element.removeEventListener('click', handleClick);
  //       };
  //     } else {
  //       contentElement.classList.add('cursor-pointer');
  //       contentElement.addEventListener('click', handleClick);

  //       return () => {
  //         contentElement.removeEventListener('click', handleClick);
  //       };
  //     }
  //   }
  // }, [stepTitle]);

  return (
    <div className={`relative mb-4 step ${isDone ? 'step-active' : ''}`}>
      {stepNumber && (
        <div className="absolute h-full">
          <div className="flex flex-col items-center mr-6 step-number-wrapper h-full">
            <div className="flex w-8 p-1.5 items-center justify-center text-sm font-bold border rounded-lg bg-[#ff6624] text-white dark:text-black step-number">
              {stepNumber}
            </div>
          </div>
        </div>
      )}
      <div
        className="flex flex-col mt-1 max-w-[1045px] step-content"
        ref={contentRef}
      >
        <div className="ml-12">
          {stepTitle && (
            <h3
              className="text-[#ff6624] ml-12"
            >
              {stepTitle}
            </h3>
          )}
          {!stepTitle && !children && (
            <div className="cursor-pointer">
              Click here to toggle
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

const VerticalStepWrapper = ({ children }: { children: React.ReactNode }) => {
  let stepNumber = 1;

  const childrenWithStepNumbers = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === StepMarkdown) {
      const stepWithNumber = React.cloneElement(child, {
        stepNumber,
      } as unknown as Partial<StepMarkdownProps>);

      stepNumber++;
      return stepWithNumber;
    }

    return child;
  });

  return (
    <div className="flex flex-col steps-wrapper">
      {childrenWithStepNumbers}
    </div>
  );
};

export { VerticalStepWrapper, StepMarkdown };
