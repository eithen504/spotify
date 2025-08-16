import { useScrollStore } from "../../../store/useScrollStore";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";
import { ClockIcon, DropdownIcon } from "../../../Svgs";
import { getScrollThreshold } from "../../../utils";

const PlaylistTableHeader = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const { scrollFromTop } = useScrollStore();

    { leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:w-52 md:h-52" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:w-35 md:h-35" : "md:w-40 md:h-40" }


    // Calculate the background class based on conditions
    const shouldShowBackground = scrollFromTop >= getScrollThreshold(leftPanelSize);
    const backgroundClass = shouldShowBackground ? "bg-[#1F1F1F]" : "";

    return (
        <div className={`sticky group top-16 left-0 w-full z-10 text-sm text-white/70 ${backgroundClass} pb-2 px-10 pt-2 hidden md:flex`}>
            <div className="w-6">#</div>
            <div className="flex-1 truncate">Title</div>
            {
                false ? (
                    <>
                        <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>{"Artist"}</div>
                        <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>{"Album"}</div>
                    </>
                ) : (
                    <>
                        <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>{"Album"}</div>
                        <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>{"Date added"}</div>
                    </>
                )
            }
            <div className="w-20 text-right truncate flex items-center justify-center">
                <ClockIcon width="18" height="18" />
            </div>

            <button className="cursor-pointer group-hover-opacity"
            >
                {/* Replace with your desired icon */}
                <DropdownIcon width="15" height="15" />
            </button>

        </div>
    )
}

export default PlaylistTableHeader