import React, { useEffect, useState } from 'react'
import { PinIcon } from '../../../../../Svgs';
import { useLocation } from 'react-router-dom';
import type { Album, Folder, Playlist } from '../../../../../types';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { useGetCurrentUserLibraryItems } from '../../../../../hooks/library';
import { useAlbumActions } from '../../../../../hooks/album';
import { usePlaylistActions } from '../../../../../hooks/playlist';
import { useFolderActions, useGetFolderPlaylists } from '../../../../../hooks/folder';
import { VIEW_SKELETONS } from '../../../../../constants';
import { NotFoundFolderPlaylists } from '../../../../../components/NotFounds';
import { useLibrarySearchStore } from '../../../../../store/useLibrarySearchStore';
import { highlightText } from '../../../../../hooks/text';

type LibraryItemListProps = {
    itemTitle: string,
    itemSubTitle: string,
    isCurrentItemPage: boolean,
    isItemPinned?: boolean,
    navigateToItem: () => void,
}

const LibraryItemList: React.FC<LibraryItemListProps> = ({
    itemTitle,
    itemSubTitle,
    isCurrentItemPage,
    isItemPinned,
    navigateToItem,
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

const CompactListPlaylists = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Playlist[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists } = useGetCurrentUserLibraryItems("Playlists");
    const { navigateToPlaylist } = usePlaylistActions();

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
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const CompactListSavePlaylists = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Playlist[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists } = useGetCurrentUserLibraryItems("Save Playlists");
    const { navigateToPlaylist } = usePlaylistActions();

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
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const CompactListSaveAlbums = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Local States ---------- */
    const [searchResults, setSearchResults] = useState<Playlist[]>([]);

    /* ---------- Stores ---------- */
    const { searchQuery } = useLibrarySearchStore();
    const { navigateToAlbum } = useAlbumActions();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists } = useGetCurrentUserLibraryItems("Save Albums");

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
                searchResults.map((album: Album) => {
                    const navigateUrl = `/album/${album._id}`
                    const isCurrentAlbumPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={album._id}
                            itemTitle={album.title}
                            itemSubTitle="Album · Spotify"
                            isCurrentItemPage={isCurrentAlbumPage}
                            navigateToItem={() => navigateToAlbum(navigateUrl)}
                        />
                    )
                })
            }
        </>
    )
}

const CompactListFolders = () => {
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
                searchResults.map((folder: Folder) => (
                    <LibraryItemList
                        key={folder._id}
                        itemTitle={folder.name}
                        itemSubTitle={`Folder · ${folder.playlists.length} ${folder.playlists.length === 1 ? "Playlist" : "Playlists"}`}
                        isCurrentItemPage={false}
                        navigateToItem={() => navigateToFolder({ id: folder._id, name: folder.name })}
                    />
                ))
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

    /* ---------- Custom Hooks ---------- */
    const { data: playlists, isLoading } = useGetFolderPlaylists(openedFolderId);
    const { navigateToPlaylist } = usePlaylistActions();

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        const filteredPlaylists = playlists?.filter((p: Playlist) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResults(filteredPlaylists || []);
    }, [searchQuery, playlists])

    if (isLoading) return VIEW_SKELETONS["Compact List"];

    if (playlists?.length == 0) return <NotFoundFolderPlaylists />;

    return (
        <div className="flex-1 px-3 mb-4">
            {
                searchResults?.map((playlist: Playlist) => {
                    const navigateUrl = `/playlist/${playlist._id}`;
                    const isCurrentPlaylistPage = pathname == navigateUrl;

                    return (
                        <LibraryItemList
                            key={playlist._id}
                            itemTitle={playlist.title}
                            itemSubTitle={`Playlist · ${playlist.tracks.length} ${playlist.tracks.length === 1 ? "Track" : "Tracks"}`}
                            isCurrentItemPage={isCurrentPlaylistPage}
                            navigateToItem={() => navigateToPlaylist(navigateUrl)}
                        />
                    )
                })
            }
        </div>
    )
}

const CompactListComponents = {
    "Playlists": CompactListPlaylists,
    "Save Playlists": CompactListSavePlaylists,
    "Save Albums": CompactListSaveAlbums,
    "Folders": CompactListFolders
}

const CompactListItems = () => {
    /* ---------- Internal Hooks ---------- */
    const { pathname } = useLocation();

    /* ---------- Stores ---------- */
    const { library, openedFolder } = useUIPreferencesStore();
    const { activeTab: libraryActiveTab } = library;
    const { id: openedFolderId } = openedFolder;

    /* ---------- Custom Hooks ---------- */
    const { navigateToPlaylist } = usePlaylistActions();

    /* ---------- Derived Values ---------- */
    const navigateUrl = "/collection/tracks";
    const isCollectionTracksPage = pathname == navigateUrl;
    const Component = CompactListComponents[libraryActiveTab];

    if (openedFolderId) return <FolderPlaylists />;

    return (
        <div className="flex-1 px-3 mb-4">
            {/* Liked Tracks */}
            <LibraryItemList
                itemTitle="Liked Tracks"
                itemSubTitle="Playlist"
                isCurrentItemPage={isCollectionTracksPage}
                isItemPinned={true}
                navigateToItem={() => navigateToPlaylist(navigateUrl)}
            />

            <Component />
        </div>
    )
}

export default CompactListItems