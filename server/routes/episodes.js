const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const size = req.query.size || '10';
  const eps  = req.query.episodes || '200';
  const script = path.join(__dirname, '../../python/solve_maze_episodes.py');
  const py = spawn('python3', [script, size, eps]);

  let out = '', err = '';
  py.stdout.on('data', d => out += d);
  py.stderr.on('data', d => err += d);

  py.on('close', code => {
    if (code!==0) return res.status(500).json({ error: err });
    try {
      res.json(JSON.parse(out));
    } catch {
      res.status(500).json({ error:"invalid JSON" });
    }
  });
});

module.exports = router;
