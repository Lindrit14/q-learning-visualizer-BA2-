const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  // adjust path to wherever your test.py lives
  const scriptPath = path.join(__dirname, '../../python/testfile.py');
  const py = spawn('python3', [scriptPath]);

  let stdout = '';
  let stderr = '';

  py.stdout.on('data', chunk => { stdout += chunk.toString(); });
  py.stderr.on('data', chunk => { stderr += chunk.toString(); });

  py.on('close', code => {
    if (code !== 0) {
      return res.status(500).json({ error: stderr.trim() });
    }
    try {
      const json = JSON.parse(stdout);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON from Python' });
    }
  });
});

module.exports = router;
