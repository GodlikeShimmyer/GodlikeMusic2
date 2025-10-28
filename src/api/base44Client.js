const initializeSampleData = () => {
  if (localStorage.getItem('godlikemusic_initialized')) {
    return;
  }

  const sampleTracks = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album_id: '1',
      duration: 200,
      cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300',
      created_date: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album_id: '2',
      duration: 203,
      cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      created_date: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album_id: '1',
      duration: 215,
      cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300',
      created_date: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Peaches',
      artist: 'Justin Bieber',
      album_id: '3',
      duration: 198,
      cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300',
      created_date: new Date().toISOString(),
    },
  ];

  const sampleAlbums = [
    {
      id: '1',
      title: 'After Hours',
      artist: 'The Weeknd',
      year: 2020,
      cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300',
      track_count: 14,
      created_date: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Future Nostalgia',
      artist: 'Dua Lipa',
      year: 2020,
      cover_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300',
      track_count: 11,
      created_date: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Justice',
      artist: 'Justin Bieber',
      year: 2021,
      cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300',
      track_count: 16,
      created_date: new Date().toISOString(),
    },
  ];

  const samplePlaylists = [
    {
      id: '1',
      name: 'Chill Vibes',
      description: 'Relax and unwind',
      cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300',
      track_ids: ['1', '2'],
      icon: 'Music',
      created_date: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Workout Mix',
      description: 'Get pumped!',
      cover_url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300',
      track_ids: ['3', '4'],
      icon: 'Heart',
      created_date: new Date().toISOString(),
    },
  ];

  localStorage.setItem('tracks', JSON.stringify(sampleTracks));
  localStorage.setItem('albums', JSON.stringify(sampleAlbums));
  localStorage.setItem('playlists', JSON.stringify(samplePlaylists));
  localStorage.setItem('folders', JSON.stringify([]));
  localStorage.setItem('likedTracks', JSON.stringify([]));
  localStorage.setItem('godlikemusic_initialized', 'true');
};

initializeSampleData();

const getFromStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const base44 = {
  entities: {
    Track: {
      list: async () => getFromStorage('tracks'),
      create: async (data) => {
        const tracks = getFromStorage('tracks');
        const newTrack = { ...data, id: generateId(), created_date: new Date().toISOString() };
        tracks.push(newTrack);
        saveToStorage('tracks', tracks);
        return newTrack;
      },
      update: async (id, data) => {
        const tracks = getFromStorage('tracks');
        const index = tracks.findIndex(t => t.id === id);
        if (index !== -1) {
          tracks[index] = { ...tracks[index], ...data };
          saveToStorage('tracks', tracks);
        }
        return tracks[index];
      },
      delete: async (id) => {
        const tracks = getFromStorage('tracks').filter(t => t.id !== id);
        saveToStorage('tracks', tracks);
      },
    },
    Album: {
      list: async () => getFromStorage('albums'),
      create: async (data) => {
        const albums = getFromStorage('albums');
        const newAlbum = { ...data, id: generateId(), created_date: new Date().toISOString() };
        albums.push(newAlbum);
        saveToStorage('albums', albums);
        return newAlbum;
      },
      update: async (id, data) => {
        const albums = getFromStorage('albums');
        const index = albums.findIndex(a => a.id === id);
        if (index !== -1) {
          albums[index] = { ...albums[index], ...data };
          saveToStorage('albums', albums);
        }
        return albums[index];
      },
      delete: async (id) => {
        const albums = getFromStorage('albums').filter(a => a.id !== id);
        saveToStorage('albums', albums);
      },
    },
    Playlist: {
      list: async () => getFromStorage('playlists'),
      create: async (data) => {
        const playlists = getFromStorage('playlists');
        const newPlaylist = { ...data, id: generateId(), created_date: new Date().toISOString() };
        playlists.push(newPlaylist);
        saveToStorage('playlists', playlists);
        return newPlaylist;
      },
      update: async (id, data) => {
        const playlists = getFromStorage('playlists');
        const index = playlists.findIndex(p => p.id === id);
        if (index !== -1) {
          playlists[index] = { ...playlists[index], ...data };
          saveToStorage('playlists', playlists);
        }
        return playlists[index];
      },
      delete: async (id) => {
        const playlists = getFromStorage('playlists').filter(p => p.id !== id);
        saveToStorage('playlists', playlists);
      },
    },
    PlaylistFolder: {
      list: async () => getFromStorage('folders'),
      create: async (data) => {
        const folders = getFromStorage('folders');
        const newFolder = { ...data, id: generateId(), created_date: new Date().toISOString() };
        folders.push(newFolder);
        saveToStorage('folders', folders);
        return newFolder;
      },
      update: async (id, data) => {
        const folders = getFromStorage('folders');
        const index = folders.findIndex(f => f.id === id);
        if (index !== -1) {
          folders[index] = { ...folders[index], ...data };
          saveToStorage('folders', folders);
        }
        return folders[index];
      },
      delete: async (id) => {
        const folders = getFromStorage('folders').filter(f => f.id !== id);
        saveToStorage('folders', folders);
      },
    },
    LikedTrack: {
      list: async () => getFromStorage('likedTracks'),
      create: async (data) => {
        const likedTracks = getFromStorage('likedTracks');
        const newLikedTrack = { ...data, id: generateId(), created_date: new Date().toISOString() };
        likedTracks.push(newLikedTrack);
        saveToStorage('likedTracks', likedTracks);
        return newLikedTrack;
      },
      delete: async (id) => {
        const likedTracks = getFromStorage('likedTracks').filter(lt => lt.id !== id);
        saveToStorage('likedTracks', likedTracks);
      },
    },
  },
};
