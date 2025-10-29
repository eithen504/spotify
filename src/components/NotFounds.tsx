import type React from "react"
import { AlertIcon, LogoIcon, MusicIcon, QueueIcon } from "../Svgs"
import { Link } from "react-router-dom";


const NotFoundPage = () => {
  return (
    <div className="bg-[#121212] text-white h-screen flex flex-col justify-center items-center text-center px-4">
      {/* Spotify logo */}
      <div className="mb-8 text-[#3BE477]">
        <LogoIcon width="65" height="65" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4">{"Page not found"}</h1>

      {/* Subtext */}
      <p className="text-gray-400 mb-8">
        We can’t seem to find the page you are looking for.
      </p>

      {/* Home button */}
      <Link to={"/"}>
        <button className="bg-white text-black font-bold py-3 px-8 rounded-full cursor-pointer transition mb-6">
          Home
        </button>
      </Link>

      {/* Help link */}
      <a
        href="#"
        className="text-white font-bold underline hover:text-gray-300"
      >
        Help
      </a>
    </div>
  );
};

interface NotFoundEntityProps {
  title: string;
  subtitle?: string
}

const NotFoundEntity: React.FC<NotFoundEntityProps> = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center h-screen md:h-full">
      <div className="text-center space-y-4">
        {/* Icon */}
        <div className="flex items-center justify-center mx-auto text-[#ffffff]">
          <AlertIcon width="70" height="70" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold">{title}</h1>

        {/* Subtitle */}
        <p className="text-gray-200">{subtitle || "Search for something else?"}</p>
      </div>
    </div>
  )
}

interface NotFoundTracksProps {
  title: string;
  subtitle?: string

}

const NotFoundTracks: React.FC<NotFoundTracksProps> = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center relative">
      <div className="text-center mt-13 space-y-4">
        {/* Title */}
        <h1 className="text-3xl font-bold">{title}</h1>

        {/* Subtitle */}
        <p className="text-gray-200">{subtitle || "Search for something else?"}</p>

        {/* Icon */}
        <div className="flex items-center justify-center mx-auto text-white">
          <MusicIcon width="70" height="70" />
        </div>
      </div>
    </div>
  );
};

const NotFoundFolderPlaylists = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <p className="text-2xl font-bold">This folder looks empty</p>
      <p className="text-sm font-medium text-[#d1d5dc]">Start adding playlist by dragging and dropping </p>
    </div>
  )
}

const NotFoundQueueItems = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-white px-4">
      {/* Icon */}
      <div className="flex flex-col items-center justify-center mb-4">
        <QueueIcon width="30" height="30" />
      </div>

      {/* Title */}
      <p className="text-lg font-bold">Add to your queue</p>

      {/* Subtitle */}
      <p className="text-[#d1d5dc] text-sm mt-2 text-center">
        Tap <span className="font-medium">"Add to queue"</span> from a track's menu to see it here
      </p>

      {/* Button */}
      <Link
        to={"/search"}
        className="mt-6 rounded-full px-5 py-1.5 cursor-pointer text-sm font-bold bg-white text-black hover:bg-gray-200 transition"
      >
        Find something to play
      </Link>
    </div>
  )
}

const NotResultFoundSubMenu = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <p className="text-base font-medium">No Result Found</p>
      <p className="text-sm text-[#d1d5dc]">Try adjusting your search query</p>
    </div>
  )
}

export {
  NotFoundPage,
  NotFoundEntity,
  NotFoundTracks,
  NotFoundFolderPlaylists,
  NotFoundQueueItems,
  NotResultFoundSubMenu
}


