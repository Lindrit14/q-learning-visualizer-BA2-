import React, { useState, useEffect, useRef } from 'react';
import MazeGrid from './MazeGrid';

export default function MazePlayer({ maze, episodes, initialSpeed=300 }) {
  const [epIdx, setEpIdx]     = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [speed, setSpeed]     = useState(initialSpeed);
  const timer = useRef();

  useEffect(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setStepIdx(si => {
        const next = si+1;
        if (next >= episodes[epIdx].length) {
          // move to next episode
          const ne = epIdx+1;
          if (ne < episodes.length) {
            setEpIdx(ne);
            return 0;
          } else {
            clearInterval(timer.current);
            return si;
          }
        }
        return next;
      });
    }, speed);
    return () => clearInterval(timer.current);
  }, [epIdx, episodes, speed]);

  if (!episodes.length) return <p>Loading…</p>;

  const agentPos = episodes[epIdx][stepIdx];
  const fullPath  = episodes[epIdx];
    const partial   = fullPath.slice(0, stepIdx + 1);

  return (
    <div className="space-y-4">
      <MazeGrid mazeData={maze} agentPosition={{ x:agentPos[0], y:agentPos[1] }} path={partial}  />
      <div className="flex items-center justify-center gap-4">
        <span>Episode {epIdx+1}/{episodes.length}</span>
        <span>Step {stepIdx+1}/{episodes[epIdx].length}</span>
        <label className="flex items-center gap-2">
          Speed(ms):
          <input
            type="range" min="50" max="1000" value={speed}
            onChange={e=>setSpeed(+e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
