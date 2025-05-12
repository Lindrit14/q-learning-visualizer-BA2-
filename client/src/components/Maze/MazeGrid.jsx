import React from 'react';
import MazeCell from './MazeCell';
import Agent   from './Agent';

export default function MazeGrid({ mazeData, agentPosition, path = [] }) {
  if (!mazeData?.length) return <p>Loading…</p>;

  // turn path into a lookup set of "x,y" strings
  const visited = new Set(path.map(([x,y]) => `${x},${y}`));

  return (
    <div
      className="relative grid mx-auto"
      style={{ gridTemplateColumns: `repeat(${mazeData[0].length}, 32px)` }}
    >
      {mazeData.map((row, y) =>
        row.map((cell, x) => {
          const isVisited = visited.has(`${x},${y}`);
          const isAgentHere = agentPosition.x === x && agentPosition.y === y;
          return (
            <MazeCell
              key={`${x}-${y}`}
              type={cell === 1 ? 'wall' : 'empty'}
              visited={isVisited}
              hasAgent={isAgentHere}
            />
          );
        })
      )}
      {/* optional: keep your Agent component if you want the blue square */}
      <Agent position={agentPosition} />
    </div>
  );
}
