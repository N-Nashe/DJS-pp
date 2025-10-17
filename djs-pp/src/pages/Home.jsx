import React, { useState, useEffect } from 'react'
import { genres } from '../data.js'
import { useNavigate } from 'react-router-dom'
import { fetchAllPodcasts } from '../services/api'
import {formatDate} from '../utils/dateFormatters'
import {getGenreNames} from '../utils/genreHelpers'
import {filterAndSortPodcasts} from '../utils/podcastUtils'
import ThemeToggleButton from '../components/common/ThemeToggleButton'

function Home() {
   // State declarations
  const navigate = useNavigate()
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOption, setSortOption] = useState('newest')
  const [visibleCount, setVisibleCount] = useState(20)
  const [showLoadMore, setShowLoadMore] = useState(true)
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [searchPodcast, setSearchPodcast] = useState('')

// Genre change handler
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value)
  }
// Sort change handler
  const handleSortChange = (event) => {
    setSortOption(event.target.value)
  }
//  New Card click handler
  const handleCardClick = (podcast) => {
    navigate(`/show/${podcast.id}`)
  }
  
// Search input change handler
  const handleSearchChanges = (event) => {
    setSearchPodcast(event.target.value)
  }

 
 useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const data = await fetchAllPodcasts()
        setPodcasts(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadPodcasts()
  }, [])

  // Reset pagination when genre or search changes
  useEffect(() => {
    setVisibleCount(20)
    setShowLoadMore(true)
  }, [selectedGenre, searchPodcast])

  // Combine filtering and sorting
  const filteredAndSortedPodcasts = podcasts
    .filter(podcast => {
      // Search filter
      const matchesSearch = podcast.title.toLowerCase().includes(searchPodcast.trim().toLowerCase())
      
      // Genre filter
      const matchesGenre = selectedGenre === 'all' || podcast.genres.includes(parseInt(selectedGenre))
      
      // Both filters must match
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.updated) - new Date(a.updated)
      } else if (sortOption === 'a-z') {
        return a.title.localeCompare(b.title)
      } else if (sortOption === 'z-a') {
        return b.title.localeCompare(a.title)
      } else if (sortOption === 'no sort') {
        return 0
      }
      return 0
    })



// Simple click handler
const loadMore = () => {
  const newVisibleCount = visibleCount + 20
  setVisibleCount(newVisibleCount)
  
  // Hide button if we've loaded all available podcasts
  if (newVisibleCount >= filteredAndSortedPodcasts.length) {
    setShowLoadMore(false)
  }
}

// Simple rendering
const visiblePodcasts = filteredAndSortedPodcasts.slice(0, visibleCount)

// Determine if Load More button should be shown
const shouldShowLoadMore = visibleCount < filteredAndSortedPodcasts.length

  return (
    <div>
      <header className="app-header">
        <h1>🎙️ Podcast App</h1>
        <ThemeToggleButton />
        <div className="search-container">
          <input
            type="text"
            placeholder="What do you want to listen to..."
            value={searchPodcast}
            onChange={handleSearchChanges}
            className="search-bar"
          />
          
          <select value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest First</option>
            <option value="a-z">Sort A-Z</option>
            <option value="z-a">Sort Z-A</option>
            <option value="no sort">No Sort</option>
          </select>

          <select 
            value={selectedGenre} 
            onChange={handleGenreChange}
            className="genre-dropdown"
          >
            <option value="all">All Genres</option>
            <option value="1">Personal Growth</option>
            <option value="2">True Crime</option>
            <option value="3">History</option>
            <option value="4">Comedy</option>
            <option value="5">Entertainment</option>
            <option value="6">Business</option>
            <option value="7">Fiction</option>
            <option value="8">News</option>
            <option value="9">Kids & Family</option>
          </select>
        </div>
      </header>
      <main className="grid">
        {loading && <p className="loading">Loading podcasts...</p>}
        {error && <p className="error-message">Error: {error} </p>}
        {!loading && !error && visiblePodcasts.map(podcast => (
          // Render podcast card
          <div 
            key={podcast.id} 
            className="card"
            onClick={() => handleCardClick(podcast)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={podcast.image}
              alt={podcast.title}
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">{podcast.title}</h2>
              <p className="card-seasons">{podcast.seasons} Season{podcast.seasons !== 1 ? 's' : ''}</p>
              <p className="card-genres">{getGenreNames(podcast.genres)}</p>
              <p className="card-date">Updated: {formatDate(podcast.updated)}</p>
            </div>
          </div>
        ))}
      </main>
      
 
      {/* Load More button */}
      {shouldShowLoadMore && (
        <button onClick={loadMore} className="load-more">Load More Podcasts</button>
      )}
    </div>
  )
}

export default Home