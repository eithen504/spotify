import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore"
import { ExitScreenIcon, FullScreenIcon, MinimizeIcon, MoreIcon } from "../../../../../Svgs"

const Header = () => {
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { rightSidebar } = preferences;
    const { isNowPlayingViewFullScreen } = rightSidebar;

    const { trackDetails } = useTrackDetailsStore();

    const handleMinimizeNowPlayingView = () => {
        setPreferences({ rightSidebar: { ...rightSidebar, isNowPlayingViewExpanded: false } });
    }

    const handleToggleFullscreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                console.error(`Error enabling full-screen mode: ${err.message}`);
            });
            setPreferences({ rightSidebar: { ...rightSidebar, isNowPlayingViewFullScreen: true } });
        } else {
            document.exitFullscreen();
            setPreferences({ rightSidebar: { ...rightSidebar, isNowPlayingViewFullScreen: false } });
        }
    };

    return (
        <div className="w-full h-14 px-6 flex items-center justify-between shadow-sm">
            {/* Left Title */}
            <h2 className="text-[#ffffff] text-md font-extrabold">{trackDetails.title}</h2>

            {/* Right Icons */}
            <div className="flex items-center gap-2 text-white/70 text-sm">
                <button
                    className="dynamic-text-hover dynamic-bg-hover transition cursor-pointer p-[6px] rounded-full"
                    style={{
                        '--bgHoverColor': '#ffffff1a',
                    } as React.CSSProperties}
                    title="More Options For Xyz"
                >
                    <MoreIcon />
                </button>

                <button
                    className="dynamic-text-hover dynamic-bg-hover transition cursor-pointer p-[10px] rounded-full"
                    style={{
                        '--bgHoverColor': '#ffffff1a',
                    } as React.CSSProperties}
                    title={isNowPlayingViewFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
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

                <button
                    className="dynamic-text-hover dynamic-bg-hover transition cursor-pointer p-[10px] rounded-full"
                    style={{
                        '--bgHoverColor': '#ffffff1a',
                    } as React.CSSProperties}
                    title="Minimize Now Playing View"
                    onClick={handleMinimizeNowPlayingView}
                >
                    <MinimizeIcon width="16" height="16" />
                </button>

            </div>
        </div>
    )
}

export default Header