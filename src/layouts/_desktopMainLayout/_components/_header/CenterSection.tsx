import { Link, useLocation } from "react-router-dom"
import { BrowseIcon, CrossIcon, HomeFilledIcon, HomeIcon, SearchIcon } from "../../../../Svgs"
import { useEffect, useRef, useState } from "react";
import RecentSearchesDropdown from "./RecentSearchesDropdown";

const CenterSection = () => {
    const { pathname } = useLocation();
    const isHomePage = pathname == "/";
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const searchBarRef = useRef<HTMLDivElement | null>(null);

    const handleClearSearchQuery = () => setSearchQuery("");

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center flex-1 gap-3 justify-center">
            {/* Home Button */}
            <Link to={"/"}>
                <button
                    className="p-3 text-[#ffffff] bg-[#1f1f1f] dynamic-bg-hover rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                        '--bgHoverColor': '#282828',
                    } as React.CSSProperties}
                    title="Home"
                >
                    {
                        isHomePage ? (
                            <HomeFilledIcon />
                        ) : (
                            <HomeIcon />
                        )
                    }
                </button>
            </Link>

            {/* Search Bar */}
            <div className="max-w-[470px] w-full relative" ref={searchBarRef}>
                <div
                    className={`flex items-center bg-[#1f1f1f] rounded-full px-4 py-[11px] cursor-text ${isFocused ? "border border-white" : "border border-transparent"}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <button
                        className={`mr-3 text-[#adadad] ${searchQuery ? "dynamic-text-hover cursor-pointer" : ""}`}
                    >
                        <SearchIcon />
                    </button>

                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        placeholder="What do you want to play?"
                        className="bg-transparent focus:outline-none flex-grow text-md placeholder:text-[#adadad]"
                    />

                    {
                        searchQuery && (
                            <button
                                className="flex flex-col text-[#adadad] dynamic-text-hover gap-1 cursor-pointer"
                                onClick={handleClearSearchQuery}
                            >
                                <CrossIcon />
                            </button>
                        )
                    }

                    <div className="w-px h-6 bg-[#7C7C7C] mx-4"></div>

                    <button
                        className="flex flex-col text-[#adadad] dynamic-text-hover gap-1 cursor-pointer"
                    >
                        <BrowseIcon />
                    </button>
                </div>

                {isFocused && (
                    <RecentSearchesDropdown />
                )}
            </div>
        </div>
    )
}

export default CenterSection