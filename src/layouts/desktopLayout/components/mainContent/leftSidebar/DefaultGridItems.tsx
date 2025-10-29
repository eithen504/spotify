import React, { useEffect, useState, type JSX } from 'react'
import { PauseIcon, PinIcon, PlayIcon } from '../../../../../Svgs'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore'
import { useBreakPoint } from '../../../../../hooks/breakPoint';
import { usePlaylistStore } from '../../../../../store/usePlaylistStore';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';
import type { Album, Folder, LeftSidebarTab, Playlist } from '../../../../../types';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useAlbumStore } from '../../../../../store/useAlbumStore';
import { usePlaylistActions } from '../../../../../hooks/playlist';
import { useAlbumActions } from '../../../../../hooks/album';
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder';
import { VIEW_SKELETONS } from '../../../../../constants';
import { DefaultGridItemsAlbumPlaceHolder, DefaultGridItemsFolderPlaceHolder, DefaultGridItemsPlaylistPlaceHolder } from '../../../../../components/Placeholders';
import { NotFoundFolderPlaylists } from '../../../../../components/NotFounds';
import { useLocation } from 'react-router-dom';
import { useLibrarySearchStore } from '../../../../../store/useLibrarySearchStore';
import { highlightText } from '../../../../../hooks/text';

const DefaultGridPlaylists = () => {
    const { pathname } = useLocation();
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { data: playlists } = useGetCurrentUserLibraryItems(leftSidebarActiveTab)
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
                            className={`group p-3 ${isCurrentPlaylistPage ? "bg-[#272727]" : "dynamic-bg-hover"} cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                            style={{
                                '--bgHoverColor': '#191919',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            {/* Square Image */}
                            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt={playlist.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultGridItemsPlaylistPlaceHolder />
                                    )
                                }

                                {/* Play Button with Slide-Up on Hover */}
                                <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                                    <button
                                        className="text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-4 cursor-pointer transition-transform shadow-lg"
                                        style={{
                                            '--bgHoverColor': '#3BE477',
                                        } as React.CSSProperties}
                                        title={isPlayingCurrentPlaylist ? `Pause ${playlist.title}` : `Play ${playlist.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, `/playlist/${playlist._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full mt-2 text-left">
                                <p className="text-md font-medium truncate">{highlightText(playlist.title, searchQuery)}</p>
                                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                                    <p>{`Total Tracks : ${playlist.tracks.length}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const DefaultGridSavePlaylists = () => {
    const { pathname } = useLocation();
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { data: playlists } = useGetCurrentUserLibraryItems(leftSidebarActiveTab)
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
                            className={`group p-3 ${isCurrentPlaylistPage ? "bg-[#272727]" : "dynamic-bg-hover"} cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                            style={{
                                '--bgHoverColor': '#191919',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            {/* Square Image */}
                            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt={playlist.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultGridItemsPlaylistPlaceHolder />
                                    )
                                }

                                {/* Play Button with Slide-Up on Hover */}
                                <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                                    <button
                                        className="text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-4 cursor-pointer transition-transform shadow-lg"
                                        style={{
                                            '--bgHoverColor': '#3BE477',
                                        } as React.CSSProperties}
                                        title={isPlayingCurrentPlaylist ? `Pause ${playlist.title}` : `Play ${playlist.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, `/playlist/${playlist._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full mt-2 text-left">
                                <p className="text-md font-medium truncate">{highlightText(playlist.title, searchQuery)}</p>
                                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                                    <p>{`Total Tracks : ${playlist.tracks.length}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const DefaultGridSaveAlbums = () => {
    const { pathname } = useLocation();
    const { preferences: { leftSidebarActiveTab } } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();
    const { albumData: { activeTrackId, albumId } } = useAlbumStore();
    const { data: albums } = useGetCurrentUserLibraryItems(leftSidebarActiveTab)
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
                            className={`group p-3 ${isCurrentAlbumPage ? "bg-[#272727]" : "dynamic-bg-hover"} cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                            style={{
                                '--bgHoverColor': '#191919',
                            } as React.CSSProperties}
                            onClick={() => navigateToAlbum(`/album/${album._id}`)}
                        >
                            {/* Square Image */}
                            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                                {
                                    album.coverImageUrl ? (
                                        <img
                                            src={album.coverImageUrl}
                                            alt={album.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultGridItemsAlbumPlaceHolder />
                                    )
                                }

                                {/* Play Button with Slide-Up on Hover */}
                                <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                                    <button
                                        className="text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-4 cursor-pointer transition-transform shadow-lg"
                                        style={{
                                            '--bgHoverColor': '#3BE477',
                                        } as React.CSSProperties}
                                        title={isPlayingCurrentAlbum ? `Pause ${album.title}` : `Play ${album.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPauseAlbum(isPlayingCurrentAlbum, album._id, `/album/${album._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentAlbum ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full mt-2 text-left">
                                <p className="text-md font-medium truncate">{highlightText(album.title, searchQuery)}</p>
                                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                                    <p>Album . Spotify</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const DefaultGridFolders = () => {
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
                searchResults.map((folder: Folder) => {
                    return (
                        <div
                            key={folder._id}
                            className={`group p-3 dynamic-bg-hover cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                            style={{
                                '--bgHoverColor': '#191919',
                            } as React.CSSProperties}
                            onClick={() => navigateToFolder({ activeId: folder._id, name: folder.name })}
                        >
                            {/* Folder Cover */}
                            <DefaultGridItemsFolderPlaceHolder />

                            {/* Text Section */}
                            <div className="w-full mt-2 text-left">
                                <p className="text-md font-medium truncate">{highlightText(folder.name, searchQuery)}</p>
                                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                                    <p>Folder . Spotify</p>
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
    const { preferences: { leftPanelSize, isLeftSidebarExpanded, folder: { activeId } } } = useUIPreferencesStore();
    const { breakPoint } = useBreakPoint();
    const { data: playlists, isLoading } = useGetFolderPlaylists(activeId);
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

    if (isLoading) return VIEW_SKELETONS["Default Grid"]

    if (playlists?.length == 0) return <NotFoundFolderPlaylists />

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakPoint === "md"
                    ? "grid-layout"
                    : leftPanelSize <= 28
                        ? "grid-layout"
                        : "custom-grid-layout"
                } px-3 mb-4`}
        >

            {
                searchResults?.map((playlist: Playlist) => {
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

                    return (
                        <div
                            key={playlist._id}
                            className={`group p-3 ${isCurrentPlaylistPage ? "bg-[#272727]" : "dynamic-bg-hover"} cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                            style={{
                                '--bgHoverColor': '#191919',
                            } as React.CSSProperties}
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            {/* Square Image */}
                            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt={playlist.title}
                                            className="absolute top-0 left-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <DefaultGridItemsPlaylistPlaceHolder />
                                    )
                                }

                                {/* Play Button with Slide-Up on Hover */}
                                <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                                    <button
                                        className="text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-4 cursor-pointer transition-transform shadow-lg"
                                        style={{
                                            '--bgHoverColor': '#3BE477',
                                        } as React.CSSProperties}
                                        title={isPlayingCurrentPlaylist ? `Pause ${playlist.title}` : `Play ${playlist.title}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, `/playlist/${playlist._id}`)
                                        }}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full mt-2 text-left">
                                <p className="text-md font-medium truncate">{highlightText(playlist.title, searchQuery)}</p>
                                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                                    <p>{`Total Tracks : ${playlist.tracks.length}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}

const DefaultGridComponents: Record<LeftSidebarTab, () => JSX.Element> = {
    "Playlists": DefaultGridPlaylists,
    "Save Playlists": DefaultGridSavePlaylists,
    "Save Albums": DefaultGridSaveAlbums,
    "Folders": DefaultGridFolders
}

const DefaultGridItems = () => {
    const { pathname } = useLocation();
    const { preferences: { leftPanelSize, isLeftSidebarExpanded, leftSidebarActiveTab, folder: { activeId } } } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();
    const { breakPoint } = useBreakPoint();
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    const id = "collectionTracks";
    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
    const isCollectionTracksPage = pathname == "/collection/tracks";

    const Component = DefaultGridComponents[leftSidebarActiveTab]

    if (activeId) return <FolderPlaylists />

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakPoint === "md"
                    ? "grid-layout"
                    : leftPanelSize <= 28
                        ? "grid-layout"
                        : "custom-grid-layout"
                } px-3 mb-4`}
        >
            <div
                className={`group p-3 ${isCollectionTracksPage ? "bg-[#272727]" : "dynamic-bg-hover"} cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
                style={{
                    '--bgHoverColor': '#191919',
                } as React.CSSProperties}
                onClick={() => navigateToPlaylist("/collection/tracks")}
            >
                {/* Square Image */}
                <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                    <img
                        src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                        alt="Liked Songs"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* Play Button with Slide-Up on Hover */}
                    <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                        <button
                            className="text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-4 cursor-pointer transition-transform shadow-lg"
                            style={{
                                '--bgHoverColor': '#3BE477',
                            } as React.CSSProperties}
                            title={isPlayingCollectionTracks ? 'Pause Liked Tracks' : 'Play Liked Tracks'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePlayPausePlaylist(isPlayingCollectionTracks, id, "/collection/tracks")
                            }}
                        >
                            {
                                isPlayingCollectionTracks ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                            }
                        </button>
                    </div>
                </div>

                {/* Text Section */}
                <div className="w-full mt-2 text-left">
                    <p className="text-md font-medium truncate">Liked Songs</p>
                    <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                        <div className="rotate-45 text-[#1dc95a]">
                            <PinIcon width="15" height="15" />
                        </div>
                        <p>Playlist</p>
                    </div>
                </div>
            </div>

            <Component />

        </div>
    )
};


export default DefaultGridItems