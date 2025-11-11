import type React from "react";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";
import { PauseIcon, PlayIcon } from "../../../Svgs";
import type { Playlist } from "../../../types";
import { usePlaylistStore } from "../../../store/usePlaylistStore";
import { useTrackDetailsStore } from "../../../store/useTrackDetailsStore";
import { usePlaylistActions } from "../../../hooks/playlist";
import { RecentPlaylistPlaceHolder } from "../../../components/Placeholders";

interface RecentItemsProps {
    playlists: Playlist[];
    setPlaylistCoverImageUrl: React.Dispatch<React.SetStateAction<string>>
}

const RecentItems: React.FC<RecentItemsProps> = ({ playlists, setPlaylistCoverImageUrl }) => {
    const { preferences } = useUIPreferencesStore();
    const { leftSidebar } = preferences;
    const { panelSize: leftPanelSize } = leftSidebar;

    const { trackDetails } = useTrackDetailsStore();
    const { playlistData: { playlistId, activeTrackId } } = usePlaylistStore();
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    return (
        <div className="pt-18 md:pt-2 px-4 md:px-10 max-w-[90rem] mx-auto">
            <div className={`grid grid-cols-2 ${leftPanelSize <= 28 ? "md:grid-cols-4" : "md:grid-cols-2"} gap-2`}>
                {playlists?.map((playlist) => {
                    if (!playlist) return null;

                    const collectionId = "collectionTracks";
                    const collectionUrl = "/collection/tracks";
                    const playlistUrl = `/playlist/${playlist._id}`;
                    const navigateUrl = collectionId == playlist._id ? collectionUrl : playlistUrl;
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    return (
                        <div
                            key={playlist._id}
                            className="relative bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-[4px] overflow-hidden transition-colors cursor-pointer group"
                            onMouseEnter={() => setPlaylistCoverImageUrl(playlist.coverImageUrl)}
                            onTouchStart={() => setPlaylistCoverImageUrl(playlist.coverImageUrl)}
                            onClick={() => navigateToPlaylist(navigateUrl)}
                        >
                            <div className="flex items-center">
                                {
                                    playlist.coverImageUrl ? (
                                        <img
                                            src={playlist.coverImageUrl}
                                            alt={playlist.title}
                                            className="w-12 h-12 object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <RecentPlaylistPlaceHolder />
                                    )
                                }
                                <div className="p-2 flex-1 min-w-0">
                                    <h3 className="text-[#ffffff] font-semibold text-sm leading-tight truncate pr-0">
                                        {playlist.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Play button shown on hover */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 group-hover-opacity transition-opacity cursor-pointer">
                                <button className="bg-[#1ed760] hover:bg-[#3BE477] text-black rounded-full p-2.5 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)
                                    }}
                                >
                                    {
                                        isPlayingCurrentPlaylist ? <PauseIcon width="15" height="15" /> : <PlayIcon width="15" height="15" />
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentItems