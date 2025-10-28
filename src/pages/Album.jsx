import React, { useState } from "react";
import { Play, Heart, MoreHorizontal, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Album() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setTracks(data);
    } catch (err) {
      console.error("Search error:", err);
      alert("Error fetching songs from YouTube.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#111] text-white p-8">
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
          alt="Album Cover"
          className="w-48 h-48 object-cover rounded-xl shadow-lg"
        />
        <div>
          <p className="uppercase text-sm text-gray-400">Playlist</p>
          <h1 className="text-5xl font-bold text-white">YouTube Mix</h1>
          <p className="mt-2 text-gray-400">Search and play any music video</p>
          <div className="flex gap-2 mt-4">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Play className="w-5 h-5 mr-2" /> Play All
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Heart className="w-5 h-5 mr-2" /> Like
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube songs..."
          className="flex-1 p-3 rounded-lg bg-[#1b1b1b] text-gray-200 outline-none"
        />
        <Button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6"
        >
          Search
        </Button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              className="bg-[#181818] rounded-xl p-4 hover:bg-[#222] transition"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={track.thumbnail}
                alt={track.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold truncate">{track.title}</h3>
              <p className="text-gray-400 text-sm">{track.channel}</p>
              <a
                href={`https://www.youtube.com/watch?v=${track.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-cyan-400 hover:underline"
              >
                Watch on YouTube
              </a>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && tracks.length === 0 && (
        <p className="text-gray-500 mt-12 text-center">
          Try searching for your favorite artist or song.
        </p>
      )}
    </div>
  );
}
