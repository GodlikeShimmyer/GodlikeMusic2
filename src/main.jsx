import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './Layout.jsx'
import Home from './pages/Home'
import Search from './pages/Search'
import Library from './pages/Library'
import Playlist from './pages/Playlist'
import Album from './pages/Album'
import LikedSongs from './pages/LikedSongs'
import CreatePlaylist from './pages/CreatePlaylist'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Layout><Home /></Layout>} />
          <Route path="/Search" element={<Layout><Search /></Layout>} />
          <Route path="/Library" element={<Layout><Library /></Layout>} />
          <Route path="/Playlist" element={<Layout><Playlist /></Layout>} />
          <Route path="/Album" element={<Layout><Album /></Layout>} />
          <Route path="/LikedSongs" element={<Layout><LikedSongs /></Layout>} />
          <Route path="/CreatePlaylist" element={<Layout><CreatePlaylist /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
