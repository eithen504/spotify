// App.tsx
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import HomePage from './Routes/_homePage/HomePage';
import PlaylistPage from './Routes/_playlistPage/PlaylistPage';
import SearchPage from './Routes/_searchPage/SearchPage';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/playlist/:id" element={<PlaylistPage />} />
      </Route>
    </Routes>
  );
}

export default App;


