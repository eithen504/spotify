import React, { useEffect, useState } from 'react'
import type { MenuOptions, } from '../../../../../types'
import { CompactGridIcon, CompactListIcon, DefaultGridIcon, DefaultListIcon, TickIcon } from '../../../../../Svgs'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';

interface SortViewOptionsMenuProps {
    sortViewMenuRef: React.RefObject<HTMLDivElement | null>
    onClose: () => void;
}

const SortViewOptionsMenu: React.FC<SortViewOptionsMenuProps> = ({ sortViewMenuRef, onClose }) => {
    const { preferences: { isLeftSidebarExpanded, sort, view } } = useUIPreferencesStore();
    const { setPreferences } = useUIPreferencesStore();
    const [viewMenuOptions, setViewMenuOptions] = useState<MenuOptions>([])
    const [sortMenuOptions, setSortMenuOptions] = useState<MenuOptions>([])

    useEffect(() => {
        setSortMenuOptions([
            {
                label: "Recently Added",
                action: () => {
                    setPreferences({ sort: "Recently Added" })
                    localStorage.setItem("sort", "Recently Added")
                }
            },
            {
                label: "Alphabetical A To Z",
                action: () => {
                    setPreferences({ sort: "Alphabetical A To Z" })
                    localStorage.setItem("sort", "Alphabetical A To Z")
                }
            },
            {
                label: "Alphabetical Z To A",
                action: () => {
                    setPreferences({ sort: "Alphabetical Z To A" })
                    localStorage.setItem("sort", "Alphabetical Z To A")
                }
            },
        ])

        setViewMenuOptions([
            {
                label: "Compact List",
                icon: <CompactListIcon width="16" height="16" />,
                action: () => {
                    setPreferences({ view: "Compact List" })
                    localStorage.setItem("view", "Compact List")
                }
            },
            {
                label: "Default List",
                icon: <DefaultListIcon width="16" height="16" />,
                action: () => {
                    setPreferences({ view: "Default List" })
                    localStorage.setItem("view", "Default List")
                }
            },
            {
                label: "Compact Grid",
                icon: <CompactGridIcon width="16" height="16" />,
                action: () => {
                    setPreferences({ view: "Compact Grid" })
                    localStorage.setItem("view", "Compact Grid")
                }
            },
            {
                label: "Default Grid",
                icon: <DefaultGridIcon width="16" height="16" />,
                action: () => {
                    setPreferences({ view: "Default Grid" })
                    localStorage.setItem("view", "Default Grid")
                }
            },
        ])

    }, [])

    return (
        <>
            <div
                className="fixed inset-0 z-800"
                onClick={onClose}
            />

            <div
                className="fixed w-52 z-800 bg-[#282828] rounded-[4px] shadow-[0_4px_5px_rgba(0,0,0,0.8)] text-sm text-[#ffffff]"
                style={{
                    top: `${(sortViewMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
                    ...((isLeftSidebarExpanded) && {
                        right: `30px`,
                    }),
                }}
            >
                <div className="space-y-0 p-1">
                    <p className="text-xs text-[#e5e7eb] p-2">Sort by</p>
                    {
                        sortMenuOptions.map(({ label, action }) => (
                            <div
                                key={label}
                                className={`flex ${sort == label ? "text-[#1ED45F]" : "text-[#e5e7eb]"} p-2 dynamic-bg-hover justify-between items-center cursor-pointer`}
                                style={{
                                    '--bgHoverColor': '#3E3E3E',
                                } as React.CSSProperties}
                                onClick={action}
                            >
                                {label}
                                {
                                    sort == label && (
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
                            viewMenuOptions.map(({ icon, label, action }) => (
                                <button
                                    key={label}
                                    className={`px-4 py-2 text-[#8f8f8f] dynamic-text-hover ${label == view ? "text-[#ffffff] bg-[#3e3e3e]" : ""} rounded-sm cursor-pointer`}
                                    onClick={action}
                                >
                                    {icon}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SortViewOptionsMenu