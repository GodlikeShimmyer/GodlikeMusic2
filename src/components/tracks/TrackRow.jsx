import React, { useState } from 'react';
import { Play, MoreHorizontal } from 'lucide-react';

export default function TrackRow({ track, index, showAlbum = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`grid ${showAlbum ? 'grid-cols-[16px_4fr_2fr_1fr]' : 'grid-cols-[16px_4fr_1fr]'} gap-4 px-4 py-2 rounded hover:bg-gray-800/50 group transition-colors cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center text-gray-400">
        {isHovered ? <Play size={16} /> : <span>{index + 1}</span>}
      </div>

      <div className="flex items-center gap-3 min-w-0">
        <img src={track.cover_url} alt={track.title} className="w-10 h-10 rounded" />
        <div className="min-w-0">
          <p className="font-medium truncate">{track.title}</p>
          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
        </div>
      </div>

      {showAlbum && (
        <div className="flex items-center text-gray-400 text-sm truncate">{track.artist}</div>
      )}

      <div className="flex items-center justify-end gap-4 text-gray-400 text-sm">
        <span>{formatDuration(track.duration)}</span>
        <button className="opacity-0 group-hover:opacity-100 hover:text-white transition-all">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
