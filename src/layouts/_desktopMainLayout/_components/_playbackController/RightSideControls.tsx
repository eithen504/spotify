import { Slider } from "../../../../components/ui/slider"
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { ExitScreenIcon, FullScreenIcon, HighVolumeIcon, MiniPlayerIcon, NowPlayingIcon, QueueIcon } from "../../../../Svgs"
import MiniPlayerWindow from "./MiniPlayerWindow"

const RightSideControls = () => {
    const { preferences: { showNowPlayingView, isNowPlayingViewFullScreen, isMiniPlayerWindowOpen }, setPreferences } = useUIPreferencesStore()

    const handleToggleNowPlayingView = () => {
        if (showNowPlayingView) {
            setPreferences({ showNowPlayingView: false })
            localStorage.setItem("showNowPlayingView", "false")
        } else {
            setPreferences({ showNowPlayingView: true })
            localStorage.setItem("showNowPlayingView", "true")
        }
    }

    const handleToggleFullscreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                console.error(`Error enabling full-screen mode: ${err.message}`);
            });
            setPreferences({ isNowPlayingViewExpanded: true, isNowPlayingViewFullScreen: true })
        } else {
            document.exitFullscreen();
            setPreferences({ isNowPlayingViewExpanded: false, isNowPlayingViewFullScreen: false })
        }
    };

    return (
        <>
            <div className="flex items-center space-x-4 text-[#b3b3b3] w-1/4 justify-end">
                {/* NowPlaying Icon */}
                <button className={`${showNowPlayingView ? "text-[#1CC558]" : "dynamic-text-hover"} hidden lg:block cursor-pointer`}
                    onClick={handleToggleNowPlayingView}
                >
                    <NowPlayingIcon width="16" height="16" />
                </button>

                {/* Queue Icon */}
                <button className={`hidden lg:block dynamic-text-hover cursor-pointer`}
                >
                    <QueueIcon width="16" height="16" />
                </button>

                {/* Volume Icon and Slider */}
                <button className="dynamic-text-hover cursor-pointer">
                    <HighVolumeIcon width="16" height="16" />
                </button>

                <div className="w-20 h-1 rounded-full">
                    <Slider
                        defaultValue={[0]}
                        // value={systemVolume}
                        // onValueChange={handleVolumeChange}
                        className={`cursor-grab w-full`}
                    />
                </div>

                {/* miniPlyer Icon */}
                <button className={`${isMiniPlayerWindowOpen ? "text-[#1CC558]" : "dynamic-text-hover"} cursor-pointer`}
                    onClick={() => setPreferences({ isMiniPlayerWindowOpen: true })}
                >
                    <MiniPlayerIcon width="16" height="16" />
                </button>

                {/* Fullscreen Icon */}
                <button className={`dynamic-text-hover cursor-pointer`}
                    onClick={handleToggleFullscreen}
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
                isMiniPlayerWindowOpen && <MiniPlayerWindow onClose={() => setPreferences({ isMiniPlayerWindowOpen: false })} />
            }
        </>
    )
}

export default RightSideControls