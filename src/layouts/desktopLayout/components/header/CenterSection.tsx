import { Link, useLocation, useNavigate } from "react-router-dom"
import { BrowseIcon, BrowserFilledIcon, CrossIcon, HomeFilledIcon, HomeIcon, MicIcon, SearchIcon } from "../../../../Svgs"
import { useEffect, useRef, useState } from "react";
import RecentSearchesDropdown from "./RecentSearchesDropdown";
import ListeningInterfaceDialog from "./ListeningInterfaceDialog";

const CenterSection = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isHomePage = pathname == "/";
    const inputRef = useRef<HTMLInputElement>(null);
    const searchBarRef = useRef<HTMLDivElement | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [isRecentSearchesDropdownOpen, setIsRecentSearchesDropdownOpen] = useState(false);
    const [isListeningInterfaceOpen, setIsListeningInterfaceOpen] = useState(false);

    const handleClearSearchQuery = () => setSearchQuery("");

    const isSearchPage = pathname == "/search";

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
                setIsRecentSearchesDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === "k") {
                event.preventDefault(); // prevent browser’s default find action
                console.log("Ctrl + K pressed!");
                // 👉 Example: focus search input
                inputRef.current?.focus();
                navigate("/search")
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.focus();
        }
    }, [searchQuery])

    return (
        <div className="flex items-center flex-1 gap-3 justify-center">
            {/* Home Button */}
            <Link to={"/"}
                className="p-3 text-[#ffffff] bg-[#1f1f1f] dynamic-bg-hover rounded-full flex items-center justify-center cursor-pointer"
                style={{
                    '--bgHoverColor': '#282828',
                } as React.CSSProperties}
                title="Home"
            >
                {isHomePage ? <HomeFilledIcon /> : <HomeIcon />}
            </Link>

            {/* Search Bar */}
            <div className="max-w-[470px] w-full relative" ref={searchBarRef}>
                <div
                    className={`flex items-center bg-[#1f1f1f] rounded-full px-4 py-[11px] cursor-text ${isRecentSearchesDropdownOpen ? "border border-[#ffffff]" : "border border-transparent"}`}
                    onClick={() => inputRef.current?.focus()}
                >
                    <button
                        className={`mr-3 text-[#adadad] ${searchQuery.trim() ? "dynamic-text-hover cursor-pointer" : ""}`}
                    >
                        <SearchIcon />
                    </button>

                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsRecentSearchesDropdownOpen(true)}
                        placeholder="What do you want to play?"
                        className="bg-transparent focus:outline-none flex-grow text-md placeholder:text-[#adadad] text-[#ffffff]"
                    />

                    {
                        searchQuery.trim() ? (
                            <button
                                className="flex flex-col text-[#adadad] dynamic-text-hover gap-1 cursor-pointer"
                                onClick={handleClearSearchQuery}
                            >
                                <CrossIcon />
                            </button>
                        ) : (
                            <button
                                className="flex flex-col text-[#adadad] dynamic-text-hover gap-1 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsRecentSearchesDropdownOpen(false);
                                    setIsListeningInterfaceOpen(true);
                                }}
                            >
                                <MicIcon />
                            </button>
                        )
                    }

                    <div className="w-px h-6 bg-[#7C7C7C] mx-4"></div>

                    <Link
                        to={"/search"}
                        className={`flex flex-col ${isSearchPage ? "text-[#ffffff]" : "text-[#adadad]"} dynamic-text-hover gap-1 cursor-pointer`}
                        onClick={(e) => e.stopPropagation()}
                        title="Browse"
                    >
                        {
                            isSearchPage ? <BrowserFilledIcon /> : <BrowseIcon />
                        }
                    </Link>
                </div>

                {isRecentSearchesDropdownOpen && (
                    <RecentSearchesDropdown
                        searchQuery={searchQuery}
                        onClose={() => setIsRecentSearchesDropdownOpen(false)}
                    />
                )}
            </div>

            {isListeningInterfaceOpen && (
                <ListeningInterfaceDialog
                    setSearchQuery={setSearchQuery}
                    onClose={() => setIsListeningInterfaceOpen(false)}
                />
            )}
        </div>
    )
}

export default CenterSection