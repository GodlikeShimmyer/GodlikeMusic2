import React, { useEffect, useState } from "react";
import { getRecommendedSongs } from "@/lib/youtube";
import { motion } from "framer-motion";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getRecommendedSongs();
      setSongs(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Recommended for You</h1>

      {loading ? (
        <p className="text-gray-400">Loading recommendations…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {songs.map((song) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900 p-4 rounded-xl hover:bg-neutral-800 transition"
            >
              <img
                src={song.thumbnail}
                alt={song.title}
                className="rounded-lg mb-3"
              />
              <h2 className="text-white font-semibold line-clamp-2">
                {song.title}
              </h2>
              <p className="text-gray-400 text-sm mb-3">{song.artist}</p>
              <a
                href={song.url}
                target="_blank"
                rel="noreferrer"
                className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white text-sm"
              >
                Play
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
