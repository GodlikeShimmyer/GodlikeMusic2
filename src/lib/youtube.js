import axios from "axios";

// Load API key from environment variable (safer)
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Fallback mock data (if API key fails)
const mockSongs = [
  {
    id: "dQw4w9WgXcQ",
    title: "Never Gonna Give You Up",
    artist: "Rick Astley",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3JZ_D3ELwOQ",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
  },
];

export async function searchYouTube(query) {
  if (!API_KEY) {
    console.warn("Missing YouTube API key. Using mock songs.");
    return mockSongs;
  }

  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 12,
          q: query,
          type: "video",
          videoCategoryId: "10", // Music category
          key: API_KEY,
        },
      }
    );

    return res.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (err) {
    console.error("YouTube search error:", err);
    return mockSongs;
  }
}

export async function getRecommendedSongs() {
  // Use trending music videos as recommended
  return searchYouTube("trending music");
}
