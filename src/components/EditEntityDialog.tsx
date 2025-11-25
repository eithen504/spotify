import React, { useRef, useState, type JSX } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { EntityCoverPlaceholder } from "./Placeholders";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import { usePreviewFile } from "../hooks/file";
import { AlertIcon, EditIcon } from "../Svgs";

interface EntityInfo {
    defaultTitle: string;
    defaultImgUrl: string;
    placeholderIcon?: JSX.Element;
}

interface EditEntityDialogProps {
    isOpen: boolean;
    onClose: () => void;
    entity: EntityInfo;
    isPending: boolean;
    handleUpdateEntity: (payload: { title: string, coverImageUrl: string }) => void;
}

const EditEntityDialog: React.FC<EditEntityDialogProps> = ({
    isOpen,
    onClose,
    entity: {
        defaultTitle,
        defaultImgUrl,
        placeholderIcon
    },
    isPending,
    handleUpdateEntity
}) => {
    /* ---------- Local States ---------- */
    const [name, setName] = useState(defaultTitle);

    /* ---------- Local References ---------- */
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    /* ---------- Stores ---------- */
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;

    /* ---------- Custom Hooks ---------- */
    const { handleFileChange: handleImgChange, fileURL: selectedImgUrl } = usePreviewFile("image");

    /* ---------- Derived Values ---------- */
    const isNameFiledEmpty = name.trim() == "";
    const isSaveButtonDisabled = isPending || isNameFiledEmpty;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#282828] text-white border-none rounded-md p-6 z-500">
                {/* Title */}
                <h2 className="text-xl font-semibold mb-4">Edit details</h2>

                <div className="flex gap-4 -mb-5">
                    {/* Conditional :- Entity Cover Or Entity Cover Placeholder */}
                    {
                        (selectedImgUrl || defaultImgUrl) ? (
                            <div
                                className={`group relative flex items-center justify-center w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                                    ? "md:w-52 md:h-52"
                                    : leftPanelSize >= 32 && leftPanelSize <= 38
                                        ? "md:w-35 md:h-35"
                                        : "md:w-40 md:h-40"
                                    } shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-[4px] bg-[#282828] text-[#7F7F7F] cursor-pointer`}
                                onClick={() => imageInputRef.current?.click()}
                            >
                                <img
                                    src={selectedImgUrl || defaultImgUrl}
                                    className="h-full w-full object-cover rounded-[4px]"
                                />

                                <div className="absolute inset-0 group-hover-flex flex-col items-center justify-center text-[#ffffff] bg-black/50 rounded-[4px]">
                                    <EditIcon width="50" height="50" />
                                    <h1 className="text-[#d1d5dc] dynamic-text-hover mt-2">Choose Photo</h1>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="z-500"
                                onClick={() => imageInputRef.current?.click()}
                            >
                                <EntityCoverPlaceholder placeholderIcon={placeholderIcon} isOwnEntity={true} />
                            </div>
                        )
                    }

                    <input
                        hidden
                        type="file"
                        ref={imageInputRef}
                        accept="image/*"
                        onChange={handleImgChange}
                    />

                    {/* Entity Name Input */}
                    <div className="flex flex-1 items-center justify-center">
                        <div className="relative w-full max-w-sm flex flex-col gap-2">
                            {/* Error Message */}
                            {isNameFiledEmpty && (
                                <div className="flex items-center gap-2 bg-[#E22134] text-white text-xs font-medium px-3 py-2 rounded-[4px]">
                                    <AlertIcon width="18" height="18" />
                                    <span>Playlist name is required</span>
                                </div>
                            )}

                            {/* Input Field */}
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

                </div>

                {/* Footer */}
                <div className="flex justify-end">
                    <button
                        className={`text-black ${isSaveButtonDisabled ? "bg-[#838485] cursor-not-allowed" : "bg-white cursor-pointer"} font-bold rounded-full px-7 py-3 text-sm transition`}
                        onClick={() => handleUpdateEntity({ title: name, coverImageUrl: selectedImgUrl || "" })}
                        disabled={isSaveButtonDisabled}
                    >
                        Save
                    </button>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-gray-400 mt-3 leading-snug">
                    By proceeding, you agree to give Spotify access to the image you choose
                    to upload. Please make sure you have the right to upload the image.
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default EditEntityDialog