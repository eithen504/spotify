import type React from "react";
import { SearchIcon } from "../Svgs";

type SearchForEntityProps = {
    title: string
}

const SearchForEntity: React.FC<SearchForEntityProps> = ({ title }) => {
    return (
        <div className="w-full text-white  rounded-lg relative pt-10 px-6  max-w-[90rem] mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{title}</h2>
            </div>

            {/* Search Input */}
            <div className="mt-4 relative">
                <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BDBDBD]"
                >
                    <SearchIcon width="17" height="17" />
                </button>
                <input
                    type="text"
                    placeholder="Search for songs or episodes"
                    className="w-2/5 pl-9 pr-4 py-2 rounded-[4px] bg-[#2A2A2A] text-white placeholder-[#BDBDBD] placeholder:text-[15px] focus:outline-none focus:ring-0"
                />
            </div>
        </div>
    );
};

export default SearchForEntity