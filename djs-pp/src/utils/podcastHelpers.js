
// Get unique seasons from a podcast
export const getUniqueSeasons = (podcast) => {
    if (!podcast?.seasons) return []
    const seen = new Set()
    return podcast.seasons.filter(season => {
      if (seen.has(season.season)) return false
      seen.add(season.season)
      return true
    })
  }

//Filter podcasts based on search term
export const filterPodcastsBySearch = (podcasts, searchTerm) => {
    return podcasts.filter(podcast =>
        podcast.title.toLowerCase().includes(
            searchTerm.replace(/\s+/g, '').toLowerCase()
        )
    )
}

    // Sort podcasts based on selected option
     export const sortPodcasts = (podcasts, sortOption) => {
      return [...podcasts].sort((a, b) => {
          
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
  }

  export const filterAndSortPodcasts = (podcasts, searchTerm, selectedGenre, sortOption) => {
  return podcasts
    .filter(podcast => {
      const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      const matchesGenre = selectedGenre === 'all' || podcast.genres.includes(parseInt(selectedGenre))
      return matchesSearch && matchesGenre
    })
    .sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.updated) - new Date(a.updated)
      } else if (sortOption === 'a-z') {
        return a.title.localeCompare(b.title)
      } else if (sortOption === 'z-a') {
        return b.title.localeCompare(a.title)
      }
      return 0
    })
}
    
   
  

