import { useRef, useState } from "react";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import { useScrollStore } from "../store/useScrollStore";
import { useBreakPoint } from "../hooks/breakPoint";
import { getScrollThreshold } from "../utils";
import { ClockIcon, DropdownIcon, TickIcon } from "../Svgs";
import type { MenuOptions, TableColumnKey, TableColumns } from "../types";
import { useTableColumnVisibilityStore } from "../store/useTableColumnVisibilityStore";

interface EntityTableHeaderProps {
    tableColumns: TableColumns;
    options: MenuOptions;
}

const EntityTableHeader: React.FC<EntityTableHeaderProps> = ({ tableColumns, options }) => {
    /* ---------- Local States ---------- */
    const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);

    /* ---------- Stores ---------- */
    const { leftSidebar, rightSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { showNowPlayingView, showQueueView } = rightSidebar;
    const { tableView } = useTableColumnVisibilityStore();
    const { scrollFromTop } = useScrollStore();

    /* ---------- Local References ---------- */
    const columnMenuRef = useRef<HTMLDivElement>(null);

    /* ---------- Custom Hooks ---------- */
    const { breakPoint } = useBreakPoint();

    /* ---------- Derived Values ---------- */
    const showBackground = scrollFromTop >= getScrollThreshold(leftPanelSize);

    return (
        <div className={`sticky group top-16 left-0 w-full z-10 text-sm text-white/70 ${showBackground ? "bg-[#1F1F1F]" : ""} pb-2 px-10 pt-2 hidden md:flex`}>
            <div className="w-6">#</div>
            <div className="flex-1 truncate">Title</div>
            {
                tableView == "Compact List" ? (
                    <>
                        <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>
                            {tableColumns["ARTIST"].visible && "Artist"}
                        </div>
                        <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>
                            {tableColumns["ALBUM"]?.visible && "Album"}
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`${leftPanelSize <= 28 ? "block" : "hidden"} flex-1 truncate ml-5`}>
                            {tableColumns["ALBUM"]?.visible && "Album"}
                        </div>
                        <div className={`${leftPanelSize <= 25 ? "block" : "hidden"} w-32 truncate ml-5`}>
                            {tableColumns["DATE ADDED"]?.visible && "Date added"}
                        </div>
                    </>
                )
            }

            <div className="w-20 text-right truncate flex items-center justify-center">
                {tableColumns["DURATION"].visible && <ClockIcon width="18" height="18" />}
            </div>

            <div className="relative flex items-center" ref={columnMenuRef}>
                <button
                    className="cursor-pointer group-hover-opacity dynamic-text-hover"
                    onClick={() => {
                        setIsColumnMenuOpen((prev) => !prev);
                    }}
                >
                    <DropdownIcon width="15" height="15" />
                </button>

                {isColumnMenuOpen && (
                    <>
                        {/* Full-screen overlay to prevent scrolling */}
                        <div
                            className="fixed inset-0 z-800"
                            onClick={() => setIsColumnMenuOpen(false)}
                        />

                        <div
                            className="w-45 fixed z-800 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm"
                            style={{
                                top: `${(columnMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
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
                                options.map(({ label, action }) => {
                                    return (
                                        <button
                                            className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                            style={{
                                                '--bgHoverColor': '#3E3E3E',
                                            } as React.CSSProperties}
                                            onClick={action}
                                        >
                                            <span className={`${tableColumns[label.toUpperCase() as TableColumnKey]?.visible ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                                {label}
                                            </span>

                                            {
                                                tableColumns[label.toUpperCase() as TableColumnKey]?.visible && (
                                                    <p className="text-[#3BE477]">
                                                        <TickIcon width="15" height="15" />
                                                    </p>
                                                )
                                            }
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default EntityTableHeader

