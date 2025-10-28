import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LikedSongs() {
  const [likedSongs, setLikedSongs] = useState([]);

  // Load liked songs from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("likedSongs");
      if (stored) setLikedSongs(JSON.parse(stored));
    }
  }, []);

  // Remove a song from liked list
  const removeLike = (id) => {
    const updated = likedSongs.filter((song) => song.id !== id);
    setLikedSongs(updated);
    localStorage.setItem("likedSongs", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Liked Songs</h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">You haven’t liked any songs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedSongs.map((song) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 p-4 rounded-xl shadow-md hover:bg-neutral-800 transition"
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="rounded-lg mb-3"
              />
              <h2 className="text-white font-semibold">{song.title}</h2>
              <p className="text-gray-400 text-sm mb-3">{song.artist}</p>
              <div className="flex gap-2">
                <a
                  href={song.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
                >
                  Play
                </a>
                <button
                  onClick={() => removeLike(song.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
