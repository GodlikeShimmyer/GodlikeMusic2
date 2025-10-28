import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, List } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 z-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-1/4">
          <img
            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300"
            alt="Current track"
            className="w-14 h-14 rounded"
          />
          <div className="min-w-0">
            <p className="font-semibold truncate">Blinding Lights</p>
            <p className="text-sm text-gray-400 truncate">The Weeknd</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-2/4">
          <div className="flex items-center gap-4 mb-2">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle size={20} />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all"
            >
              {isPlaying ? (
                <Pause fill="black" className="text-black" size={16} />
              ) : (
                <Play fill="black" className="text-black ml-0.5" size={16} />
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-2xl">
            <span className="text-xs text-gray-400">1:23</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden group cursor-pointer">
              <div
                className="h-full bg-white group-hover:bg-green-500 transition-colors relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-gray-400">3:20</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/4">
          <button className="text-gray-400 hover:text-white transition-colors">
            <List size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 size={20} className="text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
