import React, { useEffect, useRef } from 'react';
import {
  Play,
  Plus,
  Heart,
  Share2,
  Folder,
  Trash2,
  Edit,
  Radio,
  User,
  Album,
  Link as LinkIcon,
  Download,
  FileText,
} from 'lucide-react';

export default function ContextMenu({
  x,
  y,
  item,
  type,
  onClose,
  onMoveToFolder,
  onDelete,
  folders = [],
  playlists = [],
}) {
  const menuRef = useRef(null);
  const [showSubmenu, setShowSubmenu] = React.useState(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const adjustedX = x + rect.width > window.innerWidth ? window.innerWidth - rect.width - 10 : x;
      const adjustedY = y + rect.height > window.innerHeight ? window.innerHeight - rect.height - 10 : y;
      menuRef.current.style.left = `${adjustedX}px`;
      menuRef.current.style.top = `${adjustedY}px`;
    }
  }, [x, y]);

  const menuItems = {
    track: [
      { icon: Plus, label: 'Add to queue', action: () => console.log('Add to queue') },
      {
        icon: Plus,
        label: 'Add to playlist',
        submenu: 'playlists',
      },
      { icon: Heart, label: 'Save to Liked Songs', action: () => console.log('Like') },
      { icon: Radio, label: 'Go to song radio', action: () => console.log('Radio') },
      { icon: User, label: 'Go to artist', action: () => console.log('Artist') },
      { icon: Album, label: 'Go to album', action: () => console.log('Album') },
      { icon: Share2, label: 'Share', action: () => console.log('Share') },
      { icon: LinkIcon, label: 'Copy song link', action: () => console.log('Copy link') },
      { icon: Download, label: 'Download', action: () => console.log('Download') },
      { icon: FileText, label: 'Show credits', action: () => console.log('Credits') },
    ],
    playlist: [
      { icon: Play, label: 'Play', action: () => console.log('Play') },
      { icon: Edit, label: 'Edit details', action: () => console.log('Edit') },
      {
        icon: Folder,
        label: 'Move to folder',
        submenu: 'folders',
      },
      { icon: Share2, label: 'Share', action: () => console.log('Share') },
      { icon: LinkIcon, label: 'Copy playlist link', action: () => console.log('Copy link') },
      {
        icon: Trash2,
        label: 'Delete',
        action: () => onDelete(item.id),
        danger: true,
      },
    ],
    album: [
      { icon: Play, label: 'Play', action: () => console.log('Play') },
      { icon: Plus, label: 'Add to queue', action: () => console.log('Add to queue') },
      { icon: Heart, label: 'Save to library', action: () => console.log('Save') },
      { icon: Radio, label: 'Go to album radio', action: () => console.log('Radio') },
      { icon: User, label: 'Go to artist', action: () => console.log('Artist') },
      { icon: Share2, label: 'Share', action: () => console.log('Share') },
      { icon: LinkIcon, label: 'Copy album link', action: () => console.log('Copy link') },
    ],
    folder: [
      { icon: Edit, label: 'Rename', action: () => console.log('Rename') },
      {
        icon: Trash2,
        label: 'Delete folder',
        action: () => onDelete(item.id),
        danger: true,
      },
    ],
  };

  const items = menuItems[type] || [];

  return (
    <div
      ref__={menuRef}
      className="fixed z-50 bg-gray-900 rounded-lg shadow-2xl py-1 min-w-[200px] border border-gray-800"
      style={{ left: x, top: y }}
    >
      {items.map((menuItem, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => menuItem.submenu && setShowSubmenu(menuItem.submenu)}
          onMouseLeave={() => menuItem.submenu && setShowSubmenu(null)}
        >
          <button
            onClick={() => {
              if (!menuItem.submenu) {
                menuItem.action();
                onClose();
              }
            }}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
              menuItem.danger ? 'text-red-400 hover:text-red-300' : 'text-gray-200'
            }`}
          >
            <menuItem.icon size={16} />
            <span className="flex-1 text-left">{menuItem.label}</span>
            {menuItem.submenu && <span className="text-gray-500">›</span>}
          </button>

          {menuItem.submenu && showSubmenu === menuItem.submenu && (
            <div className="absolute left-full top-0 ml-1 bg-gray-900 rounded-lg shadow-2xl py-1 min-w-[180px] border border-gray-800 max-h-60 overflow-y-auto">
              {menuItem.submenu === 'playlists' &&
                playlists.map((playlist) => (
                  <button
                    key={playlist.id}
                    onClick={() => {
                      console.log('Add to playlist', playlist.id);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                  >
                    <span className="flex-1 text-left truncate">{playlist.name}</span>
                  </button>
                ))}

              {menuItem.submenu === 'folders' && (
                <>
                  <button
                    onClick={() => {
                      onMoveToFolder(item.id, null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                  >
                    <span className="flex-1 text-left">No folder</span>
                  </button>
                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => {
                        onMoveToFolder(item.id, folder.id);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
                    >
                      <Folder size={16} />
                      <span className="flex-1 text-left truncate">{folder.name}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
