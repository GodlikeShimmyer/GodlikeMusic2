import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function AlbumCard({ album }) {
  return (
    <Link
      to={createPageUrl('Album', { id: album.id })}
      className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-lg transition-all group cursor-pointer"
    >
      <div className="relative mb-4">
        <img
          src={album.cover_url}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105">
          <Play fill="black" className="text-black ml-0.5" size={20} />
        </button>
      </div>
      <h3 className="font-semibold truncate mb-2">{album.title}</h3>
      <p className="text-sm text-gray-400">
        {album.year} • {album.artist}
      </p>
    </Link>
  );
}
