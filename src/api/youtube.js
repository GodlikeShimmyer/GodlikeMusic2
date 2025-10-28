import {
  searchYouTube,
  getTrendingMusic,
  getChannelVideos,
} from "../lib/youtube.js";

export default async function handler(req, res) {
  const { type, q, channelId } = req.query;

  try {
    let data;
    switch (type) {
      case "search":
        data = await searchYouTube(q);
        break;
      case "trending":
        data = await getTrendingMusic();
        break;
      case "artist":
        data = await getChannelVideos(channelId);
        break;
      default:
        return res.status(400).json({ error: "Invalid request type" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("YouTube API error:", err);
    res.status(500).json({ error: "YouTube API request failed" });
  }
}
