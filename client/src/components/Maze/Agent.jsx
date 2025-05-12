import React from 'react';

export default function Agent({ position }) {
  const { x, y } = position;

  return (
    <div
      className="absolute w-8 h-8 bg-blue-500 rounded-md transition-all duration-200"
      style={{
        top: `${y * 32}px`,
        left: `${x * 32}px`
      }}
    />
  );
}
