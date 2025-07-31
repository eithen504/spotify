import { Link } from "react-router-dom"
import { BrowseIcon, HomeFilledIcon, SearchIcon } from "../../../../Svgs"
import { useRef } from "react";

const CenterSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-center flex-1 gap-3 justify-center">
            {/* Home Button */}
            <Link to={"/about"}>
                <button className="p-3 text-[#ffffff] bg-[#1f1f1f] hover:bg-[#282828] rounded-full flex items-center justify-center cursor-pointer">
                    <HomeFilledIcon />
                </button>
            </Link>

            {/* Search Bar */}
            <div className="max-w-[470px] w-full">
                <div
                    className="flex items-center bg-[#1f1f1f] rounded-full px-4 py-3 cursor-text"
                    onClick={() => inputRef.current?.focus()}
                >
                    <button
                        className="mr-3 text-[#adadad] hover:text-[#ffffff] cursor-pointer"
                        onClick={(e) => e.stopPropagation()} // pr+event button click from triggering container click
                    >
                        <SearchIcon />
                    </button>

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="What do you want to play?"
                        className="bg-transparent focus:outline-none flex-grow text-md placeholder:text-[#adadad]"
                    />

                    <div className="w-px h-6 bg-[#7C7C7C] mx-4"></div>

                    <div className="flex flex-col text-[#adadad] hover:text-[#ffffff] gap-1 cursor-pointer">
                        <BrowseIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CenterSection