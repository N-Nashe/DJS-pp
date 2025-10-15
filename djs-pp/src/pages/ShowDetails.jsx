import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { genres } from '../data.js'
import '../ShowDetails.css'

function ShowDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // State declarations for detailed podcast data
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSeason, setSelectedSeason] = useState(1)

  // Fetch detailed podcast data based on ID
  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
        if (!response.ok) {
          throw new Error('Failed to load podcast details')
        }
        const data = await response.json()
        setPodcast(data)
        setSelectedSeason(1)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPodcastDetails()
  }, [id])

  // Handle genre names
  const getGenreNames = (genreArray) => {
    if (!genreArray || !Array.isArray(genreArray)) {
      return 'No genres available'
    }
    
    const actualGenres = genreArray.filter(genre => 
      genre && 
      genre !== 'All' && 
      genre !== 'Featured' &&
      genre !== 'ALL' &&
      genre !== 'FEATURED'
    )
    
    return actualGenres.length > 0 ? actualGenres.join(', ') : 'No specific genres'
  }

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getUniqueSeasons = () => {
    if (!podcast?.seasons) return []
    const seen = new Set()
    return podcast.seasons.filter(season => {
      if (seen.has(season.season)) return false
      seen.add(season.season)
      return true
    })
  }

  if (loading) return <div className="loading">Loading podcast details...</div>
  if (error) return <div className="error-message">Error: {error}</div>
  if (!podcast) return <div className="error-message">Podcast not found</div>

  const uniqueSeasons = getUniqueSeasons()

  return (
    <div className="show-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Podcasts
      </button>

      <div className="show-header">
        <img 
          src={podcast.image} 
          alt={podcast.title} 
          className="show-image" 
        />
        <div className="show-info">
          <h1>{podcast.title}</h1>  
          <p className="show-description">{podcast.description}</p>
          
          <div className="genres-container">
            <strong>Genres:</strong>
            <div className="genre-pills">
              {getGenreNames(podcast.genres).split(', ').map((genre, index) => (
                <span key={index} className="genre-pill">{genre}</span>
              ))}
            </div>
          </div>
          
          <div className="show-metadata">
            <div className="metadata-item">
              <strong>Total Seasons:</strong> {uniqueSeasons.length}
            </div>
            <div className="metadata-item">
              <strong>Total Episodes:</strong> {uniqueSeasons.reduce((total, season) => 
                total + season.episodes.length, 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="season-selector">
        <h2>Current Season</h2>
        <select
          value={selectedSeason}
          onChange={(e)=> setSelectedSeason(Number(e.target.value))}
          className="season-dropdown">
          {uniqueSeasons.map((season) => (
            <option key={season.season} value={season.season}>
              Season {season.season}
            </option>
          ))}
        </select>
      </div>

      <div className="episodes-section">
        {uniqueSeasons
          .filter(season => season.season === selectedSeason)
          .map(season => (
            <div key={season.season}>
              <h3>Season {season.season}: {season.title}</h3>
              <p>{season.episodes.length} Episodes</p>
              
              <div className="episodes-list">
                {season.episodes.map((episode) => (
                  <div key={episode.episode} className="episode-card">
                    <div className="episode-number">{episode.episode || '?'}</div>
                    <div className="episode-content">
                      <h4>{episode.title || 'Episode Title Not Available'}</h4>
                      <p className="episode-description">
                        {episode.description 
                          ? episode.description 
                          : 'No description available for this episode.'}
                      </p>
                      {episode.file && (
                        <div className="episode-meta">
                          <span className="episode-available">Available to play</span>
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
  )
}

export default ShowDetails