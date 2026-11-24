import React from 'react';

interface StepMarkdownProps {
  stepTitle?: string;
  stepNumber?: number;
  children?: React.ReactNode;
}

const StepMarkdown: React.FC<StepMarkdownProps> = ({
  children,
  stepNumber,
  stepTitle,
}) => (
  <div className="step">
    {stepNumber ? <span className="step-number">{stepNumber}</span> : null}
    <div className="step-content">
      {stepTitle && <h3>{stepTitle}</h3>}
      {children}
    </div>
  </div>
);

const VerticalStepWrapper = ({ children }: { children: React.ReactNode }) => {
  let stepNumber = 1;

  const numberedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<StepMarkdownProps>(child) && child.type === StepMarkdown) {
      return React.cloneElement(child, { stepNumber: stepNumber++ });
    }

    return child;
  });

  return <div className="steps-wrapper">{numberedChildren}</div>;
};

export { VerticalStepWrapper, StepMarkdown };
