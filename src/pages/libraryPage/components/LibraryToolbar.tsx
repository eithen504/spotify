import { useState } from "react";
import { VIEW_ICONS } from "../../../constants";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";
import { ArrowUpDownIcon } from "../../../Svgs";
import SortOptionsDrawer from "./SortOptionsDrawer";
import type { LibraryView } from "../../../types";


const LibraryToolbar = () => {
    /* ---------- Local States ---------- */
    const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);

    /* ---------- Stores ---------- */
    const { library, setLibrary } = useUIPreferencesStore();
    const { sort: librarySort, view: libraryView } = library;

    /* ---------- Derived Values ---------- */
    const SortDrawerOptions = [
        {
            label: "Recently Added",
            action: () => {
                setLibrary({ sort: "Recently Added" });
            }
        },
        {
            label: "Alphabetical A To Z",
            action: () => {
                setLibrary({ sort: "Alphabetical A To Z" });
            }
        },
        {
            label: "Alphabetical Z To A",
            action: () => {
                setLibrary({ sort: "Alphabetical Z To A" });
            }
        },
    ]

    /* ---------- Methods Or Functions ---------- */
    const handleToggleView = () => {
        const newLibraryView = libraryView == "Default Grid" ? "Default List" : "Default Grid";
        setLibrary({ view: newLibraryView });
    }

    return (
        <>
            <div className="flex items-center justify-between mt-30 md:mt-0 mb-3 px-6 relative">
                {/* Sort */}
                <button
                    className="flex items-center cursor-pointer text-[#8f8f8f] dynamic-text-hover "
                    onClick={() => setIsSortDrawerOpen(true)}
                >
                    <span className="text-[13px] font-semibold min-w-0 mr-1">{librarySort}</span>
                    <ArrowUpDownIcon width="16" height="16" />
                </button>

                {/* View */}
                <button
                    className="transition-colors cursor-pointer text-[#8f8f8f] dynamic-text-hover "
                    onClick={handleToggleView}
                >
                    {
                        VIEW_ICONS[libraryView as LibraryView]
                    }
                </button>
            </div>

            {
                isSortDrawerOpen && (
                    <SortOptionsDrawer
                        options={SortDrawerOptions}
                        onClose={() => setIsSortDrawerOpen(false)}
                        height="214px"
                    />
                )
            }
        </>
    );
};

export default LibraryToolbar;
