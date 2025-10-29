import React, { useEffect, useState, type JSX } from 'react'
import { PinIcon } from '../../../../../Svgs';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Album, Folder, LeftSidebarTab, Playlist } from '../../../../../types';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { usePlaylistStore } from '../../../../../store/usePlaylistStore';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useAlbumActions } from '../../../../../hooks/album';
import { usePlaylistActions } from '../../../../../hooks/playlist';
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder';
import { VIEW_SKELETONS } from '../../../../../constants';
import { NotFoundFolderPlaylists } from '../../../../../components/NotFounds';
import { useLibrarySearchStore } from '../../../../../store/useLibrarySearchStore';

const CompactListPlaylists = () => {
    const { pathname } = useLocation();
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { data: playlists } = useGetCurrentUserLibraryItems(leftSidebarActiveTab);
    const { navigateToPlaylist } = usePlaylistActions();

    const [searchResults, setSearchResults] = useState<Playlist[]>([]);
    const { searchQuery } = useLibrarySearchStore();

    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    return (
        <>
            {
                searchResults.map((playlist: Playlist) => {
                    const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

                    return (
                        <div
                            key={playlist._id}
                            className={`flex items-center space-x-3 ${isCurrentPlaylistPage ? "bg-[#242424]" : "dynamic-bg-hover"} p-2 rounded cursor-pointer group`}
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{playlist.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{`Total Tracks : ${playlist.tracks.length}`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const CompactListSavePlaylists = () => {
    const { pathname } = useLocation();
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { data: playlists } = useGetCurrentUserLibraryItems(leftSidebarActiveTab);
    const { navigateToPlaylist } = usePlaylistActions();

    const [searchResults, setSearchResults] = useState<Playlist[]>([]);
    const { searchQuery } = useLibrarySearchStore();

    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    return (
        <>
            {
                searchResults.map((playlist: Playlist) => {
                    const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

                    return (
                        <div
                            key={playlist._id}
                            className={`flex items-center space-x-3 ${isCurrentPlaylistPage ? "bg-[#242424]" : "dynamic-bg-hover"} p-2 rounded cursor-pointer group`}
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{playlist.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{`Total Tracks : ${playlist.tracks.length}`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const CompactListSaveAlbums = () => {
    const { pathname } = useLocation();
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { data: albums } = useGetCurrentUserLibraryItems(leftSidebarActiveTab);
    const { navigateToAlbum } = useAlbumActions();

    const [searchResults, setSearchResults] = useState<Album[]>([]);
    const { searchQuery } = useLibrarySearchStore();

    useEffect(() => {
        const filteredAlbums = albums?.filter((p: Album) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredAlbums || []);
    }, [searchQuery, albums])

    return (
        <>
            {
                searchResults.map((album: Album) => {
                    const isCurrentAlbumPage = pathname == `/album/${album._id}`;

                    return (
                        <div
                            key={album._id}
                            className={`flex items-center space-x-3 ${isCurrentAlbumPage ? "bg-[#242424]" : "dynamic-bg-hover"} p-2 rounded cursor-pointer group`}
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                            onClick={() => navigateToAlbum(`/album/${album._id}`)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{album.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">Album . Spotify</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const CompactListFolders = () => {
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { data: folders } = useGetCurrentUserLibraryItems(leftSidebarActiveTab);
    const { navigateToFolder } = useFolderActions();

    const [searchResults, setSearchResults] = useState<Folder[]>([]);
    const { searchQuery } = useLibrarySearchStore();

    useEffect(() => {
        const filteredFolders = folders?.filter((p: Folder) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredFolders || []);
    }, [searchQuery, folders])

    return (
        <>
            {
                searchResults.map((folder: Folder) => (
                    <div
                        key={folder._id}
                        className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded cursor-pointer group"
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                        onClick={() => navigateToFolder({ activeId: folder._id, name: folder.name })}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#ffffff] truncate">{folder.name}</div>
                            <div className="text-[#aaaaaa] truncate">
                                <span className="truncate text-sm">Folder . Spotify</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

const FolderPlaylists = () => {
    const { pathname } = useLocation();
    const { preferences: { folder: { activeId } } } = useUIPreferencesStore();
    const { data: playlists, isLoading } = useGetFolderPlaylists(activeId);
    const { navigateToPlaylist } = usePlaylistActions();

    const [searchResults, setSearchResults] = useState<Playlist[]>([]);
    const { searchQuery } = useLibrarySearchStore();

    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    if (isLoading) return VIEW_SKELETONS["Compact List"];

    if (playlists?.length == 0) return <NotFoundFolderPlaylists />

    return (
        <div className="flex-1 px-3 mb-4">
            {
                searchResults?.map((playlist: Playlist) => {
                    const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

                    return (
                        <div
                            key={playlist._id}
                            className={`flex items-center space-x-3 ${isCurrentPlaylistPage ? "bg-[#242424]" : "dynamic-bg-hover"} p-2 rounded cursor-pointer group`}
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{playlist.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{`Total Tracks : ${playlist.tracks.length}`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const CompactListComponents: Record<LeftSidebarTab, () => JSX.Element> = {
    "Playlists": CompactListPlaylists,
    "Save Playlists": CompactListSavePlaylists,
    "Save Albums": CompactListSaveAlbums,
    "Folders": CompactListFolders
}

const CompactListItems = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { setPlaylistData } = usePlaylistStore();
    const { preferences: { leftSidebarActiveTab, folder: { activeId } } } = useUIPreferencesStore();
    const isCollectionTracksPage = pathname == "/collection/tracks";

    const navigateToPlaylist = (navigateUrl: string) => {
        setPlaylistData({
            playImmediate: false
        })
        navigate(navigateUrl)
    }

    const Component = CompactListComponents[leftSidebarActiveTab]

    if (activeId) {
        return <FolderPlaylists />
    }

    return (
        <div className="flex-1 px-3 mb-4">
            {/* Liked Tracks */}
            <div
                className={`flex items-center space-x-3 ${isCollectionTracksPage ? "bg-[#242424]" : "dynamic-bg-hover"} p-2 rounded cursor-pointer group`}
                style={{
                    '--bgHoverColor': '#1F1F1F',
                } as React.CSSProperties}
                onClick={() => navigateToPlaylist("/collection/tracks")}
            >
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-md text-[#ffffff] truncate">Liked Tracks</div>
                    <div className="flex items-center gap-1 text-[#aaaaaa] truncate">
                        <div className="rotate-45 text-[#1ed760]">
                            <PinIcon width="14" height="14" />
                        </div>
                        <span className="truncate text-sm">Playlist</span>
                    </div>
                </div>
            </div>

            <Component />
        </div>
    )
}

export default CompactListItems