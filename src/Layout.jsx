import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Heart, Plus, Music, Folder, ChevronDown, ChevronRight, Disc, Star, Headphones, Radio, Mic2, Guitar, Piano, Drum } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from './api/base44Client';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ContextMenu from './components/context/ContextMenu';
import MusicPlayer from './components/player/MusicPlayer';
import { createPageUrl } from './utils';

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

export default function Layout({ children }) {
  const location = useLocation();
  const [expandedFolders, setExpandedFolders] = useState({});
  const [contextMenu, setContextMenu] = useState(null);

  const { data: playlists = [], refetch: refetchPlaylists } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => base44.entities.Playlist.list(),
  });

  const { data: folders = [], refetch: refetchFolders } = useQuery({
    queryKey: ['folders'],
    queryFn: () => base44.entities.PlaylistFolder.list(),
  });

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const playlistId = result.draggableId;
    const destinationId = result.destination.droppableId;

    const newFolderId = destinationId === 'no-folder' ? null : destinationId;

    await base44.entities.Playlist.update(playlistId, { folder_id: newFolderId });
    refetchPlaylists();
  };

  const handleContextMenu = (e, item, type) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item,
      type,
    });
  };

  const handleMoveToFolder = async (playlistId, folderId) => {
    await base44.entities.Playlist.update(playlistId, { folder_id: folderId });
    refetchPlaylists();
    setContextMenu(null);
  };

  const handleDeletePlaylist = async (playlistId) => {
    await base44.entities.Playlist.delete(playlistId);
    refetchPlaylists();
    setContextMenu(null);
  };

  const handleDeleteFolder = async (folderId) => {
    await base44.entities.PlaylistFolder.delete(folderId);
    refetchFolders();
    refetchPlaylists();
    setContextMenu(null);
  };

  const playlistsByFolder = playlists.reduce((acc, playlist) => {
    const folderId = playlist.folder_id || 'no-folder';
    if (!acc[folderId]) acc[folderId] = [];
    acc[folderId].push(playlist);
    return acc;
  }, {});

  const getPlaylistIcon = (iconName) => {
    const Icon = ICON_MAP[iconName] || Music;
    return Icon;
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-black flex flex-col border-r border-gray-800">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            GodlikeMusic
          </h1>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          <Link
            to={createPageUrl('Home')}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
              location.pathname === createPageUrl('Home')
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Home size={24} />
            <span className="font-semibold">Home</span>
          </Link>
          <Link
            to={createPageUrl('Search')}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
              location.pathname === createPageUrl('Search')
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Search size={24} />
            <span className="font-semibold">Search</span>
          </Link>
          <Link
            to={createPageUrl('Library')}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
              location.pathname === createPageUrl('Library')
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Library size={24} />
            <span className="font-semibold">Your Library</span>
          </Link>
        </nav>

        <div className="mt-6 px-3 space-y-1">
          <Link
            to={createPageUrl('CreatePlaylist')}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-all"
          >
            <Plus size={24} />
            <span className="font-semibold">Create Playlist</span>
          </Link>
          <Link
            to={createPageUrl('LikedSongs')}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
              location.pathname === createPageUrl('LikedSongs')
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            <Heart size={24} />
            <span className="font-semibold">Liked Songs</span>
          </Link>
        </div>

        <div className="h-px bg-gray-800 mx-6 my-4" />

        {/* Playlists with Folders */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1 overflow-y-auto px-3 pb-4">
            {/* Folders */}
            {folders.map((folder) => (
              <div key={folder.id} className="mb-2">
                <div
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white cursor-pointer group"
                  onClick={() =>
                    setExpandedFolders((prev) => ({
                      ...prev,
                      [folder.id]: !prev[folder.id],
                    }))
                  }
                  onContextMenu={(e) => handleContextMenu(e, folder, 'folder')}
                >
                  {expandedFolders[folder.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                  <Folder size={20} className="text-cyan-400" />
                  <span className="flex-1 font-medium">{folder.name}</span>
                  <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100">
                    {playlistsByFolder[folder.id]?.length || 0}
                  </span>
                </div>

                {expandedFolders[folder.id] && (
                  <Droppable droppableId={folder.id}>
                    {(provided, snapshot) => (
                      <div
                        ref__={provided.innerRef}
                        {...provided.droppableProps}
                        className={`ml-6 space-y-1 ${
                          snapshot.isDraggingOver ? 'bg-gray-900 rounded-lg' : ''
                        }`}
                      >
                        {playlistsByFolder[folder.id]?.map((playlist, index) => {
                          const PlaylistIcon = getPlaylistIcon(playlist.icon);
                          return (
                            <Draggable
                              key={playlist.id}
                              draggableId={playlist.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Link
                                  to={createPageUrl('Playlist', { id: playlist.id })}
                                  ref__={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-all group ${
                                    snapshot.isDragging ? 'bg-green-500/20 shadow-lg shadow-green-500/50' : ''
                                  }`}
                                  onContextMenu={(e) => handleContextMenu(e, playlist, 'playlist')}
                                >
                                  <PlaylistIcon size={16} />
                                  <span className="flex-1 text-sm truncate">{playlist.name}</span>
                                  <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100">
                                    {playlist.track_ids?.length || 0}
                                  </span>
                                </Link>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>
            ))}

            {/* Playlists without folder */}
            <Droppable droppableId="no-folder">
              {(provided, snapshot) => (
                <div
                  ref__={provided.innerRef}
                  {...provided.droppableProps}
                  className={`space-y-1 ${
                    snapshot.isDraggingOver ? 'bg-gray-900 rounded-lg p-2' : ''
                  }`}
                >
                  {playlistsByFolder['no-folder']?.map((playlist, index) => {
                    const PlaylistIcon = getPlaylistIcon(playlist.icon);
                    return (
                      <Draggable
                        key={playlist.id}
                        draggableId={playlist.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Link
                            to={createPageUrl('Playlist', { id: playlist.id })}
                            ref__={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-900 transition-all group ${
                              snapshot.isDragging ? 'bg-green-500/20 shadow-lg shadow-green-500/50' : ''
                            }`}
                            onContextMenu={(e) => handleContextMenu(e, playlist, 'playlist')}
                          >
                            <PlaylistIcon size={20} />
                            <span className="flex-1 truncate">{playlist.name}</span>
                            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100">
                              {playlist.track_ids?.length || 0}
                            </span>
                          </Link>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-24">{children}</div>
        <MusicPlayer />
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          item={contextMenu.item}
          type={contextMenu.type}
          onClose={() => setContextMenu(null)}
          onMoveToFolder={handleMoveToFolder}
          onDelete={contextMenu.type === 'playlist' ? handleDeletePlaylist : handleDeleteFolder}
          folders={folders}
          playlists={playlists}
        />
      )}
    </div>
  );
}
