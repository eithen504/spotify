import React from 'react'
import Header from './Header'
import { Drawer, DrawerContent } from '../../../../components/ui/drawer';
import TrackArt from './TrackArt';
import TrackInfo from './TrackInfo';
import ProgressBar from './ProgressBar';
import TrackControls from './TrackControls';
import BottomActions from './BottomActions';

interface NowPlayingProps {
    isOpen: boolean;
    onClose: () => void;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isOpen, onClose }) => {
    return (
        <Drawer open={isOpen} onClose={onClose}>
            <DrawerContent className="z-500"
                style={{ background: '#460B1D' }}
            >
                <div className="h-screen w-full flex flex-col relative overflow-hidden">
                    {/* Header */}
                    <Header onClose={onClose} />

                    {/* Track Art */}
                    <TrackArt />

                    {/* Track Info */}
                    <TrackInfo />

                    {/* Progress Bar */}
                    <ProgressBar />

                    {/* Track Controls */}
                    <TrackControls />

                    {/* Bottom Actions */}
                    <BottomActions />
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default NowPlaying