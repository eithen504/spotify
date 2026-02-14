import { QueueViewMusicPlaceHolder } from "../../../../../components/Placeholders";
import { useAlbumStore } from "../../../../../store/useAlbumStore";
import { usePlaylistStore } from "../../../../../store/usePlaylistStore";
import { useQueueStore } from "../../../../../store/useQueueStore";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import type { Track } from "../../../../../types";

const NextInQueueEntity = () => {
    /* ---------- Stores ---------- */
    const { setTrackDetails } = useTrackDetailsStore();
    const { entityId: queueEntityId, activeEntityQueueListNode, entityName, setActiveEntityQueueListNode, removeItemFromQueue } = useQueueStore();
    const { setPlaylistData } = usePlaylistStore();
    const { setAlbumData } = useAlbumStore();

    const handlePlayPause = (track: Track) => {
        const [activeEntityType, activeEntityId, activeTrackId] = activeEntityQueueListNode!.value!._id.split('-');
        const isActiveEntityQueueListNodeCustom = activeEntityId != queueEntityId;

        const [entityType, entityId, trackId] = track._id.split('-');

        setTrackDetails({
            _id: trackId,
            title: track.title,
            coverImageUrl: track.coverImageUrl,
            audioUrl: track.audioUrl,
            artist: track.artist,
            duration: track.duration,
            albumId: track.albumId,
            albumName: track.albumName,
            hasLiked: track.hasLiked,
            createdAt: track.createdAt,
            isPlaying: true
        })

        if (entityType == "Album") {
            setAlbumData({ albumId: entityId, activeTrackId: trackId });
        } else {
            setPlaylistData({ playlistId: entityId, activeTrackId: trackId });
        }

        setActiveEntityQueueListNode(entityType as "Playlist" | "Album", entityId, trackId);

        if (isActiveEntityQueueListNodeCustom) {
            removeItemFromQueue(activeEntityType as "Playlist" | "Album", activeEntityId, activeTrackId);
        }
    }

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
                        onClick={() => handlePlayPause(item)}
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