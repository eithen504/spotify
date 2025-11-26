import type React from "react"
import { QueueIcon, ShareIcon } from "../../../../Svgs"
import { getVolumeIcon } from "../../../../utils"
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { useState } from "react"
import { Slider } from "../../../../components/ui/slider"
import { useShare } from "../../../../hooks/share"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"
import QueueDrawer from "./queueDrawer/QueueDrawer"

interface BottomActionsProps {
    handleVolumeChange: (value: number[]) => void
}

const BottomActions: React.FC<BottomActionsProps> = ({ handleVolumeChange }) => {
    /* ---------- Local States ---------- */
    const [isVolumeSliderOpen, setIsVolumeSliderOpen] = useState(false);
    const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false);

    /* ---------- Stores ---------- */
    const { systemVolume } = useUIPreferencesStore();
    const { trackDetails } = useTrackDetailsStore();

    /* ---------- Custom Hooks ---------- */
    const { share } = useShare();

    /* ---------- Derived Values ---------- */
    const suggestedVolumeIcon = getVolumeIcon(systemVolume[0]);

    return (
        <div className="px-6 pb-4 flex-shrink-0">
            <div className="text-[#ffffff] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        className="cursor-pointer"
                        onClick={() => setIsVolumeSliderOpen((prev) => !prev)}
                    >
                        {suggestedVolumeIcon({ width: "17", height: "17" })}
                    </button>

                    {isVolumeSliderOpen && (
                        <div className="w-50 rounded-full">
                            <Slider
                                defaultValue={[0]}
                                value={systemVolume}
                                onValueChange={handleVolumeChange}
                                className="cursor-grab w-full"
                            />
                        </div>
                    )}
                </div>

                <div className="space-x-7">
                    <button
                        className="cursor-pointer"
                        onClick={() => share(`/track/${trackDetails._id}`)}
                    >
                        <ShareIcon width="17" height="17" />
                    </button>

                    <button
                        className="cursor-pointer"
                        onClick={() => setIsQueueDrawerOpen(true)}
                    >
                        <QueueIcon width="16" height="16" />
                    </button>
                </div>
            </div>

            {
                isQueueDrawerOpen && (
                    <QueueDrawer
                        onClose={() => setIsQueueDrawerOpen(false)}
                    />
                )
            }
        </div>
    )
}

export default BottomActions