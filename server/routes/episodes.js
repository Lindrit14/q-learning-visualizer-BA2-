const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.get('/', (req, res) => {
  const py = spawn('python3', [__dirname + '/../../python/solve_maze_episodes.py']);
  let out = '', err = '';
  py.stdout.on('data', d => out += d);
  py.stderr.on('data', d => err += d);
  py.on('close', code => {
    if (code) return res.status(500).json({error:err});
    const { episodes } = JSON.parse(out);
    res.json({ episodes });
  });
});

module.exports = router;
