import type React from "react"
import { ShareIcon } from "../../../../Svgs"
import { getVolumeIcon } from "../../../../utils"
import { useUIPreferencesStore } from "../../../../store/useUIPreferenceStore"
import { useState } from "react"
import { Slider } from "../../../../components/ui/slider"
import { useShare } from "../../../../hooks/share"
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore"

interface BottomActionsProps {
    handleVolumeChange: (value: number[]) => void
}

const BottomActions: React.FC<BottomActionsProps> = ({ handleVolumeChange }) => {
    /* ---------- Local States ---------- */
    const [isVolumeSliderOpen, setIsVolumeSliderOpen] = useState(false);

    /* ---------- Stores ---------- */
    const { preferences: { systemVolume } } = useUIPreferencesStore();
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
                        {suggestedVolumeIcon({ width: "16", height: "16" })}
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

                <button className="cursor-pointer"
                    onClick={() => share(`/track/${trackDetails._id}`)}
                >
                    <ShareIcon width="17" height="17" />
                </button>
            </div>
        </div>
    )
}

export default BottomActions