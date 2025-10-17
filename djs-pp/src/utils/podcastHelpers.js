
// Get unique seasons from a podcast
const getUniqueSeasons = (podcast) => {
    if (!podcast?.seasons) return []
    const seen = new Set()
    return podcast.seasons.filter(season => {
      if (seen.has(season.season)) return false
      seen.add(season.season)
      return true
    })
  }

//Filter podcasts based on search term
const filterPodcastsBySearch = (podcasts, searchTerm) => {
    return podcasts.filter(podcast =>
        podcast.title.toLowerCase().includes(
            searchTerm.replace(/\s+/g, '').toLowerCase()
        )
    )
}



