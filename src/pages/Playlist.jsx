import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Play, MoreHorizontal, Clock, Music, Heart, Disc, Star, Headphones, Radio, Mic2, Guitar, Piano, Drum } from 'lucide-react';
import TrackRow from '../components/tracks/TrackRow';

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

export default function Playlist() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const { data: playlists = [] } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => base44.entities.Playlist.list(),
  });

  const { data: allTracks = [] } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => base44.entities.Track.list(),
  });

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-gray-900 to-black p-8">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Music className="w-24 h-24 text-gray-600 mb-4" />
          <p className="text-2xl text-gray-400">Playlist not found</p>
        </div>
      </div>
    );
  }

  const playlistTracks = allTracks.filter((track) =>
    playlist.track_ids?.includes(track.id)
  );

  const totalDuration = playlistTracks.reduce((sum, track) => sum + (track.duration || 0), 0);
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
  };

  const PlaylistIcon = ICON_MAP[playlist.icon] || Music;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 via-gray-900 to-black">
      <div className="flex items-end gap-6 p-8 pb-6">
        {playlist.custom_cover_url ? (
          <img
            src={playlist.custom_cover_url}
            alt={playlist.name}
            className="w-60 h-60 shadow-2xl rounded-lg object-cover"
          />
        ) : (
          <div className="w-60 h-60 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl rounded-lg flex items-center justify-center">
            <PlaylistIcon className="w-24 h-24 text-white" />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold uppercase">Playlist</p>
          <h1 className="text-6xl font-bold my-4">{playlist.name}</h1>
          <p className="text-gray-300 mb-4">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">GodlikeMusic</span>
            <span>•</span>
            <span>{playlistTracks.length} songs</span>
            {totalDuration > 0 && (
              <>
                <span>•</span>
                <span>{formatDuration(totalDuration)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 px-8 py-6 bg-black/20 backdrop-blur-md">
        <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition-all">
          <Play fill="black" className="text-black ml-1" size={24} />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal size={32} />
        </button>
      </div>

      <div className="px-8 pb-8">
        {playlistTracks.length > 0 ? (
          <>
            <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
              <div>#</div>
              <div>TITLE</div>
              <div>ALBUM</div>
              <div className="flex justify-end">
                <Clock size={16} />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              {playlistTracks.map((track, index) => (
                <TrackRow key={track.id} track={track} index={index} showAlbum />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">This playlist is empty</p>
            <p className="text-gray-500 text-sm mt-2">Add some tracks to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
