import React from "react";
import { Dialog, DialogContent } from "../../../../../components/ui/dialog";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";
import { formatDate } from "../../../../../utils";

interface ShowCreditDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShowCreditDialog: React.FC<ShowCreditDialogProps> = ({
    isOpen,
    onClose,
}) => {
    const { trackDetails } = useTrackDetailsStore();
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#282828] text-white border-none rounded-md p-6 z-500 w-[320px]">
                {/* Title */}
                <h2 className="text-xl font-semibold mb-4">Credits</h2>

                {/* Folder Name Input */}
                <div className="flex flex-1">
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
                        <div>
                            <p className="font-medium">Langauge</p>
                            <p className="text-sm text-[#aaaaaa]">{trackDetails.language}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default ShowCreditDialog