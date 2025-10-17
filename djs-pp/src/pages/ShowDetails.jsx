import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPodcastDetailsById } from '../services/api';
import { getGenreNamesFromArray } from '../utils/genreHelpers';
import { getUniqueSeasons } from '../utils/podcastHelpers';
import '../ShowDetails.css';

function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State declarations for detailed podcast data
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);

  // Fetch detailed podcast data based on ID
  useEffect(() => {
    const loadPodcastDetails = async () => {
      try {
        const data = await fetchPodcastDetailsById(id);
        setPodcast(data);
        setSelectedSeason(1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadPodcastDetails();
  }, [id]);

  if (loading) return <div className="loading">Loading podcast details...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!podcast) return <div className="error-message">Podcast not found</div>;

  const uniqueSeasons = getUniqueSeasons(podcast);

  return (
    <div className="show-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Podcasts
      </button>

      <div className="show-header">
        <img src={podcast.image} alt={podcast.title} className="show-image" />
        <div className="show-info">
          <h1>{podcast.title}</h1>
          <p className="show-description">{podcast.description}</p>

          <div className="genres-container">
            <strong>Genres:</strong>
            <div className="genre-pills">
              {getGenreNamesFromArray(podcast.genres)
                .split(', ')
                .map((genre, index) => (
                  <span key={index} className="genre-pill">
                    {genre}
                  </span>
                ))}
            </div>
          </div>

          <div className="show-metadata">
            <div className="metadata-item">
              <strong>Total Seasons:</strong> {uniqueSeasons.length}
            </div>
            <div className="metadata-item">
              <strong>Total Episodes:</strong>{' '}
              {uniqueSeasons.reduce(
                (total, season) => total + season.episodes.length,
                0,
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="season-selector">
        <h2>Current Season</h2>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          className="season-dropdown"
        >
          {uniqueSeasons.map((season) => (
            <option key={season.season} value={season.season}>
              Season {season.season}
            </option>
          ))}
        </select>
      </div>

      <div className="episodes-section">
        {uniqueSeasons
          .filter((season) => season.season === selectedSeason)
          .map((season) => (
            <div key={season.season}>
              <h3>
                Season {season.season}: {season.title}
              </h3>
              <p>{season.episodes.length} Episodes</p>

              <div className="episodes-list">
                {season.episodes.map((episode) => (
                  <div key={episode.episode} className="episode-card">
                    <div className="episode-number">
                      {episode.episode || '?'}
                    </div>
                    <div className="episode-content">
                      <h4>{episode.title || 'Episode Title Not Available'}</h4>
                      <p className="episode-description">
                        {episode.description
                          ? episode.description
                          : 'No description available for this episode.'}
                      </p>
                      {episode.file && (
                        <div className="episode-meta">
                          <span className="episode-available">
                            Available to play
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShowDetails;
