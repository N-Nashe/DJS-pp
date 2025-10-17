/**
 * FavoritesContext.jsx
 * 
 * This file manages the global state for podcast favorites functionality.
 * It provides context for adding, removing, and persisting favorite podcasts
 * across the entire application using localStorage for data persistence.
 * 
 * Features:
 * - Add/remove podcasts from favorites
 * - Persist favorites in localStorage
 * - Validate data integrity
 * - Track loading state
 * - Provide favorites count
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the favorites context to share state across components
const FavoritesContext = createContext();

/**
 * Custom hook to access favorites context
 * 
 * This hook provides a clean way for components to access favorites
 * functionality without directly importing the context.
 * 
 * @returns {Object} Favorites context value with all methods and state
 * @throws {Error} If used outside of FavoritesProvider
 */
export const useFavoritesContext = () => {
    const favoritesContextValue = useContext(FavoritesContext);
    if (!favoritesContextValue) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return favoritesContextValue;
};

/**
 * FavoritesProvider Component
 * 
 * Provides favorites context to all child components. Manages the global
 * state for podcast favorites with localStorage persistence.
 * 
 * State Management:
 * - favorites: Array of favorite podcast objects
 * - isLoaded: Boolean indicating if data has been loaded from localStorage
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap with context
 */
export const FavoritesProvider = ({ children }) => {
    // Array to store all favorite podcasts
    const [favorites, setFavorites] = useState([]);
    
    // Flag to track if favorites have been loaded from localStorage
    // Prevents overwriting localStorage during initial mount
    const [isLoaded, setIsLoaded] = useState(false);

    /**
     * Load favorites from localStorage on component mount
     * 
     * This effect runs once when the component mounts and:
     * 1. Retrieves saved favorites from localStorage
     * 2. Validates the data is an array
     * 3. Handles corrupted data by clearing localStorage
     * 4. Sets isLoaded flag to true when complete
     */
    useEffect(() => {
        const savedFavorites = localStorage.getItem('podcastFavorites');
        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                // Ensure it's an array to prevent runtime errors
                if (Array.isArray(parsedFavorites)) {
                    setFavorites(parsedFavorites);
                } else {
                    console.warn('Invalid favorites data in localStorage, resetting');
                    setFavorites([]);
                    localStorage.removeItem('podcastFavorites');
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
                localStorage.removeItem('podcastFavorites');
            }
        }
        setIsLoaded(true);
    }, []);

    /**
     * Save favorites to localStorage whenever favorites change
     * 
     * This effect runs whenever the favorites array changes and:
     * 1. Only saves after initial load to prevent overwriting
     * 2. Persists the current favorites array to localStorage
     * 3. Ensures data persistence across browser sessions
     */
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('podcastFavorites', JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    // Add podcast to favorites
    const addFavorite = (podcast) => {
        if (!podcast || !podcast.id) {
            console.error('Invalid podcast data for adding to favorites');
            return;
        }
        
        setFavorites(prev => {
            // Check if already favorited
            if (prev.some(fav => fav.id === podcast.id)) {
                console.log('Podcast already in favorites:', podcast.title);
                return prev; // Already favorited, no change
            }
            
            const newFavorites = [...prev, podcast];
            console.log('Added to favorites:', podcast.title, 'Total favorites:', newFavorites.length);
            return newFavorites;
        });
    };

    // Remove podcast from favorites
    const removeFavorite = (podcastId) => {
        if (!podcastId) {
            console.error('Invalid podcast ID for removing from favorites');
            return;
        }
        
        setFavorites(prev => {
            const newFavorites = prev.filter(fav => fav.id !== podcastId);
            console.log('Removed from favorites, new count:', newFavorites.length);
            return newFavorites;
        });
    };

    // Toggle favorite status
    const toggleFavorite = (podcast) => {
        if (!podcast || !podcast.id) {
            console.error('Invalid podcast data for toggling favorites');
            return;
        }
        
        const isFavorited = favorites.some(fav => fav.id === podcast.id);
        if (isFavorited) {
            removeFavorite(podcast.id);
        } else {
            addFavorite(podcast);
        }
    };

    // Check if podcast is favorited
    const isFavorited = (podcastId) => {
        return favorites.some(fav => fav.id === podcastId);
    };

    // Clear all favorites
    const clearAllFavorites = () => {
        setFavorites([]);
        localStorage.removeItem('podcastFavorites');
        console.log('All favorites cleared');
    };

    const contextValue = {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorited,
        clearAllFavorites,
        favoritesCount: favorites.length,
        isLoaded
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};
