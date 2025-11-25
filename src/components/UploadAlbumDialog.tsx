import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { UploadIcon } from "../Svgs";
import { usePreviewFile } from "../hooks/file";
import { useUploadAlbum } from "../hooks/album";

interface UploadAlbumDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadAlbumDialog: React.FC<UploadAlbumDialogProps> = ({ isOpen, onClose }) => {
    /* ---------- Local States ---------- */
    const [title, setTitle] = useState("");

    /* ---------- Local References ---------- */
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    /* ---------- Custom Hooks ---------- */
    const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
    const { mutateAsync: uploadAlbum, isPending } = useUploadAlbum();

    /* ---------- Methods Or Functions ---------- */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        uploadAlbum({ title, coverImageUrl: imgUrl })
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="hide-scrollbar bg-[#282828] shadow-[0_0_20px_rgba(0,0,0,1)] border-none max-h-[80vh] overflow-auto z-400 p-6">
                <DialogHeader>
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-white">Add New Album</DialogTitle>
                            <DialogDescription className="text-white">Add a new Album to your app</DialogDescription>
                        </div>

                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    {/* File upload logic for image */}
                    <input
                        hidden
                        type="file"
                        ref={imageInputRef}
                        accept="image/*"
                        onChange={handleImgChange}
                    />

                    {/* Image Preview */}
                    <div
                        className={`${imgUrl ? "border-dashed border-[#ffffff]" : "border-dashed border-white/40 dynamic-border-hover"} flex items-center justify-center p-6 border-2  rounded-lg cursor-pointer`}
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className="text-center">
                            {imgUrl ? (
                                <div className="space-y-2">
                                    <img
                                        src={imgUrl}
                                        alt="Selected artwork"
                                        className="max-h-40 object-contain rounded-sm"
                                    />
                                    <div className="text-sm text-[#1db954]">Image selected</div>
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 bg-[#282828]  shadow-[0_0_20px_rgba(0,0,0,0.4)] text-[#ffffff] rounded-full inline-block mb-2">
                                        <UploadIcon width="24" height="24" />
                                    </div>
                                    <div className="text-sm text-zinc-400 mb-2">Upload artwork</div>
                                    <button
                                        className="px-3 py-2 text-xs text-[#1db954] border border-white/40 dynamic-border-hover rounded-md transition cursor-pointer"
                                        type="button"
                                    >
                                        Choose File
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="w-full bg-[#3e3e3e] font-semibold text-white px-3 py-2 rounded outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                            required
                        />
                    </div>

                    <DialogFooter className="mt-7">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-[#ffffff] border border-white/40 dynamic-border-hover cursor-pointer rounded-md transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-semibold cursor-pointer text-white bg-[#1db954] rounded-md transition"
                            disabled={isPending}
                        >
                            {
                                isPending ? "Uploading Album..." : "Upload Album"
                            }
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default UploadAlbumDialog;