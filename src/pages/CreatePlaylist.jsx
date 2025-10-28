import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import { Music, Heart, Disc, Star, Headphones, Radio, Mic2, Guitar, Piano, Drum, Upload } from 'lucide-react';

const PLAYLIST_ICONS = [
  { name: 'Music', icon: Music, color: 'text-green-400' },
  { name: 'Heart', icon: Heart, color: 'text-red-400' },
  { name: 'Disc', icon: Disc, color: 'text-blue-400' },
  { name: 'Star', icon: Star, color: 'text-yellow-400' },
  { name: 'Headphones', icon: Headphones, color: 'text-purple-400' },
  { name: 'Radio', icon: Radio, color: 'text-cyan-400' },
  { name: 'Mic', icon: Mic2, color: 'text-pink-400' },
  { name: 'Guitar', icon: Guitar, color: 'text-orange-400' },
  { name: 'Piano', icon: Piano, color: 'text-indigo-400' },
  { name: 'Drum', icon: Drum, color: 'text-teal-400' },
];

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [folderId, setFolderId] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Music');
  const [customImage, setCustomImage] = useState(null);
  const [customImagePreview, setCustomImagePreview] = useState(null);
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [useCustomImage, setUseCustomImage] = useState(false);

  const { data: folders = [] } = useQuery({
    queryKey: ['folders'],
    queryFn: () => base44.entities.PlaylistFolder.list(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Playlist.create(data),
    onSuccess: (newPlaylist) => {
      queryClient.invalidateQueries(['playlists']);
      navigate(createPageUrl('Playlist', { id: newPlaylist.id }));
    },
  });

  const createFolderMutation = useMutation({
    mutationFn: (data) => base44.entities.PlaylistFolder.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['folders']);
      setShowFolderForm(false);
      setNewFolderName('');
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImagePreview(reader.result);
        setUseCustomImage(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const playlistData = {
      name,
      description,
      folder_id: folderId || null,
      track_ids: [],
      icon: selectedIcon,
      cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
    };

    if (useCustomImage && customImagePreview) {
      playlistData.custom_cover_url = customImagePreview;
    }

    createMutation.mutate(playlistData);
  };

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      createFolderMutation.mutate({
        name: newFolderName,
        color: '#1DB954',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create Playlist</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Playlist Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="My Awesome Playlist"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={4}
              placeholder="Add a description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Playlist Cover</label>
            <div className="flex gap-4 items-start">
              {customImagePreview ? (
                <div className="relative">
                  <img
                    src={customImagePreview}
                    alt="Custom cover"
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCustomImage(null);
                      setCustomImagePreview(null);
                      setUseCustomImage(false);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="w-32 h-32 bg-gray-800 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors border-2 border-dashed border-gray-600">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-400">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-2">
                  Upload a custom image or choose an icon below
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: Square image, at least 300x300px
                </p>
              </div>
            </div>
          </div>

          {!useCustomImage && (
            <div>
              <label className="block text-sm font-medium mb-3">Choose Icon</label>
              <div className="grid grid-cols-5 gap-3">
                {PLAYLIST_ICONS.map(({ name, icon: Icon, color }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSelectedIcon(name)}
                    className={`p-4 rounded-lg transition-all ${
                      selectedIcon === name
                        ? 'bg-green-500/20 ring-2 ring-green-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto ${color}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Folder (Optional)</label>
              <button
                type="button"
                onClick={() => setShowFolderForm(!showFolderForm)}
                className="text-sm text-green-400 hover:text-green-300"
              >
                + New Folder
              </button>
            </div>

            {showFolderForm && (
              <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="w-full bg-gray-900 text-white rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCreateFolder}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 text-sm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFolderForm(false);
                      setNewFolderName('');
                    }}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <select
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">No folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(createPageUrl('Home'))}
              className="flex-1 py-3 rounded-full font-semibold bg-gray-800 hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-3 rounded-full font-semibold bg-green-500 hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
