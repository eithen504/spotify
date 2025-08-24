// App.tsx
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './Routes/_homePage/HomePage';
import PlaylistPage from './Routes/_playlistPage/PlaylistPage';
import SearchPage from './Routes/_searchPage/SearchPage';
import AlbumPage from './Routes/_albumPage/AlbumPage';
import CollectionTracksPage from './Routes/_collectionTracksPage/CollectionTracksPage';
import TrackPage from './Routes/_trackPage/TrackPage';
import EpisodePage from './Routes/_episodePage/EpisodePage';
import PodcastPage from './Routes/_podcastPage/PodcastPage';
import AuthPage from './Routes/_authPage/AuthPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/track/:id" element={<TrackPage />} />
        <Route path="/show/:id" element={<PodcastPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
        <Route path="/collection/tracks" element={<CollectionTracksPage />} />
      </Route>
      
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;


