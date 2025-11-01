import { useEffect, useRef, useState } from 'react';
import { MicIcon, SearchIcon } from '../../../Svgs';
import RecentSearchesDropdown from '../../../layouts/desktopLayout/components/header/RecentSearchesDropdown';
import ListeningDialog from '../../../layouts/desktopLayout/components/header/ListeningDialog';

const SearchBar = () => {
    const [isListeningDialogOpen, setIsListeningDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const searchBarRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isRecentSearchesDropdownOpen, setIsRecentSearchesDropdownOpen] = useState(false);

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

    return (
        <div className={`block md:hidden w-full p-4 md:p-6`}>
            <h2 className="text-2xl font-bold text-white mb-4">
                Search
            </h2>
            <div className="relative" ref={searchBarRef}>
                <div
                    className="flex items-center gap-2 bg-white text-black rounded-[4px] px-4 py-[9px] w-full max-w-4xl mx-auto"
                    onClick={() => inputRef.current?.focus()}
                >
                    <SearchIcon />

                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsRecentSearchesDropdownOpen(true)}
                        placeholder="What do you want to listen to?"
                        className="bg-transparent focus:outline-none w-full placeholder-black"
                    />

                    <button className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRecentSearchesDropdownOpen(false);
                            setIsListeningDialogOpen(true);
                        }}
                    >
                        <MicIcon />
                    </button>

                </div>

                {/* Recent Searches Dropdown */}
                {isRecentSearchesDropdownOpen && (
                    <RecentSearchesDropdown
                        searchQuery={searchQuery}
                        onClose={() => setIsRecentSearchesDropdownOpen(false)}
                    />
                )}
            </div>

            {isListeningDialogOpen && (
                <ListeningDialog
                    inputRef={inputRef}
                    setSearchQuery={setSearchQuery}
                    onClose={() => setIsListeningDialogOpen(false)}
                />
            )}
        </div>
    )
}

export default SearchBar