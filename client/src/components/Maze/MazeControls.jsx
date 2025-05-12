// components/Maze/MazeControls.jsx
import React from 'react';

export default function MazeControls({
  onStart,
  onReset,
  strategy,
  setStrategy,
  mazeSize,
  setMazeSize
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center">
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onStart}>Start</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onReset}>Reset</button>

      <select className="px-3 py-2 border rounded" value={strategy} onChange={e => setStrategy(e.target.value)}>
        <option value="epsilon_greedy">Epsilon-Greedy</option>
        <option value="decay_epsilon">Decay Epsilon</option>
        <option value="softmax">Softmax</option>
      </select>

      <input
        type="number"
        min={5}
        max={25}
        value={mazeSize}
        onChange={e => setMazeSize(parseInt(e.target.value))}
        className="w-24 px-2 py-1 border rounded text-center"
        placeholder="Size"
      />
    </div>
  );
}
