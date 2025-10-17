import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import AudioControls from './components/common/podcast/audio/AudioControls';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails';
import './general styles/styles.css';
import './general styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
        <AudioControls />
      </div>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
