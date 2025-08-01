import React from 'react';
import { LEFT_SIDEBAR_SORT_OPTIONS, LEFT_SIDEBAR_VIEW_ICONS, LEFT_SIDEBAR_VIEW_OPTIONS } from '../../../../../Constants';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { TickIcon } from '../../../../../Svgs';

interface SortSectionProps {
    isSearchActive: boolean;
    isSortDropdownOpen: boolean;
    toggleDropdown: () => void;
}

const SortSection: React.FC<SortSectionProps> = ({ isSearchActive, isSortDropdownOpen, toggleDropdown }) => {
    const { preferences: { sort, view }, setPreferences } = useUIPreferencesStore();

    return (
        <>
            <div
                onClick={toggleDropdown}
                className="flex items-center text-[#8f8f8f] dynamic-text-hover space-x-2 cursor-pointer"
                style={{ '--textHoverColor': '#ffffff' } as React.CSSProperties}
            >
                {
                    !isSearchActive && (
                        <span className="text-sm font-semibold">{sort}</span>
                    )
                }
                <button className="transition-colors cursor-pointer">
                    {
                        LEFT_SIDEBAR_VIEW_ICONS[view]
                    }
                </button>
            </div>

            {isSortDropdownOpen && (
                <div className="absolute right-0 top-10 w-52 bg-[#282828] rounded-[4px] shadow-[0_4px_5px_rgba(0,0,0,0.8)] z-50 text-sm text-white">
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
                                        className={`px-4 py-2 text-[#8f8f8f] dynamic-text-hover ${option.label == view ? "text-[#ffffff] bg-[#3e3e3e]": ""} rounded-sm cursor-pointer`}
                                        style={{
                                            '--textHoverColor': '#ffffff',
                                        } as React.CSSProperties}
                                        onClick={() => setPreferences({view: option.label})}
                                    >
                                        {option.icon}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                </div>
            )}
        </>
    )
}

export default SortSection