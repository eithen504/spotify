import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Album, Folder, Playlist } from '../../../../../types'
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore'
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder'
import { SmallScreenLibraryPanelSkelton } from '../../../../../components/Skeletons'
import { usePlaylistActions } from '../../../../../hooks/playlist'
import { useAlbumActions } from '../../../../../hooks/album'
import { SmallScreenAlbumPlaceHolder, SmallScreenFolderPlaceHolder, SmallScreenPlaylistPlaceHolder } from '../../../../../components/Placeholders'

const SmallScreenPlaylists = () => {
    const { pathname } = useLocation();
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { navigateToPlaylist } = usePlaylistActions();

    return (
        playlists.map((playlist: Playlist) => {
            const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

            return (
                <div
                    key={playlist._id}
                    className="flex justify-center group"
                    onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                >
                    <div
                        className={`p-2 ${isCurrentPlaylistPage ? "bg-[#242424]" : "dynamic-bg-hover"} rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer`}
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                    >
                        {
                            playlist.coverImageUrl ? (
                                <img
                                    src={playlist.coverImageUrl}
                                    alt={playlist.title}
                                    className="w-12 h-12 rounded-[4px] object-cover"
                                />
                            ) : (
                                <SmallScreenPlaylistPlaceHolder />
                            )
                        }
                    </div>
                </div>
            )
        })
    )
}

const SmallScreenSavePlaylists = () => {
    const { pathname } = useLocation();
    const { data: playlists } = useGetCurrentUserLibraryItems("Save Playlists");
    const { navigateToPlaylist } = usePlaylistActions();

    return (
        playlists.map((playlist: Playlist) => {
            const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

            return (
                <div
                    key={playlist._id}
                    className="flex justify-center group"
                    onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                >
                    <div
                        className={`p-2 ${isCurrentPlaylistPage ? "bg-[#242424]" : "dynamic-bg-hover"} rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer`}
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                    >
                        {
                            playlist.coverImageUrl ? (
                                <img
                                    src={playlist.coverImageUrl}
                                    alt={playlist.title}
                                    className="w-12 h-12 rounded-[4px] object-cover"
                                />
                            ) : (
                                <SmallScreenPlaylistPlaceHolder />
                            )
                        }
                    </div>
                </div>
            )
        })
    )
}

const SmallScreenSaveAlbums = () => {
    const { pathname } = useLocation();
    const { data: albums } = useGetCurrentUserLibraryItems("Save Albums");
    const { navigateToAlbum } = useAlbumActions();

    return (
        albums.map((album: Album) => {
            const isCurrentAlbumPage = pathname == `/album/${album._id}`;

            return (
                <div
                    key={album._id}
                    className="flex justify-center group"
                    onClick={() => navigateToAlbum(`/album/${album._id}`)}
                >
                    <div
                        className={`p-2 ${isCurrentAlbumPage ? "bg-[#242424]" : "dynamic-bg-hover"} rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer`}
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                    >
                        {
                            album.coverImageUrl ? (
                                <img
                                    src={album.coverImageUrl}
                                    alt={album.title}
                                    className="w-12 h-12 rounded-[4px] object-cover"
                                />
                            ) : (
                                <SmallScreenAlbumPlaceHolder />
                            )
                        }
                    </div>
                </div>
            )
        })
    )
}

const SmallScreenFolders = () => {
    const { data: folders } = useGetCurrentUserLibraryItems("Folders");
    const { navigateToFolder } = useFolderActions();

    return (
        folders.map((folder: Folder) => {
            return (
                <div
                    key={folder._id}
                    className="flex justify-center group"
                >
                    <div
                        className="p-2 dynamic-bg-hover rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer"
                        style={{
                            '--bgHoverColor': '#1F1F1F',
                        } as React.CSSProperties}
                        onClick={() => navigateToFolder({ id: folder._id, name: folder.name })}
                    >
                        {/* Folder Cover */}
                        <SmallScreenFolderPlaceHolder />
                    </div>
                </div>
            )
        })
    )
}

const FolderPlaylists = () => {
    const { pathname } = useLocation();

    const { openedFolder } = useUIPreferencesStore();
    const { id: openedFolderId } = openedFolder;

    const { data: playlists, isLoading } = useGetFolderPlaylists(openedFolderId);
    const { navigateToPlaylist } = usePlaylistActions();

    if (isLoading) return <SmallScreenLibraryPanelSkelton />;

    return (
        <div className="mb-4">
            {
                playlists.map((playlist: Playlist) => {
                    const isCurrentPlaylistPage = pathname == `/playlist/${playlist._id}`;

                    return (
                        <div
                            key={playlist._id}
                            className="flex justify-center group"
                            onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                        >
                            <div
                                className={`p-2 ${isCurrentPlaylistPage ? "bg-[#242424]" : "dynamic-bg-hover"} rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer`}
                                style={{
                                    '--bgHoverColor': '#1F1F1F',
                                } as React.CSSProperties}
                            >
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt={playlist.title}
                                            className="w-12 h-12 rounded-[4px] object-cover"
                                        />
                                    ) : (
                                        <SmallScreenPlaylistPlaceHolder />
                                    )
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const SmallScreenLibraryPanelComponents = {
    "Playlists": SmallScreenPlaylists,
    "Save Playlists": SmallScreenSavePlaylists,
    "Save Albums": SmallScreenSaveAlbums,
    "Folders": SmallScreenFolders
}

const SmallScreenLibraryPanel = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();
    const { pathname } = useLocation();

    /* ---------- Stores ---------- */
    const { library, openedFolder } = useUIPreferencesStore();
    const { activeTab: libraryActiveTab } = library;
    const { id: openedFolderId } = openedFolder;

    /* ---------- Custom Hooks ---------- */
    const { navigateToPlaylist } = usePlaylistActions();

    /* ---------- Derived Values ---------- */
    const Component = SmallScreenLibraryPanelComponents[libraryActiveTab];
    const isCollectionTracksPage = pathname == "/collection/tracks";

    if (openedFolderId) return <FolderPlaylists />;

    return (
        <div className="mb-4">
            <div
                className="flex justify-center group"
                onClick={() => navigateToPlaylist("/collection/tracks")}
            >
                <div
                    className={`p-2 ${isCollectionTracksPage ? "bg-[#242424]" : "dynamic-bg-hover"} rounded-[4px] transition-colors relative flex-shrink-0 cursor-pointer`}
                    style={{
                        '--bgHoverColor': '#1F1F1F',
                    } as React.CSSProperties}
                    onClick={() => navigate("/collection/tracks")}
                >
                    <img
                        src={"https://misc.scdn.co/liked-songs/liked-songs-300.jpg"}
                        alt={"Liked Songs"}
                        className="w-12 h-12 rounded-[4px] object-cover"
                    />
                </div>
            </div>

            <Component />

        </div>
    )
}

export default SmallScreenLibraryPanel