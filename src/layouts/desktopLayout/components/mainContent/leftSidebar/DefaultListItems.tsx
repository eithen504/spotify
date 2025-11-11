import React, { useEffect, useState, type JSX } from 'react'
import { PauseIcon, PinIcon, PlayIcon } from '../../../../../Svgs';
import { usePlaylistStore } from '../../../../../store/usePlaylistStore';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';
import type { Album, Folder, LeftSidebarTab, Playlist } from '../../../../../types';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useAlbumStore } from '../../../../../store/useAlbumStore';
import { usePlaylistActions } from '../../../../../hooks/playlist';
import { useAlbumActions } from '../../../../../hooks/album';
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder';
import { VIEW_SKELETONS } from '../../../../../constants';
import { DefaultListItemsAlbumPlaceHolder, DefaultListItemsFolderPlaceHolder, DefaultListItemsPlaylistPlaceHolder } from '../../../../../components/Placeholders';
import { NotFoundFolderPlaylists } from '../../../../../components/NotFounds';
import { useLocation } from 'react-router-dom';
import { useLibrarySearchStore } from '../../../../../store/useLibrarySearchStore';

const DefaultListPlaylists = () => {
    const { pathname } = useLocation();
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists")
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

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
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
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
                            <div className="w-12 h-12 rounded-[4px] overflow-hidden relative">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt="New Music Friday India"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultListItemsPlaylistPlaceHolder />
                                    )
                                }
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                                    <button className="flex items-center justify-center rounded-full text-white cursor-pointer"
                                        title={isPlayingCurrentPlaylist ? `Pause ${playlist.title}` : `Play ${playlist.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, `/playlist/${playlist._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{playlist.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{`${playlist.tracks.length} Tracks`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const DefaultListSavePlaylists = () => {
    const { pathname } = useLocation();

    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { trackDetails } = useTrackDetailsStore();
    const { data: playlists } = useGetCurrentUserLibraryItems("Save Playlists");
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

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
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
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
                            <div className="w-12 h-12 rounded-[4px] overflow-hidden relative">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt="New Music Friday India"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultListItemsPlaylistPlaceHolder />
                                    )
                                }
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                                    <button className="flex items-center justify-center rounded-full text-white cursor-pointer"
                                        title={isPlayingCurrentPlaylist ? `Pause ${playlist.title}` : `Play ${playlist.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, `/playlist/${playlist._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{playlist.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{`${playlist.tracks.length} Tracks`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const DefaultListSaveAlbums = () => {
    const { pathname } = useLocation()
    const { trackDetails } = useTrackDetailsStore();
    const { albumData: { activeTrackId, albumId } } = useAlbumStore();
    const { data: albums } = useGetCurrentUserLibraryItems("Save Albums")
    const { navigateToAlbum, handlePlayPauseAlbum } = useAlbumActions();

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
                    const isPlayingCurrentAlbum = (albumId == album._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
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
                            <div className="w-12 h-12 rounded-[4px] overflow-hidden relative">
                                {
                                    album.coverImageUrl ? (
                                        <img
                                            src={album.coverImageUrl}
                                            alt="New Music Friday India"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultListItemsAlbumPlaceHolder />
                                    )
                                }
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                                    <button className="flex items-center justify-center rounded-full text-white cursor-pointer"
                                        title={isPlayingCurrentAlbum ? `Pause ${album.title}` : `Play ${album.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPauseAlbum(isPlayingCurrentAlbum, album._id, `/album/${album._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentAlbum ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                                        }
                                    </button>
                                </div>
                            </div>
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

const DefaultListFolders = () => {
    const { data: folders } = useGetCurrentUserLibraryItems("Folders");
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
                searchResults.map((folder: Folder) => {
                    return (
                        <div
                            key={folder._id}
                            className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded cursor-pointer group"
                            style={{
                                '--bgHoverColor': '#1F1F1F',
                            } as React.CSSProperties}
                            onClick={() => navigateToFolder({ id: folder._id, name: folder.name })}
                        >
                            {/* Folder Cover */}
                            <DefaultListItemsFolderPlaceHolder />

                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{folder.name}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">Folder . Spotify</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const FolderPlaylists = () => {
    const { pathname } = useLocation();
    const { trackDetails } = useTrackDetailsStore();
    const { preferences } = useUIPreferencesStore();
    const { activeFolder } = preferences;
    const { id: activeFolderId } = activeFolder;
    const { data: playlists, isLoading } = useGetFolderPlaylists(activeFolderId);
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    const [searchResults, setSearchResults] = useState<Playlist[]>([]);
    const { searchQuery } = useLibrarySearchStore();

    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    if (isLoading) return VIEW_SKELETONS["Default List"]

    if (playlists?.length == 0) return <NotFoundFolderPlaylists />

    return (
        <div className="flex-1 px-3 mb-4">
            {
                searchResults?.map((playlist: Playlist) => {
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
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
                            <div className="w-12 h-12 rounded-[4px] overflow-hidden relative">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt="New Music Friday India"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultListItemsPlaylistPlaceHolder />
                                    )
                                }
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                                    <button className="flex items-center justify-center rounded-full text-white cursor-pointer"
                                        title={isPlayingCurrentPlaylist ? `Pause ${playlist.title}` : `Play ${playlist.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, `/playlist/${playlist._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-[#ffffff] truncate">{playlist.title}</div>
                                <div className="text-[#aaaaaa] truncate">
                                    <span className="truncate text-sm">{`${playlist.tracks.length} Tracks`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const DefaultListComponents: Record<LeftSidebarTab, () => JSX.Element> = {
    "Playlists": DefaultListPlaylists,
    "Save Playlists": DefaultListSavePlaylists,
    "Save Albums": DefaultListSaveAlbums,
    "Folders": DefaultListFolders
}

const DefaultListItems = () => {
    const { pathname } = useLocation();
    const { preferences } = useUIPreferencesStore();
    const { library, activeFolder } = preferences;
    const { activeTab: libraryActiveTab } = library;
    const { id: activeFolderId } = activeFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();
    const id = "collectionTracks"

    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
    const isCollectionTracksPage = pathname == "/collection/tracks";

    const Component = DefaultListComponents[libraryActiveTab];

    if (activeFolderId) return <FolderPlaylists />;

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
                <div className="w-12 h-12 rounded overflow-hidden relative">
                    <img
                        src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                        alt="New Music Friday India"
                        className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                        <button className="flex items-center justify-center rounded-full text-white cursor-pointer"
                            title={isPlayingCollectionTracks ? 'Pause Liked Tracks' : 'Play Liked Tracks'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePlayPausePlaylist(isPlayingCollectionTracks, id, "/collection/tracks")
                            }}
                        >
                            {
                                isPlayingCollectionTracks ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                            }
                        </button>
                    </div>
                </div>

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

export default DefaultListItems