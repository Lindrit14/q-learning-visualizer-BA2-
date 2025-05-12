import React, { useEffect, useState } from 'react';
import { getEpisodes } from '../api/episodes';
import MazePlayer from '../components/Maze/MazePlayer';

export default function EpisodesPage() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    getEpisodes(10, 100).then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading maze & episodes…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Q-Learning Episodes</h1>
      <MazePlayer maze={data.maze} episodes={data.episodes} />
    </div>
  );
}
