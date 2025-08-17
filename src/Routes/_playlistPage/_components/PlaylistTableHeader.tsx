import type React from "react";
import { useScrollStore } from "../../../store/useScrollStore";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";
import { ClockIcon, DropdownIcon, TickIcon } from "../../../Svgs";
import { getScrollThreshold } from "../../../utils";
import { useEffect, useRef, useState } from "react";
import type { Column } from "../../../Types";

interface PlaylistTableHeaderProps {
    view: "Compact List" | "Default List";
    columns: Record<Column, boolean>;
    setColumns: React.Dispatch<React.SetStateAction<Record<Column, boolean>>>
}

const PlaylistTableHeader: React.FC<PlaylistTableHeaderProps> = ({ view, columns, setColumns }) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const { scrollFromTop, setShouldHideScroll } = useScrollStore();
    const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
    const columnDropdownRef = useRef<HTMLDivElement>(null);

    // Calculate the background class based on conditions
    const shouldShowBackground = scrollFromTop >= getScrollThreshold(leftPanelSize);
    const backgroundClass = shouldShowBackground ? "bg-[#1F1F1F]" : "";

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target as Node)) {
                setIsColumnDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`sticky group top-16 left-0 w-full z-500 text-sm text-white/70 ${backgroundClass} pb-2 px-10 pt-2 hidden md:flex`}>
            <div className="w-6">#</div>
            <div className="flex-1 truncate">Title</div>
            {
                view == "Compact List" ? (
                    <>
                        <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>
                            {columns["Artist"] && "Artist"}
                        </div>
                        <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>
                            {columns["Album"] && "Album"}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>
                            {columns["Album"] && "Album"}
                        </div>
                        <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>
                            {columns["Date added"] && "Date added"}
                        </div>
                    </>
                )
            }

            <div className="w-20 text-right truncate flex items-center justify-center">
                {columns["Duration"] && <ClockIcon width="18" height="18" />}
            </div>

            <div className="relative" ref={columnDropdownRef}>
                <button className="cursor-pointer group-hover-opacity dynamic-text-hover"
                    onClick={() => {
                        setIsColumnDropdownOpen((prev) => !prev);
                        setShouldHideScroll(true)
                    }}
                >
                    <DropdownIcon width="15" height="15" />
                </button>

                {isColumnDropdownOpen && (
                    <div className="w-45 absolute z-500 bottom-9 right-0 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm">
                        <div className={`text-white/90 w-full flex items-center justify-between p-2.5 `}>
                            <span className="flex items-center gap-3 text-xs">
                                Column
                            </span>
                        </div>

                        {
                            view == "Compact List" ? (
                                <>
                                    <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                                        onClick={() => setColumns({
                                            "Artist": !columns["Artist"],
                                            "Album": columns["Album"],
                                            "Duration": columns["Duration"],
                                            "Date added": false,
                                        })}
                                    >
                                        <span className={`${columns["Artist"] ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                            Artist
                                        </span>

                                        {
                                            columns["Artist"] && (
                                                <p className="text-[#3BE477]">
                                                    <TickIcon width="15" height="15" />
                                                </p>
                                            )
                                        }
                                    </button>

                                    <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                                        onClick={() => setColumns({
                                            "Artist": columns["Artist"],
                                            "Album": !columns["Album"],
                                            "Duration": columns["Duration"],
                                            "Date added": false,
                                        })}
                                    >
                                        <span className={`${columns["Album"] ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                            Album
                                        </span>

                                        {
                                            columns["Album"] && (
                                                <p className="text-[#3BE477]">
                                                    <TickIcon width="15" height="15" />
                                                </p>
                                            )
                                        }
                                    </button>

                                    <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                                        onClick={() => setColumns({
                                            "Artist": columns["Artist"],
                                            "Album": columns["Album"],
                                            "Duration": !columns["Duration"],
                                            "Date added": false,
                                        })}
                                    >
                                        <span className={`${columns["Duration"] ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                            Duration
                                        </span>

                                        {
                                            columns["Duration"] && (
                                                <p className="text-[#3BE477]">
                                                    <TickIcon width="15" height="15" />
                                                </p>
                                            )
                                        }
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                                        onClick={() => setColumns({
                                            "Artist": false,
                                            "Album": !columns["Album"],
                                            "Duration": columns["Duration"],
                                            "Date added": columns["Date added"],
                                        })}
                                    >
                                        <span className={`${columns["Album"] ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                            Album
                                        </span>

                                        {
                                            columns["Album"] && (
                                                <p className="text-[#3BE477]">
                                                    <TickIcon width="15" height="15" />
                                                </p>
                                            )
                                        }
                                    </button>

                                    <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                                        onClick={() => setColumns({
                                            "Artist": false,
                                            "Album": columns["Album"],
                                            "Duration": columns["Duration"],
                                            "Date added": !columns["Date added"],
                                        })}
                                    >
                                        <span className={`${columns["Date added"] ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                            Date added
                                        </span>

                                        {
                                            columns["Date added"] && (
                                                <p className="text-[#3BE477]">
                                                    <TickIcon width="15" height="15" />
                                                </p>
                                            )
                                        }
                                    </button>

                                    <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                                        onClick={() => setColumns({
                                            "Artist": false,
                                            "Album": columns["Album"],
                                            "Duration": !columns["Duration"],
                                            "Date added": columns["Date added"],
                                        })}
                                    >
                                        <span className={`${columns["Duration"] ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                            Duration
                                        </span>

                                        {
                                            columns["Duration"] && (
                                                <p className="text-[#3BE477]">
                                                    <TickIcon width="15" height="15" />
                                                </p>
                                            )
                                        }
                                    </button>
                                </>
                            )
                        }
                    </div>
                )}
            </div>

        </div>
    )
}

export default PlaylistTableHeader