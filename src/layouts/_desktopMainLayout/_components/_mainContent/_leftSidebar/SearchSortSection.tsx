import { DefaultListIcon, SearchIcon } from "../../../../../Svgs"

const SearchSortSection = () => {
    return (
        <div className="flex items-center justify-between mb-3 px-5">
            {/* Search Icon */}
            <button className="text-[#8f8f8f] hover:text-[#ffffff] transition-colors cursor-pointer">
                <SearchIcon width="17" height="17" />
            </button>

            {/* Recently Added Filter */}
            <div className="flex items-center text-[#8f8f8f] hover:text-[#ffffff] space-x-1 cursor-pointer">
                <span className="text-sm font-semibold">Recently Added</span>
                <button className="transition-colors cursor-pointer">
                    <DefaultListIcon width="16" height="16" />
                </button>
            </div>
        </div>
    )
}

export default SearchSortSection