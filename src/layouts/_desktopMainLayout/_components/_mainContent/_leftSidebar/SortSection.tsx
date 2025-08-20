import React, { useRef, useState } from 'react';
import { LEFT_SIDEBAR_SORT_OPTIONS, LEFT_SIDEBAR_VIEW_ICONS, LEFT_SIDEBAR_VIEW_OPTIONS } from '../../../../../Constants';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { TickIcon } from '../../../../../Svgs';

interface SortSectionProps {
    isSearchActive: boolean;
}

const SortSection: React.FC<SortSectionProps> = ({ isSearchActive }) => {
    const { preferences: { isLeftSidebarExpanded, sort, view }, setPreferences } = useUIPreferencesStore();
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const sortDropdownRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={sortDropdownRef}
            className="relative flex items-center"
        >
            <div className="text-[#8f8f8f] dynamic-text-hover space-x-2 cursor-pointer flex items-center"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
                {
                    (!isSearchActive || isLeftSidebarExpanded) && (
                        <span className="text-sm font-semibold min-w-0">{sort}</span>
                    )
                }
                <button className="transition-colors cursor-pointer">
                    {
                        LEFT_SIDEBAR_VIEW_ICONS[view]
                    }
                </button>
            </div>

            {isSortDropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-800"
                        onClick={() => setIsSortDropdownOpen(false)}
                    />

                    <div
                        className="fixed w-52 z-800 bg-[#282828] rounded-[4px] shadow-[0_4px_5px_rgba(0,0,0,0.8)] text-sm text-[#ffffff]"
                        style={{
                            top: `${(sortDropdownRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
                            ...((isLeftSidebarExpanded) && {
                                right: `30px`,
                            }),
                        }}
                    >
                        <div className="space-y-0 p-1">
                            <p className="text-xs text-[#e5e7eb] p-2">Sort by</p>
                            {
                                LEFT_SIDEBAR_SORT_OPTIONS.map((option) => (
                                    <div
                                        key={option}
                                        className={`flex ${sort == option ? "text-[#1ED45F]" : "text-[#e5e7eb]"} p-2 dynamic-bg-hover justify-between items-center cursor-pointer`}
                                        style={{
                                            '--bgHoverColor': '#3E3E3E',
                                        } as React.CSSProperties}
                                        onClick={() => setPreferences({ sort: option })}
                                    >
                                        {option}
                                        {
                                            sort == option && (
                                                <TickIcon width="14" height="14" />
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <hr className="border-[#3e3e3e] my-2 mx-1" />

                        <div className="px-1 pb-1 space-y-2">
                            <p className="text-xs text-[#e5e7eb] px-2">View as</p>
                            <div className="flex items-center bg-[#1F1F1F] rounded-lg p-1">
                                {
                                    LEFT_SIDEBAR_VIEW_OPTIONS.map((option) => (
                                        <button
                                            key={option.label}
                                            className={`px-4 py-2 text-[#8f8f8f] dynamic-text-hover ${option.label == view ? "text-[#ffffff] bg-[#3e3e3e]" : ""} rounded-sm cursor-pointer`}
                                            onClick={() => {
                                                setPreferences({ view: option.label })
                                                localStorage.setItem("view", option.label)
                                            }}
                                        >
                                            {option.icon}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default SortSection