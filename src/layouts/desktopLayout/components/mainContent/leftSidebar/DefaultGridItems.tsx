import React, { useEffect, useState, type JSX } from 'react'
import { PauseIcon, PinIcon, PlayIcon } from '../../../../../Svgs'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore'
import { useBreakPoint } from '../../../../../hooks/breakPoint';
import { usePlaylistStore } from '../../../../../store/usePlaylistStore';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';
import type { Album, Folder, Playlist } from '../../../../../types';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useAlbumStore } from '../../../../../store/useAlbumStore';
import { usePlaylistActions } from '../../../../../hooks/playlist';
import { useAlbumActions } from '../../../../../hooks/album';
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder';
import { VIEW_SKELETONS } from '../../../../../constants';
import { DefaultGridAlbumPlaceHolder, DefaultGridFolderPlaceHolder, DefaultGridPlaylistPlaceHolder } from '../../../../../components/Placeholders';
import { NotFoundFolderPlaylists } from '../../../../../components/NotFounds';
import { useLocation } from 'react-router-dom';
import { useLibrarySearchStore } from '../../../../../store/useLibrarySearchStore';
import { highlightText } from '../../../../../hooks/text';

type LibraryItemGridProps = {
    itemTitle: string,
    itemSubTitle: string,
    itemCoverImageUrl: string,
    isCurrentItemPage: boolean,
    isPlayingCurrentItem: boolean,
    hidePlayIcon?: boolean,
    isItemPinned?: boolean,
    DefaultItemPlaceHolder: () => JSX.Element,
    navigateToItem: () => void,
    handlePlayPauseItem: () => void,
}

const LibraryItemGrid: React.FC<LibraryItemGridProps> = ({
    itemTitle,
    itemSubTitle,
    itemCoverImageUrl,
    isCurrentItemPage,
    isPlayingCurrentItem,
    hidePlayIcon,
    isItemPinned,
    DefaultItemPlaceHolder,
    navigateToItem,
    handlePlayPauseItem
}) => {
    const { searchQuery } = useLibrarySearchStore();

    return (
        <div
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
                {
                    !hidePlayIcon && (
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
                    )
                }
            </div>

            {/* Item Info Section */}
            <div className="w-full mt-2 text-left">
                <p className="text-md font-medium truncate">{highlightText(itemTitle, searchQuery)}</p>
                <div className="flex items-center gap-1 text-gray-400 truncate text-sm">
                    {
                        isItemPinned && (
                            <div className="rotate-45 text-[#1ed760]">
                                <PinIcon width="14" height="14" />
                            </div>
                        )
                    }
                    <p>{itemSubTitle}</p>
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
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultGridPlaylistPlaceHolder}
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
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultGridPlaylistPlaceHolder}
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
                            key={album._id}
                            itemTitle={album.title}
                            itemSubTitle="Album · Spotify"
                            itemCoverImageUrl={album.coverImageUrl}
                            isCurrentItemPage={isCurrentAlbumPage}
                            isPlayingCurrentItem={isPlayingCurrentAlbum}
                            DefaultItemPlaceHolder={DefaultGridAlbumPlaceHolder}
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
                        <LibraryItemGrid
                            key={folder._id}
                            itemTitle={folder.name}
                            itemSubTitle={`Folder · ${folder.playlists.length} ${folder.playlists.length === 1 ? "Playlist" : "Playlists"}`}
                            itemCoverImageUrl={""}
                            isCurrentItemPage={false}
                            isPlayingCurrentItem={false}
                            hidePlayIcon={true}
                            DefaultItemPlaceHolder={DefaultGridFolderPlaceHolder}
                            navigateToItem={() => navigateToFolder({ id: folder._id, name: folder.name })}
                            handlePlayPauseItem={() => { }}
                        />
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
    const { leftSidebar, openedFolder } = useUIPreferencesStore();
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;
    const { id: openedFolderId } = openedFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists, isLoading } = useGetFolderPlaylists(openedFolderId);
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
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultGridPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
                    )
                })
            }
        </div>
    )
}

const DefaultGridComponents = {
    "Playlists": DefaultGridPlaylists,
    "Save Playlists": DefaultGridSavePlaylists,
    "Save Albums": DefaultGridSaveAlbums,
    "Folders": DefaultGridFolders
}

const DefaultGridItems = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Stores ---------- */
    const { leftSidebar, library, openedFolder } = useUIPreferencesStore();
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;
    const { activeTab: libraryActiveTab } = library;
    const { id: openedFolderId } = openedFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();
    const { breakPoint } = useBreakPoint();

    /* ---------- Constants ---------- */
    const id = "collectionTracks";

    /* ---------- Derived Values ---------- */
    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying);
    const navigateUrl = "/collection/tracks";
    const isCollectionTracksPage = pathname == navigateUrl;
    const Component = DefaultGridComponents[libraryActiveTab];

    if (openedFolderId) return <FolderPlaylists />;

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
            {/* Liked Tracks */}
            <LibraryItemGrid
                itemTitle="Liked Tracks"
                itemSubTitle="Playlist"
                itemCoverImageUrl="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                isCurrentItemPage={isCollectionTracksPage}
                isPlayingCurrentItem={isPlayingCollectionTracks}
                isItemPinned={true}
                DefaultItemPlaceHolder={DefaultGridPlaylistPlaceHolder}
                navigateToItem={() => navigateToPlaylist(navigateUrl)}
                handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCollectionTracks, id, navigateUrl)}
            />

            <Component />
        </div>
    )
};

export default DefaultGridItems