import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GENRES_ID_BGCOLOR_MAP, GENRES_ID_TITLE_MAP } from "../../constants";
import Footer from "../../components/Footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { useBreakPoint } from "../../hooks/breakPoint";
import { BackArrowIcon, PauseIcon, PlayIcon } from "../../Svgs";
import { useGetGenrePlaylists, usePlaylistActions } from "../../hooks/playlist";
import type { Playlist } from "../../types";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";

const GenrePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const bgColor = GENRES_ID_BGCOLOR_MAP[id || ""];
    const title = GENRES_ID_TITLE_MAP[id || ""];

    const { leftSidebar, rightSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { showNowPlayingView, showQueueView } = rightSidebar;

    const { breakPoint } = useBreakPoint();
    const { playlistData: { playlistId, activeTrackId } } = usePlaylistStore();

    const { trackDetails } = useTrackDetailsStore();

    const { data: playlists, isLoading } = useGetGenrePlaylists(id || "")
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();

    const getGridColsClass = () => {
        if (breakPoint == "sm") return "grid-cols-3";

        if (breakPoint == "md") {
            if (leftPanelSize >= 7 && leftPanelSize <= 10) {
                return "grid-cols-5";
            } else if (leftPanelSize >= 32 && leftPanelSize <= 38) {
                return "grid-cols-3";
            } else {
                return "grid-cols-4";
            }
        }

        const isRightPannelHidden = !showNowPlayingView && !showQueueView;

        if (leftPanelSize >= 7 && leftPanelSize <= 10) {
            return (isRightPannelHidden || breakPoint == "md") ? "grid-cols-6" : "grid-cols-5";
        }

        if (leftPanelSize >= 32 && leftPanelSize <= 38) {
            return (isRightPannelHidden || breakPoint == "md") ? "grid-cols-4" : "grid-cols-3";
        }

        return (isRightPannelHidden || breakPoint == "md") ? "grid-cols-5" : "grid-cols-4";
    };

    if (isLoading) return null;

    return (
        <div className="relative text-white min-h-screen">
            <div
                className="w-full absolute inset-0 mt-23 md:mt-29 h-[700px] opacity-70"
                style={{
                    height: "250px",
                    backgroundImage: `linear-gradient(to bottom, ${bgColor || "#3C3C3C"}, #121212)`,
                }}
            />

            <div style={{ background: bgColor }}>
                <div className="relative p-7 max-w-[90rem] mx-auto gap-4 flex">
                    <button
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <BackArrowIcon width="35" height="35" />
                    </button>
                    <h1 className="text-3xl md:text-6xl font-bold truncate">
                        {title}
                    </h1>
                </div>
            </div>

            {/* ✅ Playlists Row */}
            <div className="px-1 md:px-0">
                <div className={`max-w-[90rem] mx-auto relative px-3 md:px-6 mt-7 md:mt-10 grid gap-y-6 md:gap-y-9 gap-x-2 ${getGridColsClass()}`}>
                    {playlists?.map((playlist: Playlist) => {
                        const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                        const navigateUrl = `/playlist/${playlist._id}`;

                        return (
                            <div
                                key={playlist._id}
                                className="rounded-[4px] p-2 dynamic-bg-hover transition cursor-pointer group relative w-full"
                                style={{
                                    '--bgHoverColor': '#1C1C1C',
                                } as React.CSSProperties}
                                onClick={() => navigateToPlaylist(`/playlist/${playlist._id}`)}
                            >
                                <img
                                    src={playlist.coverImageUrl}
                                    alt={playlist.title}
                                    className="rounded-[4px] w-full aspect-square object-cover"
                                />
                                <div className="font-medium text-md mt-3 truncate">
                                    {playlist.title}
                                </div>
                                <div className="text-gray-400 text-sm mt-1 truncate">
                                    {`Spotify . ${playlist.tracks.length} tracks`}
                                </div>

                                <div className="absolute inset-0">
                                    <button
                                        className="p-4 text-black cursor-pointer rounded-full flex items-center justify-center group-hover-opacity transition-all duration-300 bg-[#1ed760] hover:bg-[#3BE477] backdrop-blur-sm absolute bottom-[80px] right-[20px]"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayPausePlaylist(isPlayingCurrentPlaylist, playlist._id, navigateUrl)
                                        }}
                                    // aria-label={`Play ${playlist.title}`}
                                    // onClick={(e) => handlePlayPauseButtonClick(
                                    //     e,
                                    //     isPlayingCurrentPlaylist,
                                    //     playlist._id,
                                    //     `/playlist/${playlist._id}`,
                                    //     playlist.coverImageUrl
                                    // )}
                                    >
                                        {
                                            isPlayingCurrentPlaylist ? <PauseIcon width="17" height="17" /> : <PlayIcon width="17" height="17" />
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default GenrePage;
