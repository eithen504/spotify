import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";
import { useBreakPoint } from "../../hooks/breakPoint";
import { BackArrowIcon, PauseIcon, PlayIcon } from "../../Svgs";
import { useGetGenrePlaylists, usePlaylistActions } from "../../hooks/playlist";
import type { GenreId, Playlist } from "../../types";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { useTrackDetailsStore } from "../../store/useTrackDetailsStore";
import { GENRES_MAP } from "../../constants";
import { useScrollStore } from "../../store/useScrollStore";
import { NotFoundEntity } from "../../components/NotFounds";
import { GenrePageSkeleton } from "../../components/Skeletons";

const GenrePage = () => {
    /* ---------- Internal Hooks ---------- */
    const navigate = useNavigate();
    const { id } = useParams();

    /* ---------- Stores ---------- */
    const { leftSidebar, rightSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { showNowPlayingView, showQueueView } = rightSidebar;
    const { playlistData: { playlistId, activeTrackId } } = usePlaylistStore();
    const { trackDetails } = useTrackDetailsStore();
    const { scrollFromTop } = useScrollStore();

    /* ---------- Custom Hooks ---------- */
    const { data: playlists, isLoading } = useGetGenrePlaylists(id || "")
    const { navigateToPlaylist, handlePlayPausePlaylist } = usePlaylistActions();
    const { breakPoint } = useBreakPoint();

    /* ---------- Constants ---------- */
    const genre = GENRES_MAP[id as GenreId];

    /* ---------- Methods Or Functions ---------- */
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

        const isRightPanelHidden = !showNowPlayingView && !showQueueView;

        if (leftPanelSize >= 7 && leftPanelSize <= 10) {
            return (isRightPanelHidden || breakPoint == "md") ? "grid-cols-6" : "grid-cols-5";
        }

        if (leftPanelSize >= 32 && leftPanelSize <= 38) {
            return (isRightPanelHidden || breakPoint == "md") ? "grid-cols-4" : "grid-cols-3";
        }

        return (isRightPanelHidden || breakPoint == "md") ? "grid-cols-5" : "grid-cols-4";
    };

    if (isLoading) return <GenrePageSkeleton />;

    if (!genre) return <NotFoundEntity title="Something went wrong." subtitle="Search for something else?" />

    return (
        <div className="relative text-white min-h-screen">
            <div
                className="w-full absolute inset-0 mt-47 md:mt-45 h-[700px] opacity-70"
                style={{
                    height: "250px",
                    backgroundImage: `linear-gradient(to bottom, ${genre.bgColor || "#3C3C3C"}, #121212)`,
                }}
            />

            <div style={{ background: genre.bgColor }}>
                <div className="relative p-4 md:p-6 max-w-[90rem] mx-auto gap-4 flex flex-col">
                    {/* Arrow Icon */}
                    <button
                        className="cursor-pointer block md:hidden"
                        onClick={() => navigate(-1)}
                    >
                        <BackArrowIcon width="30" height="30" />
                    </button>

                    <h1 className={`text-4xl ${leftPanelSize < 25 ? "md:text-7xl" : "md:text-6xl"} font-bold truncate mt-18`}>
                        {genre.title}
                    </h1>
                </div>
            </div>

            {/* header */}
            <div
                className="fixed md:hidden top-0 left-0 w-full z-50 py-3 px-4 md:py-5 md:px-6"
                style={{
                    background: genre.bgColor,
                    opacity: scrollFromTop / 250,
                }}
            >
                <button
                    className="cursor-pointer text-white"
                    onClick={() => navigate(-1)}
                >
                    <BackArrowIcon width="30" height="30" />
                </button>

                {/* Centered Title */}
                <h1 className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-xl font-bold">
                    {genre.title}
                </h1>
            </div>

            {/* ✅ Playlists Row */}
            <div className={`max-w-[90rem] mx-auto relative px-2 md:px-4 mt-7 md:mt-10 grid gap-y-6 md:gap-y-9 gap-x-2 ${getGridColsClass()}`}>
                {playlists?.map((playlist: Playlist) => {
                    const isPlayingCurrentPlaylist = (playlistId == playlist._id && activeTrackId == trackDetails._id && trackDetails.isPlaying)
                    const navigateUrl = `/playlist/${playlist._id}`;

                    return (
                        <div
                            key={playlist._id}
                            className="rounded-[4px] p-3 dynamic-bg-hover transition cursor-pointer group relative w-full"
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
                                    aria-label={`Play ${playlist.title}`}
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

            <Footer />
        </div>
    );
};

export default GenrePage;
