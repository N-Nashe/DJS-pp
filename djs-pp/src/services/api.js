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

// Audio fetcher for episodes - validates and returns audio URL for playback
export const fetchPodcastAudio = async (episodeAudioUrl) => {
  try {
    // Check if audio URL is provided
    if (!episodeAudioUrl) {
      throw new Error('No audio URL provided');
    }

    // Validate the audio URL exists and is accessible
    const response = await fetch(episodeAudioUrl, { method: 'HEAD' });

    if (!response.ok) {
      throw new Error(`Audio file not accessible: ${response.status}`);
    }

    // Check if the response is actually an audio file
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('audio')) {
      console.warn('Warning: File may not be an audio file');
    }

    // Return the validated URL the HTML audio element will handle streaming
    return episodeAudioUrl;
  } catch (error) {
    throw new Error(`Audio fetch failed: ${error.message}`);
  }
};

