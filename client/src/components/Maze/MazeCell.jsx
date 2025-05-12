import React from 'react';

export default function MazeCell({ type, visited = false, hasAgent = false }) {
  // base cell
  let classes = "w-8 h-8 border border-gray-300 ";

  // wall or empty
  classes += type === 'wall'
    ? "bg-gray-800"
    : "bg-white";

  // visited path highlight
  if (visited && type !== 'wall') {
    classes += " bg-blue-200";
  }

  // show agent dot inside
  return (
    <div className={classes + (hasAgent ? " relative" : "")}>
      {hasAgent && (
        <div className="absolute inset-1 bg-blue-600 rounded-full"></div>
      )}
    </div>
  );
}
