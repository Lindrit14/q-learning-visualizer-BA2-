// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
//import About from './pages/About'; // optional second page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/*<Route path="/about" element={<About />} />*/}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
