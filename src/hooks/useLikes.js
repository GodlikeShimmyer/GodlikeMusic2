import { useState, useEffect } from "react";

/**
 * Custom hook to manage liked songs stored in localStorage.
 * Each song object should at least have an `id`, `title`, and `thumbnail`.
 */
export function useLikes() {
  const [likes, setLikes] = useState([]);

  // Load liked songs when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem("likedSongs");
    if (stored) {
      try {
        setLikes(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse liked songs:", err);
      }
    }
  }, []);

  // Add or remove a liked song
  const toggleLike = (song) => {
    setLikes((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      const updated = exists
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song];
      localStorage.setItem("likedSongs", JSON.stringify(updated));
      return updated;
    });
  };

  // Check if a song is already liked
  const isLiked = (songId) => likes.some((s) => s.id === songId);

  return { likes, toggleLike, isLiked };
}
