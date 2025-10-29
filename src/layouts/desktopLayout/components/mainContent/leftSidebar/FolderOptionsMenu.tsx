import React, { useEffect, useState } from 'react'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import type { MenuOptions } from '../../../../../types';
import { CrossIcon, DeleteIcon, SearchIcon } from '../../../../../Svgs';

interface FolderOptionsMenuProps {
    options: MenuOptions
    folderMenuRef: React.RefObject<HTMLDivElement | null>
    onClose: () => void;
}

const FolderOptionsMenu: React.FC<FolderOptionsMenuProps> = ({ options, folderMenuRef, onClose }) => {
    const { preferences: { isLeftSidebarExpanded, folder: { name } } } = useUIPreferencesStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<MenuOptions>([]);

    useEffect(() => {
        const option = options.filter((o) => o.subMenu);

        // const filteredMenu = option?.[0]?.subMenu.filter(({ label }) =>
        //     label.toLowerCase().includes(searchQuery.toLowerCase())
        // );

        const filteredMenu = option[0].subMenu?.filter(({ label }) =>
            label.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setSearchResult(filteredMenu || [])

    }, [searchQuery, options])

    return (
        <>
            <div
                className="fixed inset-0 z-800"
                onClick={onClose}
            />

            <div
                className={`fixed w-65 z-800 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm`}
                style={{
                    top: `${(folderMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
                    ...((isLeftSidebarExpanded) && {
                        right: `72px`,
                    }),
                }}
            >
                {
                    options?.map(({ icon, label, action, hasTopBorder, rightSideIcon, subMenu }) => {
                        return (
                            <div
                                key={label}
                                className={`relative group ${hasTopBorder ? "border-t border-[#3E3E3E]" : ""}`}
                            >
                                <div
                                    className="text-white/85 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                    style={{ "--bgHoverColor": "#3E3E3E" } as React.CSSProperties}
                                    onClick={subMenu ? undefined : action} // disable click if it has submenu
                                >
                                    <span className="flex items-center gap-3">
                                        {icon}
                                        {label}
                                    </span>

                                    {rightSideIcon}
                                </div>

                                {subMenu && (
                                     <div
                                        className={`${isLeftSidebarExpanded ? "right-full" : "left-full"} absolute top-0 w-70 p-1 hidden group-hover-flex h-50 overflow-y-auto custom-scrollbar flex-col bg-[#282828] shadow-[0_4px_5px_rgba(0,0,0,0.8)] rounded-[4px] z-900`}
                                    >
                                        <div className="p-1">
                                            <div className="bg-[#3E3E3E] w-full flex items-center p-[7px] rounded-[4px]">
                                                <button className="text-[#ffffff] ml-1">
                                                    <SearchIcon width="18" height="18" />
                                                </button>
                                                <input
                                                    value={searchQuery}
                                                    type="text"
                                                    placeholder="Find a Playlist"
                                                    className="ml-2 flex-1 bg-transparent text-[13px] text-[#ffffff] placeholder:text-[#8f8f8f] outline-none"
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                {searchQuery && (
                                                    <button
                                                        className="text-[#8f8f8f] dynamic-text-hover cursor-pointer mr-1 transition"
                                                        onClick={() => setSearchQuery("")}
                                                    >
                                                        <CrossIcon width="15" height="15" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {
                                            searchResult.length > 0 ? (
                                                searchResult.map(({ label: subLabel, action: subAction }, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`text-white/85 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5`}
                                                        style={
                                                            {
                                                                "--bgHoverColor": "#3E3E3E",
                                                            } as React.CSSProperties
                                                        }
                                                    >
                                                        <span className="flex items-center gap-3">{subLabel}</span>

                                                        <button
                                                            className="cursor-pointer text-[#ffffff] dynamic-text-hover"
                                                            style={{
                                                                '--textHoverColor': '#EA7836',
                                                            } as React.CSSProperties}
                                                            title={`Remove ${subLabel} from ${name}`}
                                                            onClick={subAction}
                                                        >
                                                            <DeleteIcon width="16" height="16" />
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-center">
                                                    <p className="text-base font-medium">No Result Found</p>
                                                    <p className="text-sm text-[#d1d5dc]">Try adjusting your search query</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                )}

                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default FolderOptionsMenu