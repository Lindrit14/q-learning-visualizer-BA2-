import React, { useState, useEffect } from 'react';
import { fetchEpisodes } from '../api/episodes';
import MazePlayer from '../components/Maze/MazePlayer';

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    fetchEpisodes().then(setEpisodes);
  }, []);
  return episodes.length
    ? <MazePlayer episodes={episodes} />
    : <p>Loading episodes…</p>;
}
