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

type LibraryItemGridProps = {
    itemId: string,
    itemTitle: string,
    subItemTitle: string,
    itemCoverImageUrl: string,
    isCurrentItemPage: boolean,
    isPlayingCurrentItem: boolean,
    DefaultItemPlaceHolder: () => JSX.Element,
    navigateToItem: () => void,
    handlePlayPauseItem: () => void,
}

const LibraryItemGrid: React.FC<LibraryItemGridProps> = ({
    itemId,
    itemTitle,
    subItemTitle,
    itemCoverImageUrl,
    isCurrentItemPage,
    isPlayingCurrentItem,
    DefaultItemPlaceHolder,
    navigateToItem,
    handlePlayPauseItem
}) => {
    const { searchQuery } = useLibrarySearchStore();

    return (
        <div
            key={itemId}
            className={`group p-3 ${isCurrentItemPage ? "bg-[#272727]" : "dynamic-bg-hover"} cursor-pointer rounded-[4px] flex flex-col overflow-hidden`}
            style={{
                '--bgHoverColor': '#191919',
            } as React.CSSProperties}
            onClick={navigateToItem}
        >
            {/* Item CoverImage */}
            <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                {
                    itemCoverImageUrl ? (
                        <img
                            src={itemCoverImageUrl}
                            alt={itemTitle}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    ) : (
                        <DefaultItemPlaceHolder />
                    )
                }

                {/* Play Button */}
                <div className="absolute bottom-2 right-2 transform opacity-0 group-hover-translate-y-0 group-hover-opacity transition-all duration-300 ease-in-out">
                    <button
                        className="text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-4 cursor-pointer transition-transform shadow-lg"
                        style={{
                            '--bgHoverColor': '#3BE477',
                        } as React.CSSProperties}
                        title={isPlayingCurrentItem ? `Pause ${itemTitle}` : `Play ${itemTitle}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePlayPauseItem();
                        }}
                    >
                        {
                            isPlayingCurrentItem ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                        }
                    </button>
                </div>
            </div>

            {/* Item Info Section */}
            <div className="w-full mt-2 text-left">
                <p className="text-md font-medium truncate">{highlightText(itemTitle, searchQuery)}</p>
                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                    <p>{subItemTitle}</p>
                </div>
            </div>
        </div>
    )
}

const DefaultGridPlaylists = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Playlist[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    /* ---------- UseEffects ---------- */
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
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying);
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemGrid
                            itemId={playlist._id}
                            itemTitle={playlist.title}
                            subItemTitle={`Total Tracks : ${playlist.tracks.length}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultGridItemsPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const DefaultGridSavePlaylists = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Playlist[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists } = useGetCurrentUserLibraryItems("Save Playlists");
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    /* ---------- UseEffects ---------- */
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
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying);
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemGrid
                            itemId={playlist._id}
                            itemTitle={playlist.title}
                            subItemTitle={`Total Tracks : ${playlist.tracks.length}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultGridItemsPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const DefaultGridSaveAlbums = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Album[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();
    const { trackDetails } = useTrackDetailsStore();
    const { albumData: { activeTrackId, albumId } } = useAlbumStore();

    /* ---------- Custom Hooks ---------- */
    const { data: albums } = useGetCurrentUserLibraryItems("Save Albums");
    const { navigateToAlbum, handlePlayPauseAlbum } = useAlbumActions();

    /* ---------- UseEffects ---------- */
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
                    const isPlayingCurrentAlbum = (albumId == album._id && activeTrackId == trackDetails._id && trackDetails.isPlaying);
                    const navigateUrl = `/album/${album._id}`;
                    const isCurrentAlbumPage = pathname == navigateUrl;

                    return (
                        <LibraryItemGrid
                            itemId={album._id}
                            itemTitle={album.title}
                            subItemTitle="Album . Spotify"
                            itemCoverImageUrl={album.coverImageUrl}
                            isCurrentItemPage={isCurrentAlbumPage}
                            isPlayingCurrentItem={isPlayingCurrentAlbum}
                            DefaultItemPlaceHolder={DefaultGridItemsAlbumPlaceHolder}
                            navigateToItem={() => navigateToAlbum(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPauseAlbum(isPlayingCurrentAlbum, album._id, navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const DefaultGridFolders = () => {
    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Folder[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();

    /* ---------- Custom Hooks ---------- */
    const { data: folders } = useGetCurrentUserLibraryItems("Folders");
    const { navigateToFolder } = useFolderActions();

    /* ---------- UseEffects ---------- */
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
                            onClick={() => navigateToFolder({ id: folder._id, name: folder.name })}
                        >
                            {/* Folder Cover */}
                            <DefaultGridItemsFolderPlaceHolder />

                            {/* Folder Info Section */}
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
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Playlist[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();
    const { preferences } = useUIPreferencesStore();
    const { leftSidebar, activeFolder } = preferences;
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;
    const { id: activeFolderId } = activeFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists, isLoading } = useGetFolderPlaylists(activeFolderId);
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();
    const { breakPoint } = useBreakPoint();

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    if (isLoading) return VIEW_SKELETONS["Default Grid"];

    if (playlists?.length == 0) return <NotFoundFolderPlaylists />;

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakPoint === "md"
                    ? "grid-layout"
                    : (leftPanelSize <= 28 && breakPoint != "sm")
                        ? "grid-layout"
                        : "custom-grid-layout"
                } px-3 mb-4`}
        >

            {
                searchResults?.map((playlist: Playlist) => {
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemGrid
                            itemId={playlist._id}
                            itemTitle={playlist.title}
                            subItemTitle={`Total Tracks : ${playlist.tracks.length}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultGridItemsPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
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
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Stores ---------- */
    const { preferences } = useUIPreferencesStore();
    const { leftSidebar, library, activeFolder } = preferences;
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;
    const { activeTab: libraryActiveTab } = library;
    const { id: activeFolderId } = activeFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();
    const { breakPoint } = useBreakPoint();

    /* ---------- Constants ---------- */
    const id = "collectionTracks";

    /* ---------- Derived Values ---------- */
    const isCollectionTracksPage = pathname == "/collection/tracks";
    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying);
    const Component = DefaultGridComponents[libraryActiveTab];

    if (activeFolderId) return <FolderPlaylists />;

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakPoint === "md"
                    ? "grid-layout"
                    : (leftPanelSize <= 28 && breakPoint != "sm")
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
                {/* Collection Track CoverImage */}
                <div className="relative w-full aspect-square rounded-[4px] overflow-hidden">
                    <img
                        src="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                        alt="Liked Songs"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* Play Button */}
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

                {/* Collection Track Info Section */}
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