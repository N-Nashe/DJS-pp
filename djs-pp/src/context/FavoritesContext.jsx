import React, { createContext, useContext, useState, useEffect } from 'react';

// Favorites context
const FavoritesContext = createContext();

// Custom hook to use favorites context
export const useFavoritesContext = () => {
    const favoritesContextValue = useContext(FavoritesContext);
    if (!favoritesContextValue) {
        throw new Error('useFavoritesContext must be used within a FavoritesProvider');
    }
    return favoritesContextValue;
};

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('podcastFavorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
            }
        }
    }, []);

    // Save favorites to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('podcastFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Add podcast to favorites
    const addFavorite = (podcast) => {
        setFavorites(prev => {
            // Check if already favorited
            if (prev.some(fav => fav.id === podcast.id)) {
                return prev; // Already favorited, no change
            }
            return [...prev, podcast];
        });
    };

    // Remove podcast from favorites
    const removeFavorite = (podcastId) => {
        setFavorites(prev => prev.filter(fav => fav.id !== podcastId));
    };

    // Toggle favorite status
    const toggleFavorite = (podcast) => {
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

    const contextValue = {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorited,
        favoritesCount: favorites.length
    };

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};
