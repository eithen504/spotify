import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/homePage/HomePage"
import AuthPage from "../pages/authPage/AuthPage"
import TrackPage from "../pages/trackPage/TrackPage"
import PlaylistPage from "../pages/playlistPage/PlaylistPage"
import { NotFoundPage } from "../components/NotFounds"
import AppLayout from "../layouts/AppLayout"
import CollectionTracksPage from "../pages/collectionTracksPage/CollectionTracksPage"
import SearchPage from "../pages/searchPage/SearchPage"
import AlbumPage from "../pages/albumPage/AlbumPage"
import GenrePage from "../pages/genrePage/GenrePage"
import ShowPage from "../pages/showPage/ShowPage"
import LibraryPage from "../pages/libraryPage/LibraryPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/my/library" element={<LibraryPage />} />
                <Route path="/album/:id" element={<AlbumPage />} />
                <Route path="/track/:id" element={<TrackPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/genre/:id" element={<GenrePage />} />
                <Route path="/show/:id" element={<ShowPage />} />
                <Route path="/collection/tracks" element={<CollectionTracksPage />} />
                <Route path="/search" element={<SearchPage />} />
            </Route>

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes