// File: src/pages/Album.jsx

import React, { useState } from "react";
import { Play, Heart, MoreHorizontal, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Album() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format from API");
      }

      setTracks(data);
    } catch (err) {
      console.error("Search error:", err);
      setError("Error fetching songs from YouTube.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="album-page p-4">
      <h1 className="text-2xl font-bold mb-2">Playlist</h1>
      <h2 className="text-xl mb-2"># YouTube Mix</h2>
      <p className="mb-4 text-gray-400">Search and play any music video</p>

      <form onSubmit={handleSearch} className="flex mb-4 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube songs..."
          className="flex-1 p-3 rounded-lg bg-[#1b1b1b] text-gray-200 outline-none"
        />
        <Button type="submit">Search</Button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && tracks.length === 0 && !error && (
        <p>Try searching for y
