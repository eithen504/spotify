import React from 'react'
import Header from './Header'
import { Drawer, DrawerContent } from '../../../../components/ui/drawer';
import TrackArt from './TrackArt';
import TrackInfo from './TrackInfo';
import ProgressBar from './ProgressBar';
import TrackControls from './TrackControls';
import BottomActions from './BottomActions';
import { useTrackDetailsStore } from '../../../../store/useTrackDetailsStore';
import { useDominantColor } from '../../../../hooks/color';

interface NowPlayingProps {
    onClose: () => void;
    progress: number[];
    currentTime: number;
    handlePlayPauseTrack: () => void;
    handlePlayNextTrack: () => void;
    handlePlayPrevTrack: () => void;
    handleRepeatTrack: () => void;
    handleProgressChange: (value: number[]) => void;
    handleVolumeChange: (value: number[]) => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({
    onClose,
    progress,
    currentTime,
    handlePlayPauseTrack,
    handlePlayNextTrack,
    handlePlayPrevTrack,
    handleRepeatTrack,
    handleProgressChange,
    handleVolumeChange 
}) => {
    /* ---------- Stores ---------- */
    const { trackDetails } = useTrackDetailsStore();

    /* ---------- Custom Hooks ---------- */
    const { dominantColor } = useDominantColor(trackDetails.coverImageUrl || "");

    return (
        <Drawer open={true} onClose={onClose}>
            <DrawerContent className="z-500"
                style={{ background: dominantColor || '#3C3C3C' }}
            >
                <div className="h-screen w-full flex flex-col relative overflow-hidden">
                    {/* Header */}
                    <Header onClose={onClose} />

                    {/* Track Art */}
                    <TrackArt />

                    {/* Track Info */}
                    <TrackInfo />

                    {/* Progress Bar */}
                    <ProgressBar
                        progress={progress}
                        currentTime={currentTime}
                        handleProgressChange={handleProgressChange}
                    />

                    {/* Track Controls */}
                    <TrackControls
                        handlePlayPauseTrack={handlePlayPauseTrack}
                        handlePlayNextTrack={handlePlayNextTrack}
                        handlePlayPrevTrack={handlePlayPrevTrack}
                        handleRepeatTrack={handleRepeatTrack}
                    />

                    {/* Bottom Actions */}
                    <BottomActions handleVolumeChange={handleVolumeChange} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NowPlaying