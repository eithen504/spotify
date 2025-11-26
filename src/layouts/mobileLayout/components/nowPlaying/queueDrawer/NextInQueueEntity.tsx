import { QueueViewMusicPlaceHolder } from "../../../../../components/Placeholders";
import { useQueueStore } from "../../../../../store/useQueueStore";

const NextInQueueEntity = () => {
    /* ---------- Stores ---------- */
    const { activeEntityQueueListNode, entityName } = useQueueStore();

    const getQueueItems = () => {
        const items = [];
        let current = activeEntityQueueListNode?.next;

        while (current != null) {
            if (current.value) {
                const item = current.value;

                items.push(
                    <div
                        key={item._id}
                        className="cursor-pointer dynamic-scale-hover flex items-center space-x-3 p-2 rounded-sm"
                    >
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
                            <p className="text-md text-[#ffffff] font-medium truncate">
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

        return items;
    }

    return (
        <div className="mt-4 mb-4 px-2">
            <h2 className="text-[#ffffff] text-md font-bold px-2 pb-2">{`Next In Queue From ${entityName}`}</h2>

            <div className="space-y-0">
                {getQueueItems()}
            </div>
        </div>
    )
}

export default NextInQueueEntity