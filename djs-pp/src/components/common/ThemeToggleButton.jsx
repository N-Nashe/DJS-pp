import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggleButton = () => {
  const { isUserPreferringDarkMode, toggleUserThemePreference } =
    useThemeContext();

  const handleToggleClick = () => {
    toggleUserThemePreference();
  };

  return (
    <button
      onClick={handleToggleClick}
      className="theme-toggle-button"
      aria-label={`Switch to ${isUserPreferringDarkMode ? 'light' : 'dark'} mode`}
      title={`Currently ${isUserPreferringDarkMode ? 'dark' : 'light'} mode. Click to toggle`}
    >
      {isUserPreferringDarkMode ? '🌞' : '🌜'}
    </button>
  );
};

export default ThemeToggleButton;
