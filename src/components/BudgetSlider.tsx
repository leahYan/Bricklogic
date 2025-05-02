'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactSlider from 'react-slider';

interface BudgetSliderProps {
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

const BudgetSlider: React.FC<BudgetSliderProps> = ({
  minValue = 100000,
  maxValue = 1000000,
  initialValue = 500000,
  onValueChange
}) => {
  const [value, setValue] = useState<number>(initialValue);

  // Format currency
  const formatCurrency = (value: number): string => {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  // Handle value change
  const handleChange = (newValue: number) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  // Update value when initialValue changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-input-text">{formatCurrency(minValue)}</span>
        <span className="text-lg font-bold text-accent">{formatCurrency(value)}</span>
        <span className="text-sm text-input-text">{formatCurrency(maxValue)}</span>
      </div>
      
      <ReactSlider
        className="h-2 bg-progress-track rounded-full mt-4"
        thumbClassName="w-6 h-6 bg-accent border-2 border-black rounded-full -mt-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-dark"
        trackClassName="h-2 bg-progress-track rounded-full"
        value={value}
        min={minValue}
        max={maxValue}
        onChange={handleChange}
        step={1000} // Round to nearest thousand
        renderTrack={(props, state) => {
          // Render filled track for the active portion
          return state.index === 0 ? (
            <div
              {...props}
              className="h-2 bg-progress-fill rounded-full"
              style={{
                ...props.style,
                width: `${(value - minValue) / (maxValue - minValue) * 100}%`
              }}
            />
          ) : (
            <div {...props} />
          );
        }}
      />
      
      <div className="mt-4">
        <p className="text-sm text-input-text">Drag the slider to adjust your budget</p>
      </div>
    </div>
  );
};

export default BudgetSlider;