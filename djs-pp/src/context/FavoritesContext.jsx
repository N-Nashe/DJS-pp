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
    const [isLoaded, setIsLoaded] = useState(false);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('podcastFavorites');
        if (savedFavorites) {
            try {
                const parsedFavorites = JSON.parse(savedFavorites);
                // Ensure it's an array
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

    // Save favorites to localStorage whenever favorites change (but only after initial load)
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
