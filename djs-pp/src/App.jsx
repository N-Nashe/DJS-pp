import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails';
import './general styles/styles.css';
import './general styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
