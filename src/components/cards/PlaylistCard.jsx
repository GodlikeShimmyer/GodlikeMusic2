import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, Heart, Disc, Star, Headphones, Radio, Mic2, Guitar, Piano, Drum } from 'lucide-react';
import { createPageUrl } from '@/utils';

const ICON_MAP = {
  Music: Music,
  Heart: Heart,
  Disc: Disc,
  Star: Star,
  Headphones: Headphones,
  Radio: Radio,
  Mic: Mic2,
  Guitar: Guitar,
  Piano: Piano,
  Drum: Drum,
};

export default function PlaylistCard({ playlist }) {
  const PlaylistIcon = ICON_MAP[playlist.icon] || Music;

  return (
    <Link
      to={createPageUrl('Playlist', { id: playlist.id })}
      className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-lg transition-all group cursor-pointer"
    >
      <div className="relative mb-4">
        {playlist.custom_cover_url ? (
          <img
            src={playlist.custom_cover_url}
            alt={playlist.name}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-green-500 to-cyan-600 rounded-lg shadow-lg flex items-center justify-center">
            <PlaylistIcon className="w-16 h-16 text-white" />
          </div>
        )}
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105">
          <Play fill="black" className="text-black ml-0.5" size={20} />
        </button>
      </div>
      <h3 className="font-semibold truncate mb-2">{playlist.name}</h3>
      <p className="text-sm text-gray-400 line-clamp-2">
        {playlist.description || `${playlist.track_ids?.length || 0} songs`}
      </p>
    </Link>
  );
}
