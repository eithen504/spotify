import type React from "react"
import { Slider } from "../../../../components/ui/slider"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { ExitScreenIcon, FullScreenIcon, MiniPlayerIcon, NowPlayingIcon, QueueIcon } from "../../../../Svgs"
import MiniPlayerWindow from "./MiniPlayerWindow"
import { getVolumeIcon } from "../../../../utils"

interface RightSideControlsProps {
    progress: number[];
    currentTime: number;
    handleProgressChange: (value: number[]) => void;
    handleVolumeChange: (value: number[]) => void;
}

const RightSideControls: React.FC<RightSideControlsProps> = ({ progress, currentTime, handleProgressChange, handleVolumeChange }) => {
    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { rightSidebar, isMiniPlayerWindowOpen, systemVolume } = preferences;
    const { showNowPlayingView, showQueueView, isNowPlayingViewFullScreen } = rightSidebar;

    /* ---------- Derived Values ---------- */
    const suggestedVolumeIcon = getVolumeIcon(systemVolume[0]);

    /* ---------- Methods Or Functions ---------- */
    const handleToggleNowPlayingView = () => {
        if (showNowPlayingView) {
            const updatedRightSidebar = { ...rightSidebar, showNowPlayingView: false };
            const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
            setPreferences({ rightSidebar: updatedRightSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        } else {
            const updatedRightSidebar = { ...rightSidebar, showNowPlayingView: true, showQueueView: false };
            const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
            setPreferences({ rightSidebar: updatedRightSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }
    }

    const handleToggleQueueView = () => {
        if (showQueueView) {
            const updatedRightSidebar = { ...rightSidebar, showQueueView: false };
            const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
            setPreferences({ rightSidebar: updatedRightSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        } else {
            const updatedRightSidebar = { ...rightSidebar, showQueueView: true, showNowPlayingView: false };
            setPreferences({ rightSidebar: updatedRightSidebar });
            const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }
    }

    const handleToggleFullscreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                console.error(`Error enabling full-screen mode: ${err.message}`);
            });
            const updatedRightSidebar = { ...rightSidebar, isNowPlayingViewExpanded: true, isNowPlayingViewFullScreen: true };
            const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
            setPreferences({ rightSidebar: updatedRightSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        } else {
            document.exitFullscreen();
            const updatedRightSidebar = { ...rightSidebar, isNowPlayingViewExpanded: false, isNowPlayingViewFullScreen: false };
            const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
            setPreferences({ rightSidebar: updatedRightSidebar });
            localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
        }
    };

    return (
        <>
            <div className="flex items-center space-x-4 text-[#b3b3b3] w-1/4 justify-end">
                {/* NowPlaying Icon */}
                <button
                    className={`${trackDetails._id ? (showNowPlayingView ? "text-[#3BE477]" : "dynamic-text-hover") + " cursor-pointer" : "cursor-not-allowed"} hidden lg:block`}
                    title={trackDetails._id ? (showNowPlayingView ? "Hide Now Playing View" : "Show Now Playing View") : ""}
                    onClick={handleToggleNowPlayingView}
                    disabled={!trackDetails._id}
                >
                    <NowPlayingIcon width="16" height="16" />
                </button>

                {/* Queue Icon */}
                <button
                    className={`${trackDetails._id ? (showQueueView ? "text-[#3BE477]" : "dynamic-text-hover") + " cursor-pointer" : "cursor-not-allowed"} hidden lg:block`}
                    title={trackDetails._id ? (showQueueView ? "Hide Queue View" : "Open Queue View") : ""}
                    onClick={handleToggleQueueView}
                    disabled={!trackDetails._id}
                >
                    <QueueIcon width="16" height="16" />
                </button>

                {/* Volume Icon and Slider */}
                <button className={`${trackDetails._id ? "dynamic-text-hover cursor-pointer" : "cursor-not-allowed"}`}>
                    {suggestedVolumeIcon({ width: "16", height: "16" })}
                </button>

                <div className="w-20 h-1 rounded-full">
                    <Slider
                        defaultValue={[0]}
                        value={systemVolume}
                        onValueChange={handleVolumeChange}
                        className={`${trackDetails._id ? "cursor-grab" : "cursor-not-allowed"} w-full`}
                    />
                </div>

                {/* miniPlyer Icon */}
                <button
                    className={`${trackDetails._id ? (isMiniPlayerWindowOpen ? "text-[#3BE477]" : "dynamic-text-hover") + " cursor-pointer" : "cursor-not-allowed"}`}
                    title={`${trackDetails._id ? (isMiniPlayerWindowOpen ? "Close MiniPlayer" : "Open MiniPlayer") : ""}`}
                    onClick={() => setPreferences({ isMiniPlayerWindowOpen: !isMiniPlayerWindowOpen })}
                    disabled={!trackDetails._id}
                >
                    <MiniPlayerIcon width="16" height="16" />
                </button>

                {/* Fullscreen Icon */}
                <button
                    className={`${trackDetails._id ? "dynamic-text-hover cursor-pointer" : "cursor-not-allowed"}`}
                    onClick={handleToggleFullscreen}
                    title={trackDetails._id ? (isNowPlayingViewFullScreen ? "Exit Full Screen" : "Enter Full Screen") : ""}
                    disabled={!trackDetails._id}
                >
                    {
                        isNowPlayingViewFullScreen ? (
                            <ExitScreenIcon width="16" height="16" />
                        ) : (
                            <FullScreenIcon width="16" height="16" />
                        )
                    }
                </button>
            </div>
            {
                isMiniPlayerWindowOpen &&
                <MiniPlayerWindow
                    progress={progress}
                    currentTime={currentTime}
                    onClose={() => setPreferences({ isMiniPlayerWindowOpen: false })}
                    handleProgressChange={handleProgressChange}
                />
            }
        </>
    )
}

export default RightSideControls