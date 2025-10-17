import React from 'react';
import { useFavoritesContext } from '../../../context/FavoritesContext';

const FavoriteButton = ({ podcast, size = 'medium', className = '' }) => {
  const { toggleFavorite, isFavorited } = useFavoritesContext();
  
  const favorited = isFavorited(podcast.id);
  
  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation if inside a link
    e.stopPropagation(); // Prevent event bubbling
    toggleFavorite(podcast);
  };

  // Size classes for different use cases
  const sizeClasses = {
    small: 'favorite-btn-small',
    medium: 'favorite-btn-medium', 
    large: 'favorite-btn-large'
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-button ${sizeClasses[size]} ${favorited ? 'favorited' : 'not-favorited'} ${className}`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorited ? '❤️' : '♡'}
    </button>
  );
};

export default FavoriteButton;