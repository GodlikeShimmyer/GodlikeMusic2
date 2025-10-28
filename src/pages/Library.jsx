import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import PlaylistCard from '../components/cards/PlaylistCard';
import AlbumCard from '../components/cards/AlbumCard';

export default function Library() {
  const { data: playlists = [] } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => base44.entities.Playlist.list(),
  });

  const { data: albums = [] } = useQuery({
    queryKey: ['albums'],
    queryFn: () => base44.entities.Album.list(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <h1 className="text-4xl font-bold mb-8">Your Library</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Playlists</h2>
        {playlists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No playlists yet. Create your first playlist!</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Albums</h2>
        {albums.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No albums in your library.</p>
        )}
      </section>
    </div>
  );
}
