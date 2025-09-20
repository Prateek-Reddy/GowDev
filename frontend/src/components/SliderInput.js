// src/components/SliderInput.js
import React from 'react';

const SliderInput = ({ label, min, max, value, onChange, step = 1 }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}: {value}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default SliderInput;
