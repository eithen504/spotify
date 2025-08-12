import { HighVolumeIcon, ShareIcon } from "../../../../Svgs"

const BottomActions = () => {
    return (
        <div className="px-6 pb-4 flex-shrink-0">
            <div className="text-[#ffffff] flex items-center justify-between">
                <button className="cursor-pointer">
                    <HighVolumeIcon width="17" height="17" />
                </button>

                <button className="cursor-pointer">
                    <ShareIcon width="17" height="17" />
                </button>
            </div>
        </div>
    )
}

export default BottomActions