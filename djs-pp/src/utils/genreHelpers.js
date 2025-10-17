import { genres } from '../data.js'

  // Function to get genre names from IDs
   
  export const getGenreNames = (genreIds) => {
    return genreIds.map(id => {
      const foundGenre = genres.find(genre => genre.id === id)
      return foundGenre ? foundGenre.title : 'Unknown'
    }).join(', ')
  }

    // Handle genre names
   export const getGenreNamesFromArray = (genreArray) => {
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