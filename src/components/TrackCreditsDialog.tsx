import type React from "react";
import type { Track } from "../types";
import { Dialog, DialogContent } from "./ui/dialog";
import { formatDate } from "../utils";

interface TrackCreditsDialogProps {
    track: Track | null
    onClose: () => void;
}

const TrackCreditsDialog: React.FC<TrackCreditsDialogProps> = ({ track, onClose }) => {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-[#282828] text-white border-none rounded-md p-6 z-500 w-[320px]">
                {/* Title */}
                <h2 className="text-xl font-semibold mb-4">Credits</h2>

                {/* Folder Name Input */}
                <div className="flex flex-1">
                    <div className="space-y-4">
                        <div>
                            <p className="font-medium">Title</p>
                            <p className="text-sm text-[#aaaaaa]">{track?.title}</p>
                        </div>
                        <div>
                            <p className="font-medium">Artist</p>
                            <p className="text-sm text-[#aaaaaa]">{track?.artist}</p>
                        </div>
                        <div>
                            <p className="font-medium">Upload Date</p>
                            <p className="text-sm text-[#aaaaaa]">{formatDate(track?.createdAt || new Date)}</p>
                        </div>
                        <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-[#aaaaaa]">
                                {
                                    track?.languages?.length
                                        ? track.languages.join(", ")
                                        : "Not specified"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default TrackCreditsDialog