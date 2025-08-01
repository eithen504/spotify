import React from 'react'
import { CrossIcon, SearchIcon } from '../../../../../Svgs';

interface SearchSeactionProps {
    isSearchActive: boolean;
    searchQuery: string;
    handleSearchIconClick: () => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClearSearchQuery: () => void;
}

const SearchSection: React.FC<SearchSeactionProps> = ({
    isSearchActive,
    searchQuery,
    handleSearchIconClick,
    handleInputChange,
    handleClearSearchQuery
}) => {
    return (
        <>
            <button
                onClick={handleSearchIconClick}
                className={`text-[#8f8f8f] ${isSearchActive ? "bg-[#2A2A2A] text-[#ffffff] rounded-l-[4px]" : "rounded-full"} dynamic-text-hover dynamic-bg-hover transition-colors cursor-pointer p-[6.5px]`}
                style={{
                    '--textHoverColor': '#ffffff',
                    '--bgHoverColor': '#2A2A2A',
                } as React.CSSProperties}
            >
                <SearchIcon width="17" height="17" />
            </button>

            {
                isSearchActive && (
                    <div className="flex items-center bg-[#2A2A2A] rounded-[4px] mr-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Search in Your Library"
                            className="bg-[#2A2A2A] text-white text-sm outline-none flex-1 w-full placeholder-[#8f8f8f] placeholder:font-semibold p-[5px] rounded-r-[4px]"
                        />
                        {
                            searchQuery && (
                                <button
                                    className="mr-2 text-[#8f8f8f] dynamic-text-hover cursor-pointer"
                                    style={{
                                        '--textHoverColor': '#ffffff',
                                    } as React.CSSProperties}
                                    onClick={handleClearSearchQuery}
                                >
                                    <CrossIcon width="15" height="15" />
                                </button>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default SearchSection