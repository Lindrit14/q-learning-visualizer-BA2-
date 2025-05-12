// server/routes/data.js
const express = require('express');
const router = express.Router();

// Dummy JSON data
const dummyData = {
  message: "Hello from the server!",
  items: [1, 2, 3, 4, 5]
};

// GET /api/data
router.get('/', (req, res) => {
  res.json(dummyData);
});

module.exports = router;
