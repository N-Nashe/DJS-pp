// API service functions for podcast data fetching
// Fetch all podcasts for home.jsx
export const fetchAllPodcasts = async () => {
  try {
    const response = await fetch('https://podcast-api.netlify.app/');

    if (!response.ok) {
      throw new Error('Failed to load podcasts!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Fetch podcast details by ID from showDetails.jsx
export const fetchPodcastDetailsById = async (podcastId) => {
  try {
    const response = await fetch(
      `https://podcast-api.netlify.app/id/${podcastId}`,
    );

    if (!response.ok) {
      throw new Error('Failed to load podcast details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
