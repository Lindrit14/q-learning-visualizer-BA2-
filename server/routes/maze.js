const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const size = parseInt(req.query.size || '10');
  const scriptPath = path.join(__dirname, '../../python/generate_maze.py');

  const py = spawn('python3', [scriptPath, size]);

  let output = '';
  let error = '';

  py.stdout.on('data', (data) => (output += data.toString()));
  py.stderr.on('data', (data) => (error += data.toString()));

  py.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: error.trim() || 'Python error' });
    }
    try {
      const maze = JSON.parse(output);
      res.json({
        maze,
        start: { x: 0, y: 0 },
        goal: { x: size - 1, y: size - 1 },
        size
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse Python output' });
    }
  });
});

module.exports = router;
