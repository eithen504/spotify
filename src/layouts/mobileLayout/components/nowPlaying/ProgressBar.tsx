import type React from 'react'
import { Slider } from '../../../../components/ui/slider'
import { useTrackDetailsStore } from '../../../../store/useTrackDetailsStore';
import { formatDuration } from '../../../../utils';

interface ProgessBarProps {
    progress: number[];
    currentTime: number;
    handleProgressChange: (value: number[]) => void;
}

const ProgressBar: React.FC<ProgessBarProps> = ({ progress, currentTime, handleProgressChange }) => {
    const { trackDetails } = useTrackDetailsStore();

    return (
        <div className="px-6 py-2 flex-shrink-0">
            <div className="w-full rounded-full h-1">
                <Slider
                    max={100}
                    defaultValue={[0]}
                    value={progress}
                    onValueChange={handleProgressChange}
                    className="w-full cursor-grab"
                />
            </div>
            <div className="flex items-center justify-between text-white/70 text-[12px] mt-1">
                <span>{formatDuration(currentTime)}</span>
                <span>{trackDetails.duration}</span>
            </div>
        </div>
    )
}

export default ProgressBar