import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { AlertIcon } from "../Svgs";

interface EditFolderDialogProps {
    isOpen: boolean;
    onClose: () => void;
    defaultName: string
    isPending: boolean;
    handleUpdateFolder: (payload: { name?: string, playlistIds?: string[] }) => void;
}

const EditFolderDialog: React.FC<EditFolderDialogProps> = ({
    isOpen,
    onClose,
    defaultName,
    isPending,
    handleUpdateFolder
}) => {
    const [name, setName] = useState(defaultName);
    const isSaveButtonDisabled = isPending || name.trim() == "";
    const isNameFiledEmpty = name.trim() == "";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#282828] text-white border-none rounded-md p-6 z-500 w-[370px]">
                {/* Title */}
                <h2 className="text-xl font-semibold mb-4">Rename</h2>

                <div className="flex gap-4 flex-col">
                    {/* Error Message */}
                    {isNameFiledEmpty && (
                        <div className="flex items-center gap-2 bg-[#E22134] text-white text-xs font-medium px-3 py-2 rounded-[4px]">
                            <AlertIcon width="18" height="18" />
                            <span>Folder name is required</span>
                        </div>
                    )}

                    {/* Folder Name Input */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={name}
                                className="peer w-full bg-[#3E3E3E] rounded-[4px] px-3 pt-5 pb-2 text-sm text-white placeholder-transparent outline-none border border-transparent focus:border-gray-400"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label
                                className="absolute left-3 top-1.5 text-[11px] text-gray-400 transition-all peer-focus:text-gray-200"
                            >
                                Name
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-4">
                    <button
                        className={`text-black ${isSaveButtonDisabled ? "bg-[#838485] cursor-not-allowed" : "bg-white cursor-pointer"} font-bold rounded-full px-7 py-3 text-sm transition`}
                        onClick={() => {
                            handleUpdateFolder({ name });
                        }}
                        disabled={isSaveButtonDisabled}
                    >
                        Save
                    </button>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default EditFolderDialog