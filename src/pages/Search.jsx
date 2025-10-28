import React, { useState } from "react";
import { searchYouTube } from "@/lib/youtube";
import { motion } from "framer-motion";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await searchYouTube(query);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs or artists..."
          className="w-full p-3 rounded-lg bg-neutral-900 text-white outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-400">Searching...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900 p-4 rounded-lg hover:bg-neutral-800 transition"
          >
            <img
              src={song.thumbnail}
              alt={song.title}
              className="rounded-lg mb-2"
            />
            <h2 className="text-white font-semibold">{song.title}</h2>
            <p className="text-gray-400 text-sm mb-2">{song.artist}</p>
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
    </div>
  );
}
