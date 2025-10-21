import React, { useState } from "react";
import Image from "@theme/IdealImage";
import { ThemedComponent } from "@docusaurus/theme-common";
import { Props as ThemedImageProps } from "@theme/ThemedImage";

const Photo = (props) => {
  const { scale, unscaled, ...otherProps } = props;

  const style = scale
    ? ({ "--scale": `${scale}%` } as React.CSSProperties)
    : {};

  if (unscaled) {
    return (
      <div className="photo-unscaled" style={{ marginBottom: "1rem" }}>
        <Image {...props} />
      </div>
    );
  }

  return (
    <div className={`photo ${scale ? "photo--scaled" : ""}`} style={style}>
      <Image {...otherProps} />
    </div>
  );
};

const HoverPhotoChange = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [normalChild, hoverChild] = React.Children.toArray(children);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {isHovered ? hoverChild : normalChild}
    </div>
  );
};

export default HoverPhotoChange;

const ThemedIdealImage = (props: ThemedImageProps): JSX.Element => {
  const { sources, className: parentClassName, alt, ...propsRest } = props;
  return (
    <ThemedComponent className={parentClassName}>
      {({ theme, className }) => (
        <Image
          img={sources[theme]}
          alt={alt}
          className={className}
          {...propsRest}
        />
      )}
    </ThemedComponent>
  );
};

const BrowserMockupWithPhoto = ({ src, alt }) => {
  return (
    <div className="flex flex-col mt-6">
      <div className="w-full h-11 rounded-t-lg bg-gray-200 dark:bg-gray-700 flex justify-start items-center space-x-1.5 px-3">
        <span className="w-3 h-3 rounded-full bg-red-400"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-400"></span>
      </div>
      <Image
        className="w-full m-0 overflow-hidden ideal-browser-mock"
        alt={alt}
        img={src}
      />
    </div>
  );
};

export { BrowserMockupWithPhoto, ThemedIdealImage, Photo, HoverPhotoChange };
