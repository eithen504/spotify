import type { JSX } from "react"
import type React from "react"
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import { AlbumIcon, EditIcon, FolderIcon, MusicIcon, PlaylistIcon } from "../Svgs";

interface EntityCoverPlaceholderProps {
    placeholderIcon?: JSX.Element
    isOwnEntity?: boolean
}

const EntityCoverPlaceholder: React.FC<EntityCoverPlaceholderProps> = ({ placeholderIcon, isOwnEntity }) => {
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;

    return (
        <div
            className={`group flex items-center justify-center w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                ? "md:w-52 md:h-52"
                : leftPanelSize >= 32 && leftPanelSize <= 38
                    ? "md:w-35 md:h-35"
                    : "md:w-40 md:h-40"
                } ${isOwnEntity ? "cursor-pointer" : ""} shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-[4px] bg-[#282828] text-[#7F7F7F]`}
        >
            {
                isOwnEntity ? (
                    <>
                        <span className="group-hover-hidden">
                            {placeholderIcon}
                        </span>
                        <div className="group-hover-flex text-[#ffffff] flex-col items-center justify-center">
                            <EditIcon width="50" height="50" />
                            <h1 className="text-[#d1d5dc] dynamic-text-hover">Choose Photo</h1>
                        </div>
                    </>
                ) : (
                    <span>
                        {placeholderIcon}
                    </span>
                )
            }
        </div>
    )
}

const ExpandedViewMusicPlaceholder = () => {
    return (
        <div className="track-art-size">
            <div className="w-full h-full object-cover rounded-xl bg-[#282828] overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.4)] flex items-center justify-center">
                <MusicIcon width="90" height="90" />
            </div>
        </div>
    )
}

const EntityTrackMusicPlaceholder = () => {
    return (
        <div
            className="w-[50px] h-[50px] md:w-[42px] md:h-[42px] flex items-center justify-center rounded-[4px] flex-shrink-0 bg-[#282828]"
        >
            <MusicIcon width="20" height="20" />
        </div>
    )
}

interface NowPlayingViewMusicPlaceholderProps {
    shouldShowPlaceholderIcon: boolean
}

const NowPlayingViewMusicPlaceholder: React.FC<NowPlayingViewMusicPlaceholderProps> = ({ shouldShowPlaceholderIcon }) => {
    return (
        <div
            className="rounded-[4px] w-full aspect-square bg-[#282828] flex items-center justify-center"
        >
            {
                shouldShowPlaceholderIcon && <MusicIcon width="100" height="100" />
            }
        </div>
    )
}

interface PlaybackMusicPlaceholderProps {
    shouldShowPlaceholderIcon: boolean
}

const PlaybackMusicPlaceholder: React.FC<PlaybackMusicPlaceholderProps> = ({ shouldShowPlaceholderIcon }) => {
    return (
        <div className="w-14 h-14 min-w-[56px] min-h-[56px] flex-shrink-0 rounded-[4px] object-cover transition-opacity bg-[#282828] text-[#ffffff] flex items-center justify-center">
            {
                shouldShowPlaceholderIcon && <MusicIcon width="28" height="28" />
            }
        </div>
    )
}

const PlaylistSectionItemPlaceholder = () => {
    return (
        <div
            className="w-full aspect-square rounded-[4px] transition-opacity duration-300 object-cover flex items-center justify-center bg-[#282828] text-[#7F7F7F]"
        >
            <PlaylistIcon width="55" height="55" />
        </div>
    )
}

const MobileMiniPlayerMusicPlaceholder = () => {
    return (
        <div className="w-10 h-10 min-w-[43px] min-h-[43px] flex-shrink-0 rounded-[4px] object-cover transition-opacity bg-[#282828] text-[#ffffff] flex items-center justify-center">
            <MusicIcon width="20" height="20" />
        </div>
    )
}

const NowPlayingMusicPlaceholder = () => {
    return (
        <div className="w-full h-full object-cover bg-[#282828] text-[#ffffff] flex items-center justify-center">
            <MusicIcon width="100" height="100" />
        </div>
    )
}

interface PreviewEntityDialogMusicPlaceHolderProps {
    reduceIconSize?: boolean
}

const PreviewEntityDialogMusicPlaceHolder: React.FC<PreviewEntityDialogMusicPlaceHolderProps> = ({ reduceIconSize }) => {
    return (
        <div className="bg-[#282828] text-[#8f8f8f] object-cover w-full h-full rounded-md flex justify-center items-center">
            {
                reduceIconSize ? <MusicIcon width="25" height="25" /> : <MusicIcon width="80" height="80" />
            }
        </div>
    )
}

const DefaultListPlaylistPlaceHolder = () => {
    return (
        <div className="w-full h-full object-cover bg-[#282828] flex items-center justify-center">
            <PlaylistIcon />
        </div>
    )
}

const DefaultListAlbumPlaceHolder = () => {
    return (
        <div className="w-full h-full object-cover bg-[#282828] flex items-center justify-center">
            <AlbumIcon />
        </div>
    )
}

const DefaultListFolderPlaceHolder = () => {
    return (
        <div className="w-full h-full object-cover bg-[#282828] flex items-center justify-center">
            <FolderIcon />
        </div>
    )
}


const CompactGridPlaylistPlaceHolder = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#333333] flex items-center justify-center">
            <PlaylistIcon width="50" height="50" />
        </div>
    )
}

const CompactGridAlbumPlaceHolder = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#333333] flex items-center justify-center">
            <AlbumIcon width="50" height="50" />
        </div>
    )
}

const CompactGridFolderPlaceHolder = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#333333] flex items-center justify-center">
            <FolderIcon width="50" height="50" />
        </div>
    )
}


const DefaultGridPlaylistPlaceHolder = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#333333] flex items-center justify-center">
            <PlaylistIcon width="50" height="50" />
        </div>
    )
}

const DefaultGridAlbumPlaceHolder = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#333333] flex items-center justify-center">
            <AlbumIcon width="50" height="50" />
        </div>
    )
}

const DefaultGridFolderPlaceHolder = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#333333] flex items-center justify-center">
            <FolderIcon width="50" height="50" />
        </div>
    )
}


const SmallScreenPlaylistPlaceHolder = () => {
    return (
        <div className="w-12 h-12 rounded-[4px] object-cover bg-[#282828] flex items-center justify-center">
            <PlaylistIcon />
        </div>
    )
}

const SmallScreenAlbumPlaceHolder = () => {
    return (
        <div className="w-12 h-12 rounded-[4px] object-cover bg-[#282828] flex items-center justify-center">
            <AlbumIcon />
        </div>
    )
}

const SmallScreenFolderPlaceHolder = () => {
    return (
        <div className="w-12 h-12 rounded-[4px] object-cover bg-[#282828] flex items-center justify-center">
            <FolderIcon />
        </div>
    )
}

const QueueViewMusicPlaceHolder = () => {
    return (
        <div className="w-12 h-12 flex-shrink-0 object-cover rounded-[4px] bg-[#282828] flex items-center justify-center">
            <MusicIcon />
        </div>
    )
}

const RecentPlaylistPlaceHolder = () => {
    return (
        <div className="w-12 h-12 object-cover bg-[#282828] flex items-center justify-center">
            <PlaylistIcon />
        </div>
    )
}

export {
    EntityCoverPlaceholder,
    ExpandedViewMusicPlaceholder,
    EntityTrackMusicPlaceholder,
    NowPlayingViewMusicPlaceholder,
    PlaybackMusicPlaceholder,
    PlaylistSectionItemPlaceholder,
    MobileMiniPlayerMusicPlaceholder,
    NowPlayingMusicPlaceholder,
    PreviewEntityDialogMusicPlaceHolder,
    DefaultListPlaylistPlaceHolder,
    DefaultListAlbumPlaceHolder,
    DefaultListFolderPlaceHolder,
    DefaultGridPlaylistPlaceHolder,
    DefaultGridAlbumPlaceHolder,
    DefaultGridFolderPlaceHolder,
    CompactGridPlaylistPlaceHolder,
    CompactGridAlbumPlaceHolder,
    CompactGridFolderPlaceHolder,
    SmallScreenPlaylistPlaceHolder,
    SmallScreenAlbumPlaceHolder,
    SmallScreenFolderPlaceHolder,
    QueueViewMusicPlaceHolder,
    RecentPlaylistPlaceHolder
}