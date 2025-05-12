// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { getMaze } from '../api/maze';
import MazeGrid from '../components/Maze/MazeGrid';
import MazeControls from '../components/Maze/MazeControls';

export default function Home() {
  const [mazeData, setMazeData] = useState([]);
  const [agentPosition, setAgentPosition] = useState({ x: 0, y: 0 });
  const [goalPosition, setGoalPosition] = useState({ x: 0, y: 0 });
  const [strategy, setStrategy] = useState('epsilon_greedy');
  const [mazeSize, setMazeSize] = useState(10);

  const fetchMaze = async (size) => {
    try {
      const data = await getMaze(size);
      setMazeData(data.maze);
      setAgentPosition(data.start);
      setGoalPosition(data.goal);
    } catch (err) {
      console.error('Maze fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchMaze(mazeSize);
  }, [mazeSize]);

  const handleReset = () => {
    fetchMaze(mazeSize);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Dynamic Q-Learning Maze</h1>
      <MazeGrid mazeData={mazeData} agentPosition={agentPosition} />
      <MazeControls
        onStart={() => console.log("Start clicked with", strategy)}
        onReset={handleReset}
        strategy={strategy}
        setStrategy={setStrategy}
        mazeSize={mazeSize}
        setMazeSize={setMazeSize}
      />
    </div>
  );
}
