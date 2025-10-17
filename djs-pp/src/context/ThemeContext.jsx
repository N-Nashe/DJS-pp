import React, { createContext, useState, useEffect, useContext } from 'react';

// Create theme context which holds state of theme 
const ThemeContext = createContext();

// Custom hook to use theme context - makes it easy to access theme in any component
export const useThemeContext = () => {
    const themeContextValue = useContext(ThemeContext);
    if (!themeContextValue) {
        throw new Error("useThemeContext must be used within a <ThemeProvider> tag");
    }
    return themeContextValue;
};

// Theme provider component wraps around app providing theme state to all children 
export const ThemeProvider = ({ children }) => {
    
    // State to track if user prefers dark mode - starts with saved preference or defaults to light
    const [isUserPreferringDarkMode, setIsUserPreferringDarkMode] = useState(() => {
        const savedThemePreference = localStorage.getItem('userThemePreference');
        if (savedThemePreference !== null) {
            return JSON.parse(savedThemePreference); // Convert string back to boolean
        }
        return false; // Default to light mode if no saved preference
    });

    // UseEffect to save the theme preference and apply to document
    useEffect(() => {
        // Save the current theme preference to localStorage for persistence
        localStorage.setItem('userThemePreference', JSON.stringify(isUserPreferringDarkMode));

        // Apply theme to document by setting data attribute
        const currentThemeName = isUserPreferringDarkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentThemeName);
    }, [isUserPreferringDarkMode]);

    // Function to toggle between dark and light mode
    const toggleUserThemePreference = () => {
        setIsUserPreferringDarkMode(previousThemePreference => !previousThemePreference);
    }

    // Values accessible to all children components that use useThemeContext
    const themeContextValues = {
        isUserPreferringDarkMode,
        currentThemeName: isUserPreferringDarkMode ? 'dark' : 'light',
        toggleUserThemePreference,
    }

    return (
        <ThemeContext.Provider value={themeContextValues}>
            {children}
        </ThemeContext.Provider>
    );
};



