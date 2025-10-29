import { useState } from "react";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import { formatDate } from "../../../../../utils";
import ShowCreditDialog from "./ShowCreditDialog";

const CreditSection = () => {
    const { trackDetails } = useTrackDetailsStore();
    const [isShowCreditsDialogOpen, setIsShowCreditsDialogOpen] = useState(false);

    return (
        <div className="mt-6 bg-[#1e1e1e] p-4 rounded-md shadow-md text-[#ffffff]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold">Credits</h3>
                <button
                    className={`text-sm font-medium text-[#aaaaaa] ${trackDetails._id ? "dynamic-text-hover hover:underline cursor-pointer" : ""}`}
                    onClick={() => setIsShowCreditsDialogOpen(true)}
                    disabled={!trackDetails._id}
                >
                    Show all
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="font-medium">Title</p>
                    <p className="text-sm text-[#aaaaaa]">{trackDetails.title}</p>
                </div>
                <div>
                    <p className="font-medium">Artist</p>
                    <p className="text-sm text-[#aaaaaa]">{trackDetails.artist}</p>
                </div>
                <div>
                    <p className="font-medium">Upload Date</p>
                    <p className="text-sm text-[#aaaaaa]">{formatDate(trackDetails.createdAt)}</p>
                </div>
            </div>

            {
                isShowCreditsDialogOpen && (
                    <ShowCreditDialog
                        isOpen={isShowCreditsDialogOpen}
                        onClose={() => setIsShowCreditsDialogOpen(false)}
                    />
                )
            }
        </div>
    )
}

export default CreditSection