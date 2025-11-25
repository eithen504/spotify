import type React from "react";
import { CrossIcon, LeftArrowIcon } from "../../../Svgs";
import { useLibrarySearchStore } from "../../../store/useLibrarySearchStore";

type SearchBarProps = {
    setIsSearchLibraryActive: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar: React.FC<SearchBarProps> = ({ setIsSearchLibraryActive }) => {
    const { searchQuery, setSearchQuery } = useLibrarySearchStore();

    return (
        <div className="w-full flex items-center justify-between px-5 py-4 bg-[#111]">
            {/* Navigate Back */}
            <button
                className="mr-3 text-[#8f8f8f] dynamic-text-hover cursor-pointer"
                onClick={() => setIsSearchLibraryActive(false)}
            >
                <LeftArrowIcon width="22" height="22" />
            </button>

            {/* Search Bar */}
            <div className="flex items-center flex-1 bg-[#2A2A2A] rounded-[4px] px-3 py-2">
                <input
                    value={searchQuery}
                    type="text"
                    placeholder="Search Your Library"
                    className="bg-transparent outline-none text-sm text-white ml-2 placeholder:text-[#ffffff] w-full"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {
                    searchQuery && (
                        <button
                            className="text-[#8f8f8f] dynamic-text-hover cursor-pointer"
                            onClick={() => setSearchQuery("")}
                        >
                            <CrossIcon width="20" height="20" />
                        </button>
                    )
                }
            </div>

        </div>
    );
};

export default SearchBar;
