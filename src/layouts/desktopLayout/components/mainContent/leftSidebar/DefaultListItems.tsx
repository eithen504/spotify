import React, { useEffect, useState, type JSX } from 'react'
import { PauseIcon, PinIcon, PlayIcon } from '../../../../../Svgs';
import { usePlaylistStore } from '../../../../../store/usePlaylistStore';
import { useTrackDetailsStore } from '../../../../../store/useTrackDetailsStore';
import type { Album, Folder, Playlist } from '../../../../../types';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useAlbumStore } from '../../../../../store/useAlbumStore';
import { usePlaylistActions } from '../../../../../hooks/playlist';
import { useAlbumActions } from '../../../../../hooks/album';
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder';
import { VIEW_SKELETONS } from '../../../../../constants';
import { NotFoundFolderPlaylists } from '../../../../../components/NotFounds';
import { useLocation } from 'react-router-dom';
import { useLibrarySearchStore } from '../../../../../store/useLibrarySearchStore';
import { DefaultListAlbumPlaceHolder, DefaultListFolderPlaceHolder, DefaultListPlaylistPlaceHolder } from '../../../../../components/Placeholders';
import { highlightText } from '../../../../../hooks/text';

type LibraryItemListProps = {
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

const LibraryItemList: React.FC<LibraryItemListProps> = ({
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
            className={`flex items-center space-x-3 ${isCurrentItemPage ? "bg-[#242424]" : "dynamic-bg-hover"} p-2 rounded cursor-pointer group`}
            style={{
                '--bgHoverColor': '#1F1F1F',
            } as React.CSSProperties}
            onClick={navigateToItem}
        >
            {/* Item CoverImage */}
            <div className="w-12 h-12 rounded-[4px] overflow-hidden relative">
                {
                    itemCoverImageUrl ? (
                        <img
                            src={itemCoverImageUrl}
                            alt="New Music Friday India"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <DefaultItemPlaceHolder />
                    )
                }

                {/* Play Button */}
                {
                    !hidePlayIcon && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover-opacity transition-opacity">
                            <button className="flex items-center justify-center rounded-full text-white cursor-pointer"
                                title={isPlayingCurrentItem ? `Pause ${itemTitle}` : `Play ${itemTitle}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePlayPauseItem();
                                }}
                            >
                                {
                                    isPlayingCurrentItem ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                                }
                            </button>
                        </div>
                    )
                }
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-medium text-[#ffffff] truncate">
                    {highlightText(itemTitle, searchQuery)}
                </div>
                <div className="text-[#aaaaaa] truncate flex items-center gap-1">
                    {
                        isItemPinned && (
                            <div className="rotate-45 text-[#1ed760]">
                                <PinIcon width="14" height="14" />
                            </div>
                        )
                    }
                    <span className="truncate text-sm">{itemSubTitle}</span>
                </div>

            </div>
        </div>
    )
}

const DefaultListPlaylists = () => {
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
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultListPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const DefaultListSavePlaylists = () => {
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
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultListPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const DefaultListSaveAlbums = () => {
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
                    const isPlayingCurrentAlbum = (albumId == album._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const navigateUrl = `/album/${album._id}`;
                    const isCurrentAlbumPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={album._id}
                            itemTitle={album.title}
                            itemSubTitle="Album · Spotify"
                            itemCoverImageUrl={album.coverImageUrl}
                            isCurrentItemPage={isCurrentAlbumPage}
                            isPlayingCurrentItem={isPlayingCurrentAlbum}
                            DefaultItemPlaceHolder={DefaultListAlbumPlaceHolder}
                            navigateToItem={() => navigateToAlbum(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPauseAlbum(isPlayingCurrentAlbum, album._id, navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const DefaultListFolders = () => {
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
                        <LibraryItemList
                            key={folder._id}
                            itemTitle={folder.name}
                            itemSubTitle={`Folder · ${folder.playlists.length} ${folder.playlists.length === 1 ? "Playlist" : "Playlists"}`}
                            itemCoverImageUrl={""}
                            isCurrentItemPage={false}
                            isPlayingCurrentItem={false}
                            hidePlayIcon={true}
                            DefaultItemPlaceHolder={DefaultListFolderPlaceHolder}
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
    const { openedFolder } = useUIPreferencesStore();
    const { id: openedFolderId } = openedFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists, isLoading } = useGetFolderPlaylists(openedFolderId);
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    if (isLoading) return VIEW_SKELETONS["Default List"];

    if (playlists?.length == 0) return <NotFoundFolderPlaylists />;

    return (
        <div className="flex-1 px-3 mb-4">
            {
                searchResults?.map((playlist: Playlist) => {
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            itemCoverImageUrl={playlist.coverImageUrl}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            isPlayingCurrentItem={isPlayingCurrentPlaylist}
                            DefaultItemPlaceHolder={DefaultListPlaylistPlaceHolder}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                            handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)}
                        />
                    )
                })
            }
        </div>
    )
}

const DefaultListComponents = {
    "Playlists": DefaultListPlaylists,
    "Save Playlists": DefaultListSavePlaylists,
    "Save Albums": DefaultListSaveAlbums,
    "Folders": DefaultListFolders
}

const DefaultListItems = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Stores ---------- */
    const { library, openedFolder } = useUIPreferencesStore();
    const { activeTab: libraryActiveTab } = library;
    const { id: openedFolderId } = openedFolder;
    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { activeTrackId, playlistId } } = usePlaylistStore();

    /* ---------- Custom Hooks ---------- */
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    /* ---------- Constants ---------- */
    const id = "collectionTracks"

    /* ---------- Derived Values ---------- */
    const isPlayingCollectionTracks = (playlistId == id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
    const navigateUrl = "/collection/tracks";
    const isCollectionTracksPage = pathname == navigateUrl;
    const Component = DefaultListComponents[libraryActiveTab];

    if (openedFolderId) return <FolderPlaylists />;

    return (
        <div className="flex-1 px-3 mb-4">
            {/* Liked Tracks */}
            <LibraryItemList
                itemTitle="Liked Tracks"
                itemSubTitle="Playlist"
                itemCoverImageUrl="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
                isCurrentItemPage={isCollectionTracksPage}
                isPlayingCurrentItem={isPlayingCollectionTracks}
                isItemPinned={true}
                DefaultItemPlaceHolder={DefaultListPlaylistPlaceHolder}
                navigateToItem={() => navigateToPlaylist(navigateUrl)}
                handlePlayPauseItem={() => handlePlayPausePlaylist(isPlayingCollectionTracks, id, navigateUrl)}
            />

            <Component />
        </div>
    )
}

export default DefaultListItems