import { QueueViewMusicPlaceHolder } from "../../../../../components/Placeholders";
import { useQueueStore } from "../../../../../store/useQueueStore";

const NextInQueueCustom = () => {
    const { customQueue, clearCustomQueue } = useQueueStore();

    const getQueueItems = () => {
        const items = [];
        let current = customQueue.head.next;

        while (current != null) {
            if (current.value) {
                const item = current.value;

                items.push(
                    <div key={item._id} className="cursor-pointer flex items-center space-x-3 hover:bg-[#1F1F1F] p-2 rounded-sm">
                        {
                            item.coverImageUrl ? (
                                <img
                                    src={item.coverImageUrl}
                                    alt={item.title}
                                    className="w-12 h-12 flex-shrink-0 object-cover rounded-[4px]"
                                />
                            ) : (
                                <QueueViewMusicPlaceHolder />
                            )
                        }

                        <div className="overflow-hidden">
                            <p className="text-md font-medium truncate">
                                {item.title}
                            </p>
                            <p className="text-sm text-white/70 truncate">
                                {item.artist}
                            </p>
                        </div>
                    </div>
                )
            }

            current = current.next;
        }

        return items
    }

    return (
        <div className="mt-4 px-2">
            <div className="flex items-center justify-between px-2 pb-2">
                <h2 className="text-[#ffffff] text-md font-bold">Next In Queue</h2>
                <button
                    className="text-sm font-semibold text-[#9c9c9c] dynamic-text-hover transition cursor-pointer"
                    onClick={clearCustomQueue}
                >
                    Clear Queue
                </button>
            </div>

            <div className="space-y-0">
                {getQueueItems()}
            </div>
        </div>

    )
}

export default NextInQueueCustom