import { useRef, useState } from "react";
import type { Column, Columns } from "../types";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import { useScrollStore } from "../store/useScrollStore";
import { useBreakPoint } from "../hooks/breakPoint";
import { getScrollThreshold } from "../utils";
import { ClockIcon, DropdownIcon, TickIcon } from "../Svgs";

interface EntityTableHeaderProps {
    view: "Compact List" | "Default List";
    columns: Record<Column, boolean>;
    setColumns: React.Dispatch<React.SetStateAction<Columns>>
}

const EntityTableHeader: React.FC<EntityTableHeaderProps> = ({ view, columns, setColumns }) => {
    const { preferences: { leftPanelSize, showNowPlayingView, showQueueView } } = useUIPreferencesStore();
    const { scrollFromTop } = useScrollStore();
    const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
    const {breakPoint} = useBreakPoint();
    const columnDropdownRef = useRef<HTMLDivElement>(null);

    // Calculate the background class based on conditions
    const showBackground = scrollFromTop >= getScrollThreshold(leftPanelSize);

    return (
        <div className={`sticky group top-16 left-0 w-full z-10 text-sm text-white/70 ${showBackground ? "bg-[#1F1F1F]" : ""} pb-2 px-10 pt-2 hidden md:flex`}>
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

            <div className="relative flex items-center" ref={columnDropdownRef}>
                <button className="cursor-pointer group-hover-opacity dynamic-text-hover"
                    onClick={() => {
                        setIsColumnDropdownOpen((prev) => !prev);
                    }}
                >
                    <DropdownIcon width="15" height="15" />
                </button>

                {isColumnDropdownOpen && (
                    <>
                        {/* Full-screen overlay to prevent scrolling */}
                        <div
                            className="fixed inset-0 z-800"
                            onClick={() => setIsColumnDropdownOpen(false)}
                        />

                        <div
                            className="w-45 fixed z-800 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm"
                            style={{
                                top: `${(columnDropdownRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
                                ...((breakPoint === "md" || (!showNowPlayingView && !showQueueView)) && {
                                    right: `47px`,
                                }),
                            }}

                        >
                            <div className={`text-white/90 w-full flex items-center justify-between p-2.5 `}>
                                <span className="flex items-center gap-3 text-xs">
                                    Column
                                </span>
                            </div>

                            {
                                view == "Compact List" ? (
                                    <>
                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={() => {
                                                setColumns((prev) => ({
                                                    ...prev,
                                                    Artist: !prev.Artist,
                                                }));
                                            }}
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

                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={() => {
                                                setColumns((prev) => ({
                                                    ...prev,
                                                    Album: !prev.Album,
                                                }));
                                            }}
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

                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={() => {
                                                setColumns((prev) => ({
                                                    ...prev,
                                                    Duration: !prev.Duration,
                                                }));
                                            }}
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
                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={() => {
                                                setColumns((prev) => ({
                                                    ...prev,
                                                    Album: !prev.Album,
                                                }));
                                            }}
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

                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={() => {
                                                setColumns((prev) => ({
                                                    ...prev,
                                                    "Date added": !prev["Date added"],
                                                }));
                                            }}
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

                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={() => {
                                                setColumns((prev) => ({
                                                    ...prev,
                                                    Duration: !prev.Duration,
                                                }));
                                            }}
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
                    </>
                )}
            </div>
        </div>
    )
}

export default EntityTableHeader