import { useEffect, useRef, useState } from "react"
import PlaybackControls from "./PlaybackControls"
import RightSideControls from "./RightSideControls"
import TrackInfo from "./TrackInfo"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { useQueueStore } from "../../../../store/useQueueStore"
import { usePlaylistStore } from "../../../../store/usePlaylistStore"
import { useRepeatTrackStore } from "../../../../store/useRepeatTrackStore"
import { useAlbumStore } from "../../../../store/useAlbumStore"
import { toast } from "sonner"

const PlaybackController = () => {
    /* ---------- Local States ---------- */
    const [progress, setProgress] = useState([0]);
    const [currentTime, setCurrentTime] = useState(0);

    /* ---------- Local References ---------- */
    const audioRef = useRef<HTMLAudioElement | null>(null);

    /* ---------- Stores ---------- */
    const { systemVolume, setSystemVolume } = useUIPreferencesStore();
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { albumData: { albumId }, setAlbumData } = useAlbumStore();
    const { playlistData: { playlistId }, setPlaylistData } = usePlaylistStore();
    const { customQueue, activeEntityQueueListNode, entityId: queueEntityId, insertAfterActiveEntityListNode, removeItemFromQueue, setActiveEntityQueueListNode } = useQueueStore();
    const { repeatTracks, addToRepeatTracks, removeFromRepeatTrack } = useRepeatTrackStore();

    /* ---------- Derived Values ---------- */
    const hasTrackInRepeat = repeatTracks[trackDetails._id];

    /* ---------- Methods Or Functions ---------- */
    const handlePlayPauseTrack = () => {
        setTrackDetails({ isPlaying: !trackDetails.isPlaying })
    }

    const handlePlayNextTrack = () => {
        const hasNext = activeEntityQueueListNode?.next?.value || customQueue.head.next?.value;

        if (!hasNext) return;

        const nextCustomQueueItem = customQueue.head.next!.value;
        const nextEntityQueueItem = activeEntityQueueListNode!.next!.value;

        const [activeEntityType, activeEntityId, activeTrackId] = activeEntityQueueListNode!.value!._id.split('-');
        const isActiveQueueListNodeCustom = activeEntityId != queueEntityId;

        if (nextCustomQueueItem) {
            const nextCustomQueueListNode = customQueue!.head!.next!;
            const [nextEntityType, nextEntityId, nextTrackId] = nextCustomQueueItem!._id.split('-');

            setTrackDetails({
                _id: nextTrackId,
                title: nextCustomQueueItem.title,
                coverImageUrl: nextCustomQueueItem.coverImageUrl,
                audioUrl: nextCustomQueueItem.audioUrl,
                artist: nextCustomQueueItem.artist,
                duration: nextCustomQueueItem.duration,
                albumId: nextCustomQueueItem.albumId,
                albumName: nextCustomQueueItem.albumName,
                hasLiked: nextCustomQueueItem.hasLiked,
                createdAt: nextCustomQueueItem.createdAt,
                isPlaying: true,
            });

            // next item is from custom queue we cant make both album and playlist empty
            // bcoz the item might be from the same entity      
            if (nextEntityType === "Album") {
                if (nextEntityId === albumId) {
                    setAlbumData({ albumId: nextEntityId, activeTrackId: nextTrackId });
                } else {
                    setAlbumData({ albumId: "", activeTrackId: "" });
                }
                // Clear playlist data in case a playlist is currently active
                setPlaylistData({ playlistId: "", activeTrackId: "" });

            } else if (nextEntityType === "Playlist") {
                if (nextEntityId === playlistId) {
                    setPlaylistData({ playlistId: nextEntityId, activeTrackId: nextTrackId });
                } else {
                    setPlaylistData({ playlistId: "", activeTrackId: "" });
                }
                // Clear album data in case a album is currently active
                setAlbumData({ albumId: "", activeTrackId: "" });
            }

            insertAfterActiveEntityListNode(nextCustomQueueListNode);
            setActiveEntityQueueListNode(nextEntityType as "Playlist" | "Album", nextEntityId, nextTrackId);
        } else {
            if (nextEntityQueueItem) {
                const [nextEntityType, nextEntityId, nextTrackId] = nextEntityQueueItem!._id.split('-'); // [p1] -><- [p2] -><- [p1]

                setTrackDetails({
                    _id: nextTrackId,
                    title: nextEntityQueueItem.title,
                    coverImageUrl: nextEntityQueueItem.coverImageUrl,
                    audioUrl: nextEntityQueueItem.audioUrl,
                    artist: nextEntityQueueItem.artist,
                    duration: nextEntityQueueItem.duration,
                    albumId: nextEntityQueueItem.albumId,
                    albumName: nextEntityQueueItem.albumName,
                    hasLiked: nextEntityQueueItem.hasLiked,
                    createdAt: nextEntityQueueItem.createdAt,
                    isPlaying: true,
                });

                // that means playlist already initilize
                if (nextEntityType == "Album") {
                    setAlbumData({ albumId: nextEntityId, activeTrackId: nextTrackId });
                } else {
                    setPlaylistData({ playlistId: nextEntityId, activeTrackId: nextTrackId });
                }

                setActiveEntityQueueListNode(nextEntityType as "Playlist" | "Album", nextEntityId, nextTrackId);
            }
        }

        if (isActiveQueueListNodeCustom) {
            removeItemFromQueue(activeEntityType as "Playlist" | "Album", activeEntityId, activeTrackId);
        }
    }

    const handlePlayPrevTrack = () => {
        const prevEntityQueueItem = activeEntityQueueListNode!.prev!.value;
        const [activeEntityType, activeEntityId, activeTrack] = activeEntityQueueListNode!.value!._id.split('-');
        const isActiveEntityQueueListNodeCustom = activeEntityId != queueEntityId;

        if (prevEntityQueueItem) {
            const [prevEntityType, prevEntityId, prevTrackId] = prevEntityQueueItem!._id.split('-');

            setTrackDetails({
                _id: prevTrackId,
                title: prevEntityQueueItem.title,
                coverImageUrl: prevEntityQueueItem.coverImageUrl,
                audioUrl: prevEntityQueueItem.audioUrl,
                artist: prevEntityQueueItem.artist,
                duration: prevEntityQueueItem.duration,
                albumId: prevEntityQueueItem.albumId,
                albumName: prevEntityQueueItem.albumName,
                hasLiked: prevEntityQueueItem.hasLiked,
                createdAt: prevEntityQueueItem.createdAt,
                isPlaying: true,
            });

            // that means playlist already initilize 
            if (prevEntityType == "Album") {
                setAlbumData({ albumId: prevEntityId, activeTrackId: prevTrackId });
            } else {
                setPlaylistData({ playlistId: prevEntityId, activeTrackId: prevTrackId });
            }

            setActiveEntityQueueListNode(prevEntityType as "Playlist" | "Album", prevEntityId, prevTrackId);
        }

        if (isActiveEntityQueueListNodeCustom) {
            removeItemFromQueue(activeEntityType as "Playlist" | "Album", activeEntityId, activeTrack)
        }
    }

    const handleRepeatTrack = () => {
        if (hasTrackInRepeat) {
            removeFromRepeatTrack(trackDetails._id);
            toast.success("Track Is Remove From Repeat");
        } else {
            addToRepeatTracks(trackDetails._id);
            toast.success("Track Is Set To Repeat");
        }
    }

    const handleProgressChange = (value: number[]) => {
        const audio = audioRef.current
        if (audio) {
            const newTimeInSeconds = (value[0] / 100) * audio.duration;
            audio.currentTime = newTimeInSeconds;
        }
    }

    const handleVolumeChange = (value: number[]) => {
        const audio = audioRef.current

        if (audio) {
            setSystemVolume(value);
            audio.volume = value[0] / 100;
        }
    };

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails._id) return;

        if ((trackDetails.isPlaying)) {
            audio.play();
        } else if (!trackDetails.isPlaying) {
            audio.pause();;
        }
    }, [trackDetails]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails._id) return;

        // Handle browser media control events
        const handlePlay = () => {
            setTrackDetails({ isPlaying: true });
        };

        const handlePause = () => {
            setTrackDetails({ isPlaying: false });
        };

        const handleTimeUpdate = () => {
            setProgress([(audio.currentTime / audio.duration) * 100]);
            setCurrentTime(audio.currentTime);
        };

        const handleAudioEnd = () => {
            if (hasTrackInRepeat) {
                setTrackDetails({ isPlaying: true })
                return;
            }
            handlePlayNextTrack()
        }

        // Attach event listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            // Clean up event listeners
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [trackDetails]);

    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            audio.volume = systemVolume[0] / 100;
        }
    }, [trackDetails])

    return (
        <footer className={`bg-black px-4 py-4 ${trackDetails._id ? "opacity-100" : "opacity-50"}`}>
            <div className="flex items-center justify-between">
                {/* Track Info */}
                <TrackInfo />

                {/* Playback Controls */}
                <PlaybackControls
                    progress={progress}
                    currentTime={currentTime}
                    handlePlayPauseTrack={handlePlayPauseTrack}
                    handlePlayNextTrack={handlePlayNextTrack}
                    handlePlayPrevTrack={handlePlayPrevTrack}
                    handleRepeatTrack={handleRepeatTrack}
                    handleProgressChange={handleProgressChange}
                />

                {/* Right Side Controls */}
                <RightSideControls
                    progress={progress}
                    currentTime={currentTime}
                    handlePlayPauseTrack={handlePlayPauseTrack}
                    handlePlayNextTrack={handlePlayNextTrack}
                    handlePlayPrevTrack={handlePlayPrevTrack}
                    handleRepeatTrack={handleRepeatTrack}
                    handleProgressChange={handleProgressChange}
                    handleVolumeChange={handleVolumeChange}
                />
            </div>

            {
                trackDetails._id && <audio ref={audioRef} src={trackDetails.audioUrl} />
            }
        </footer>
    )
}

export default PlaybackController