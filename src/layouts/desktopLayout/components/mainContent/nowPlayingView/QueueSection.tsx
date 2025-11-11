import { useQueueStore } from "../../../../../store/useQueueStore";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";

const QueueSection = () => {
    /* ---------- Stores ---------- */
    const { preferences, setPreferences } = useUIPreferencesStore();
    const { rightSidebar } = preferences;
    const { trackDetails } = useTrackDetailsStore();
    const { customQueue, activeEntityQueueListNode } = useQueueStore();

    /* ---------- Derived Values ---------- */
    const nextQueueItem = customQueue.head.next?.value || activeEntityQueueListNode?.next?.value;

    /* ---------- Methods Or Functions ---------- */
    const handleOpenQueueView = () => {
        const updatedRightSidebar = { ...rightSidebar, showQueueView: true, showNowPlayingView: false };
        const updatedPreferences = { ...preferences, rightSidebar: updatedRightSidebar };
        setPreferences({ rightSidebar: updatedRightSidebar });
        localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
    }

    return (
        <div className="bg-[#1e1e1e] mt-4 pb-2 rounded-md shadow-md">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <h3 className="text-md font-semibold text-[#ffffff]">Next in queue</h3>
                <button
                    className={`text-sm font-medium text-[#aaaaaa] ${trackDetails._id ? "dynamic-text-hover hover:underline cursor-pointer" : ""}`}
                    onClick={handleOpenQueueView}
                >
                    Open queue
                </button>
            </div>

            <div className="px-2">
                <div className="flex items-center space-x-3 dynamic-bg-hover p-2 rounded-[4px] cursor-pointer"
                    style={{
                        '--bgHoverColor': '#3F3F3F',
                    } as React.CSSProperties}
                >
                    <img
                        src={nextQueueItem?.coverImageUrl}
                        alt="Closer"
                        className="w-12 h-12 rounded-[4px] object-cover"
                    />
                    <div className="truncate space-y-2">
                        <p className="text-[#ffffff] text-md font-medium leading-none">{nextQueueItem?.title}</p>
                        <p className="text-[#aaaaaa] text-sm truncate leading-none">{nextQueueItem?.artist}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueueSection