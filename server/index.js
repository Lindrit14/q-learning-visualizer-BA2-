const express = require('express');
const cors = require('cors');
const path = require('path');
const dataRouter = require('./routes/data');
const pythonRouter = require('./routes/python');
const mazeRouter = require('./routes/maze');
const episodesRouter = require('./routes/episodes');



const app = express();
const PORT = 4000;  

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    


app.use('/api/data', dataRouter);
app.use('/api/python', pythonRouter);
app.use('/api/maze', mazeRouter);
app.use('/api/episodes', require('./routes/episodes'));


// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});