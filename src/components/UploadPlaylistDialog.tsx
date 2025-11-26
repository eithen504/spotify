import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { CrossIcon, DownArrowIcon, UploadIcon } from "../Svgs";
import { GENRES } from "../constants";
import type { Genre, Genres, Visibility } from "../types";
import { usePreviewFile } from "../hooks/file";
import { useUploadPlaylist } from "../hooks/playlist";

interface UploadPlaylistDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadPlaylistDialog: React.FC<UploadPlaylistDialogProps> = ({ isOpen, onClose }) => {
  /* ---------- Local States ---------- */
  const [trackData, setTrackData] = useState({
    title: "",
    visibility: "Public" as Visibility,
  });
  const [selectedGenres, setSelectedGenres] = useState<Genres>([]);

  /* ---------- Local References ---------- */
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------- Custom Hooks ---------- */
  const { handleFileChange: handleImgChange, fileURL: imgUrl } = usePreviewFile("image");
  const { mutateAsync: uploadPlaylist, isPending } = useUploadPlaylist();

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

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as Genre;
    if (!selectedGenres.includes(selectedValue)) {
      setSelectedGenres((prev) => [...prev, selectedValue]);
    }
  };

  const removeGenre = (genreToRemove: Genre) => {
    setSelectedGenres(selectedGenres.filter(genre => genre !== genreToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    uploadPlaylist({
      title: trackData.title,
      coverImageUrl: imgUrl,
      genres: selectedGenres,
      tracks: [],
      visibility: trackData.visibility
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="hide-scrollbar bg-[#282828] shadow-[0_0_20px_rgba(0,0,0,1)] border-none max-h-[80vh] overflow-auto z-400 p-6">
        <DialogHeader>
          <div className="flex justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-white">Add New Playlist</DialogTitle>
              <DialogDescription className="text-white">Add a new playlist to your app</DialogDescription>
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
              name="title"
              value={trackData.title}
              onChange={handleTrackDataChange}
              type="text"
              className="w-full bg-[#3e3e3e] font-semibold text-white px-3 py-2 rounded outline-none focus:outline-none focus:ring-0 focus:border-transparent"
              required
            />
          </div>

          {/* Genre Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Genre</label>
            <div className="relative">
              <select
                className="w-full bg-[#282828] border border-white rounded-lg px-4 py-3 text-white cursor-pointer appearance-none"
                defaultValue=""
                onChange={handleGenreChange}
              >
                <option value="" disabled>Select a genre</option>
                {
                  GENRES.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))
                }
              </select>

              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-2 text-white flex items-center pointer-events-none">
                <DownArrowIcon width="17" height="17" />
              </div>
            </div>
          </div>

          {/* Selected Genre Tags */}
          {selectedGenres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map((genre) => (
                <div
                  key={genre}
                  className="flex items-center bg-[#1db954] rounded-full px-3 py-1 text-white text-sm"
                >
                  {genre}
                  <button
                    type="button"
                    onClick={() => removeGenre(genre)}
                    className="ml-2 text-gray-200 dynamic-text-hover cursor-pointer"
                  >
                    <CrossIcon width="12" height="12" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Visibility */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Visibility</label>

            <div className="flex items-center space-x-4 mt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="Public"
                  checked={trackData.visibility === "Public"}
                  onChange={handleTrackDataChange}
                  className="cursor-pointer"
                />
                <span className="text-sm text-gray-200">Public</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="Private"
                  checked={trackData.visibility === "Private"}
                  onChange={handleTrackDataChange}
                  className="cursor-pointer"
                />
                <span className="text-sm text-gray-200">Private</span>
              </label>
            </div>
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
                isPending ? "Uploading Playlist..." : "Upload Playlist"
              }
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
};

export default UploadPlaylistDialog;