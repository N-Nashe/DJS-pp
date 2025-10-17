import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import { FavoritesProvider } from './context/FavoritesContext';
import AudioControls from './components/common/podcast/audio/AudioControls';
import Home from './pages/Home';
import ShowDetails from './pages/ShowDetails';
import Favorites from './pages/Favorites';
import './general styles/styles.css';
import './general styles/theme.css';

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AudioProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <AudioControls />
        </div>
        </AudioProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
