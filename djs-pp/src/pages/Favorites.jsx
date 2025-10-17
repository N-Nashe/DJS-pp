import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavoritesContext } from '../context/FavoritesContext';
import FavoriteButton from '../components/common/podcast/FavoriteButton';
import { formatDate } from '../utils/dateFormatters';
import { getGenreNames } from '../utils/genreHelpers';
import '../general styles/styles.css';
import '../css-components/favorites.css';

function Favorites() {
  const navigate = useNavigate();
  const { favorites, favoritesCount } = useFavoritesContext();

  const handleCardClick = (podcast) => {
    navigate(`/show/${podcast.id}`);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
        <h1>My Favorites</h1>
        <p className="favorites-count">
          {favoritesCount === 0 
            ? 'No favorites yet' 
            : `${favoritesCount} favorite${favoritesCount === 1 ? '' : 's'}`
          }
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-favorites-content">
            <h2>No Favorites Yet</h2>
            <p>Start adding your favorite podcasts to see them here!</p>
            <button 
              onClick={() => navigate('/')} 
              className="browse-podcasts-btn"
            >
              Browse Podcasts
            </button>
          </div>
        </div>
      ) : (
        <div className="grid">
          {favorites.map((podcast) => (
            <div
              key={podcast.id}
              className="card"
              onClick={() => handleCardClick(podcast)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image-container">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="card-image"
                />
                <div className="favorite-button-overlay">
                  <FavoriteButton podcast={podcast} size="medium" />
                </div>
              </div>
              <div className="card-content">
                <h2 className="card-title">{podcast.title}</h2>
                <p className="card-seasons">
                  {podcast.seasons} Season{podcast.seasons !== 1 ? 's' : ''}
                </p>
                <p className="card-genres">{getGenreNames(podcast.genres)}</p>
                <p className="card-date">
                  Updated: {formatDate(podcast.updated)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default Favorites;
