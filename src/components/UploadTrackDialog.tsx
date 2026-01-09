import { useRef, useState } from "react";
import { useUploadTrack } from "../hooks/track";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { CrossIcon, DownArrowIcon, UploadIcon } from "../Svgs";
import { LANGUAGES, MAX_AUDIO_DURATION } from "../constants";
import type { Language } from "../types";
import { usePreviewFile } from "../hooks/file";

interface UploadTrackDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadTrackDialog: React.FC<UploadTrackDialogProps> = ({ isOpen, onClose }) => {
    /* ---------- Local States ---------- */
    const [trackData, setTrackData] = useState({
        title: "",
        artist: "",
        duration: 0,
        albumId: "",
    });
    const [languages, setLanguages] = useState<Language[]>([]);

    /* ---------- Local References ---------- */
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const audioInputRef = useRef<HTMLInputElement | null>(null);

    /* ---------- Custom Hooks ---------- */
    const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
    const { handleFileChange: handleAudioChange, fileURL: audioUrl } = usePreviewFile("audio");
    const { mutateAsync: uploadTrack, isPending } = useUploadTrack();

    /* ---------- Methods Or Functions ---------- */
    const handleTrackDataChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTrackData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value as Language;
        if (!languages.includes(newLanguage)) {
            setLanguages((prev) => [...prev, newLanguage]);
        }
    };

    const removeLanguage = (language: Language) => {
        const newLanguages = languages.filter(l => l !== language);
        setLanguages(newLanguages);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!trackData.title) {
            toast.error("Title is required field!")
            return;
        }

        if (!audioUrl) {
            toast.error("Please select an audio file!")
            return;
        }

        const isAudioDurationExceeded = trackData.duration > MAX_AUDIO_DURATION;
        if (isAudioDurationExceeded) {
            toast.error("Audio duration must be less than 7 minutes. Please upload a shorter file.");
            return;
        }

        await uploadTrack({
            title: trackData.title,
            coverImageUrl: imgUrl || "",
            audioUrl,
            artist: trackData.artist,
            duration: trackData.duration,
            albumId: trackData.albumId || null,
            languages
        })
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="hide-scrollbar bg-[#282828] shadow-[0_0_20px_rgba(0,0,0,1)] border-none max-h-[80vh] overflow-auto z-400 p-6">
                <DialogHeader>
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-white">Add New Track</DialogTitle>
                            <DialogDescription className="text-white">Add a new track to your app</DialogDescription>
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

                    <input
                        type="file"
                        accept="audio/*"
                        ref={audioInputRef}
                        hidden
                        onChange={(e) => {
                            handleAudioChange(e);
                            const file = e.target.files?.[0];
                            if (file) {
                                const audio = new Audio(URL.createObjectURL(file));
                                audio.onloadedmetadata = () => {
                                    // Format the duration before setting it
                                    const durationInSeconds = audio.duration;
                                    setTrackData({ ...trackData, duration: durationInSeconds });
                                };
                            }
                        }}
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

                    {/* Audio Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Audio File</label>
                        <button
                            type="button"
                            className={`${audioUrl ? "border border-[#ffffff]" : "border border-white/40 dynamic-border-hover"} w-full px-4 py-2 text-sm text-[#1db954] rounded-md transition cursor-pointer`}
                            onClick={() => audioInputRef.current?.click()}
                        >
                            Choose Audio File
                        </button>
                        {audioUrl && (
                            <audio controls src={audioUrl} className="mt-2 w-full">
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Title</label>
                        <input
                            name="title"
                            value={trackData.title}
                            onChange={handleTrackDataChange}
                            type="text"
                            className="w-full bg-[#3e3e3e] font-semibold text-white px-3 py-2 rounded outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Artist */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Artist</label>
                        <input
                            name="artist"
                            value={trackData.artist}
                            onChange={handleTrackDataChange}
                            type="text"
                            className="w-full bg-[#3e3e3e] font-semibold text-white px-3 py-2 rounded outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                    </div>

                    {/* AlbumId */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Album Id</label>
                        <input
                            name="albumId"
                            value={trackData.albumId}
                            onChange={handleTrackDataChange}
                            type="text"
                            className="w-full bg-[#3e3e3e] font-semibold text-white px-3 py-2 rounded outline-none focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                    </div>

                    {/* Language Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Language</label>
                        <div className="relative">
                            <select
                                name="language"
                                className="w-full bg-[#282828] border border-white rounded-lg px-4 py-3 text-white cursor-pointer appearance-none"
                                // defaultValue={trackData.language}
                                onChange={handleLanguageChange}
                            >
                                <option value="" disabled>Select a language</option>
                                {
                                    LANGUAGES.map((language) => (
                                        <option key={language} value={language}>{language}</option>
                                    ))
                                }
                            </select>

                            {/* Custom Dropdown Arrow */}
                            <div className="absolute inset-y-0 right-2 text-white flex items-center pointer-events-none">
                                <DownArrowIcon width="17" height="17" />
                            </div>
                        </div>
                    </div>

                    {/* Selected Languages */}
                    {languages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {languages.map((language) => (
                                <div
                                    key={language}
                                    className="flex items-center bg-[#1db954] rounded-full px-3 py-1 text-white text-sm"
                                >
                                    {language}
                                    <button
                                        type="button"
                                        onClick={() => removeLanguage(language)}
                                        className="ml-2 text-gray-200 dynamic-text-hover cursor-pointer"
                                    >
                                        <CrossIcon width="12" height="12" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

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
                                isPending ? "Uploading Track..." : "Upload Track"
                            }
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
};

export default UploadTrackDialog;