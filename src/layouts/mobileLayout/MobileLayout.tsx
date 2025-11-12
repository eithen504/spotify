import { useEffect, useRef, useState } from 'react'
import MainContent from './components/mainContent/MainContent'
import NowPlaying from './components/nowPlaying/NowPlaying'
import MobileMiniPlayer from './components/mobileMiniPlayer/MobileMiniPlayer';
import MobileNavigationFooter from './components/mobileNavigationFooter/MobileNavigationFooter';
import { useTrackDetailsStore } from '../../store/useTrackDetailsStore';
import { useUIPreferencesStore } from '../../store/useUIPreferenceStore';
import { useQueueStore } from '../../store/useQueueStore';
import { usePlaylistStore } from '../../store/usePlaylistStore';
import { useRepeatTrackStore } from '../../store/useRepeatTrackStore';
import { useAlbumStore } from '../../store/useAlbumStore';

export default function MobileLayout() {
    /* ---------- Local States ---------- */
    const [progress, setProgress] = useState([0]);
    const [currentTime, setCurrentTime] = useState(0);
    const [isNowPlayingDrawerOpen, setIsNowPlayingDrawerOpen] = useState(false);

    /* ---------- Local References ---------- */
    const audioRef = useRef<HTMLAudioElement | null>(null);

    /* ---------- Stores ---------- */
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { preferences: { systemVolume }, setPreferences } = useUIPreferencesStore();
    const { albumData: { albumId }, setAlbumData } = useAlbumStore();
    const { playlistData: { playlistId }, setPlaylistData } = usePlaylistStore();
    const { customQueue, activeEntityQueueListNode, entityId: queueEntityId, insertAfterActiveEntityListNode, removeItemFromQueue, setActiveEntityQueueListNode } = useQueueStore();
    const { repeatTracks } = useRepeatTrackStore();

    /* ---------- Derived Values ---------- */
    const hasTrackInRepeat = repeatTracks[trackDetails._id];
 
    /* ---------- Methods Or Functions ---------- */
    const handlePlayPauseTrack = () => {
        setTrackDetails({ isPlaying: !trackDetails.isPlaying })
    }

    const handleProgressChange = (value: number[]) => {
        const audio = audioRef.current
        if (audio) {
            // Convert percentage to seconds
            const newTimeInSeconds = (value[0] / 100) * audio.duration;
            audio.currentTime = newTimeInSeconds;
        }
    }

    const handleVolumeChange = (value: number[]) => {
        const audio = audioRef.current

        if (audio) {
            setPreferences({ systemVolume: value })
            localStorage.setItem("systemVolume", `${value[0]}`);
            audio.volume = value[0] / 100;
        }
    };

    const handlePlayNextTrack = () => {
        const hasNext = activeEntityQueueListNode?.next?.value || customQueue.head.next?.value;

        if (!hasNext) return;

        const nextCustomQueueItem = customQueue.head.next!.value;
        const nextEntityQueueItem = activeEntityQueueListNode!.next!.value;

        const [activeEntityType, activeEntityId, activeTrackId] = activeEntityQueueListNode!.value!._id.split('-');
        const isActiveEntityQueueListNodeCustom = activeEntityId != queueEntityId;

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

        if (isActiveEntityQueueListNodeCustom) {
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

    /* ---------- UseEffects ---------- */
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackDetails._id) return;

        if ((trackDetails.isPlaying)) {
            audio.play();
        } else if (!trackDetails.isPlaying) {
            audio.pause();
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
                setTrackDetails({ isPlaying: true });
                return;
            }
            handlePlayNextTrack();
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
        const audio = audioRef.current;
        if (audio) {
            audio.volume = systemVolume[0] / 100;
        }
    }, [trackDetails])

    return (
        <div className="min-h-screen text-[#ffffff] relative bg-[#121212]">
            {/* Main Content */}
            <MainContent />

            {/* Now Playing */}
            <NowPlaying
                isOpen={isNowPlayingDrawerOpen}
                onClose={() => setIsNowPlayingDrawerOpen(false)}
                progress={progress}
                currentTime={currentTime}
                handlePlayPauseTrack={handlePlayPauseTrack}
                handleProgressChange={handleProgressChange}
                handleVolumeChange={handleVolumeChange}
                handlePlayNextTrack={handlePlayNextTrack}
                handlePlayPrevTrack={handlePlayPrevTrack}
            />

            {/* Mobile Mini Player */}
            {
                trackDetails._id && <MobileMiniPlayer onOpen={() => setIsNowPlayingDrawerOpen(true)} />
            }

            {/* Conditional - Mobile Navigation Footer Or Signup Banner */}
            <MobileNavigationFooter />

            {
                trackDetails._id && <audio ref={audioRef} src={trackDetails.audioUrl} />
            }
        </div>
    )
}
