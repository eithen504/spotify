import React, { useEffect, useState } from 'react'
import type { MenuOptions } from '../types';
import { CrossIcon, SearchIcon } from '../Svgs';
import { NotResultFoundSubMenu } from './NotFounds';
import { highlightText } from '../hooks/text';

interface EntityOptionsMenuProps {
    options: MenuOptions;
    entityMenuRef: React.RefObject<HTMLDivElement | null>;
    subMenuleftShift?: boolean;
    rightPosition?: string;
    onClose: () => void
}

const EntityOptionsMenu: React.FC<EntityOptionsMenuProps> = ({
    options,
    entityMenuRef,
    subMenuleftShift,
    rightPosition,
    onClose
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState<MenuOptions>([]);
    const [subMenu, setSubMenu] = useState<MenuOptions>([]);

    useEffect(() => {
        const primaryOption = subMenu[0];

        const filteredOptions = subMenu.filter(({ label }, index) =>
            label.toLowerCase().includes(searchQuery.toLowerCase()) && index != 0
        )

        if (primaryOption) {
            setSearchResult([primaryOption, ...filteredOptions || []]);
        } else {
            setSearchResult(filteredOptions || []);
        }

    }, [searchQuery, subMenu])

    return (
        <>
            <div
                className="fixed inset-0 z-800"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />

            <div
                className={`fixed w-65 z-800 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm`}
                style={{
                    top: `${(entityMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 10}px`,
                    right: rightPosition
                }}
            >
                {
                    options?.map(({ icon, label, action, hasTopBorder, rightSideIcon, subMenu, hideOption }) => {
                        if (hideOption) return null;

                        return (
                            <div
                                key={label}
                                className={`relative group-inner ${hasTopBorder ? "border-t border-[#3E3E3E]" : ""}`}
                                onMouseEnter={() => {
                                    if (subMenu) {
                                        setSubMenu(subMenu)
                                    }
                                }}
                            >
                                <div
                                    className="text-white/85 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                                    style={{ "--bgHoverColor": "#3E3E3E" } as React.CSSProperties}
                                    onClick={(e) => {
                                        if (!subMenu) {
                                            e.stopPropagation();
                                            action();
                                            onClose();
                                        }
                                    }}
                                >
                                    <span className="flex items-center gap-3">
                                        {icon}
                                        {label}
                                    </span>

                                    {rightSideIcon}
                                </div>

                                {subMenu && (
                                    <div
                                        className={`${subMenuleftShift ? "right-full" : "left-full"} absolute top-0 w-70 p-1 hidden group-hover-inner-flex h-50 overflow-y-auto custom-scrollbar flex-col bg-[#282828] shadow-[0_4px_5px_rgba(0,0,0,0.8)] rounded-[4px] z-900`}
                                    >
                                        <div className="p-1"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="bg-[#3E3E3E] w-full flex items-center p-[7px] rounded-[4px]">
                                                <button className="text-[#ffffff] ml-1">
                                                    <SearchIcon width="18" height="18" />
                                                </button>
                                                <input
                                                    value={searchQuery}
                                                    type="text"
                                                    placeholder="Find a Playlist"
                                                    className="ml-2 flex-1 bg-transparent text-[13px] text-[#ffffff] placeholder:text-[#B1B1B1] placeholder:font-medium outline-none"
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                                {searchQuery && (
                                                    <button
                                                        className="text-[#B1B1B1] dynamic-text-hover cursor-pointer mr-1 transition"
                                                        onClick={() => setSearchQuery("")}
                                                    >
                                                        <CrossIcon width="15" height="15" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {
                                            searchResult.length > 0 ? (
                                                searchResult.map(({ icon: subIcon, label: subLabel, action: subAction }, idx) => (
                                                    <div key={idx}>
                                                        <div
                                                            className={`${idx == 0 ? "border-b border-[#3E3E3E]" : ""} text-white/85 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5`}
                                                            style={{ "--bgHoverColor": "#3E3E3E" } as React.CSSProperties}
                                                            onClick={subAction}
                                                        >
                                                            <span className="flex items-center gap-3">
                                                                {subIcon}
                                                                {idx === 0 ? subLabel : highlightText(subLabel, searchQuery)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <NotResultFoundSubMenu />
                                            )
                                        }
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default EntityOptionsMenu