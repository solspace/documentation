import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

export const ColorPicker = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.rgb);
  };

  return (
    <div className="relative">
      <div
        className="p-1 bg-white shadow-md inline-block cursor-pointer"
        onClick={handleClick}
      >
        <div
          className="w-10 h-4"
          style={{
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
          }}
        />
      </div>
      {displayColorPicker && (
        <div className="absolute z-10">
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={handleClose}
          />
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};
