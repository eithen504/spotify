import React, { useState, useRef, useEffect } from 'react';
import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore';
import { AddIcon, AddToQueueIcon, CompactListIcon, DefaultListIcon, LogoIcon, MoreIcon, PlayIcon, ReportIcon, ShareIcon, TickIcon } from '../../../Svgs';
import useBreakPoint from '../../../hooks/useBreakPoint';
import { Drawer, DrawerContent } from '../../../components/ui/drawer';
import { useScrollStore } from '../../../store/useScrollStore';

const moreMenuOptions = [
    {
        icon: <AddIcon width="16" height="16" />,
        label: "Add To Your Library",
        action: () => {

        },
    },
    {
        icon: <AddToQueueIcon width="16" height="16" />,
        label: "Add To Queue",
        action: () => { },
    },
    {
        icon: <ReportIcon width="16" height="16" />,
        label: "Report",
        action: () => { },
    },
    {
        icon: <ShareIcon width="16" height="16" />,
        label: "Share",
        action: () => {
        },
    },
    {
        icon: <LogoIcon width="16" height="16" />,
        label: "Open In Desktop App",
        action: () => { },
        hasTopBorder: true,
    },

]

interface PlaylistControlsProps {
    view: "Compact List" | "Default List";
    setView: React.Dispatch<React.SetStateAction<"Default List" | "Compact List">>;
}

const PlaylistControls: React.FC<PlaylistControlsProps> = ({ view, setView }) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();
    const { shouldHideScroll, setShouldHideScroll } = useScrollStore();
    const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
    const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
    const [breakPoint] = useBreakPoint();
    const moreDropdownRef = useRef<HTMLDivElement>(null);
    const viewDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target as Node) && !isViewDropdownOpen) {
                setIsMoreDropdownOpen(false);
                setShouldHideScroll(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isViewDropdownOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (viewDropdownRef.current && !viewDropdownRef.current.contains(e.target as Node) && !isMoreDropdownOpen) {
                setIsViewDropdownOpen(false);
                setShouldHideScroll(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMoreDropdownOpen]);

    return (
        <div
            className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}
        >
            <button
                className={`p-[19px] hidden md:block text-black bg-[#1ed760] dynamic-bg-hover rounded-full cursor-pointer`}
                style={{
                    '--bgHoverColor': '#3BE477',
                } as React.CSSProperties}
            >
                <PlayIcon width="18" height="18" />
            </button>

            {/* Cover Image */}
            <div className={`${leftPanelSize <= 28 ? "w-[38px] h-12" : "w-[34px] h-11"} flex-shrink-none relative rounded-md cursor-pointer group`}>
                <div className="absolute inset-0 overflow-hidden rounded-md p-1">
                    <img
                        src={"https://i.scdn.co/image/ab67616d00001e02d304ba2d71de306812eebaf4"}
                        className="w-full h-full object-cover transition-opacity"
                    />
                </div>

                <div className="absolute inset-0 flex items-center justify-center group-hover-opacity transition-opacity">
                    <PlayIcon width="15" height="15" />
                </div>

                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/80 animate-border-top"></div>
                    <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white/80 animate-border-right"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/80 animate-border-bottom"></div>
                    <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-white/80 animate-border-left"></div>
                </div>
            </div>

            <button className="text-white/70 dynamic-text-hover cursor-pointer">
                <AddIcon width="27" height="27" />
            </button>

            <button className="text-white/70 dynamic-text-hover cursor-pointer -mt-1">
                <ShareIcon width="25" height="25" />
            </button>

            {/* More Button + Dropdown */}
            <div className="relative" ref={moreDropdownRef}>
                <button
                    onClick={() => {
                        if (breakPoint == "sm") {
                            setIsMoreDrawerOpen((prev) => !prev)
                        } else {
                            setIsMoreDropdownOpen((prev) => !prev)
                            setShouldHideScroll(!shouldHideScroll);
                        }
                    }
                    }
                    className="text-white/70 dynamic-text-hover cursor-pointer mt-[8px]"
                >
                    <MoreIcon width="30" height="30" />
                </button>

                {isMoreDropdownOpen && (
                    <div className={`w-65 fixed z-600 -mt-67 md:-ml-10 lg:ml-0 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm`}>
                        {
                            moreMenuOptions?.map(({ icon, label, hasTopBorder }) => {

                                return (
                                    <button className={`${hasTopBorder ? "border-t border-[#3E3E3E]" : ""}  text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5 `}
                                        key={label}
                                    >
                                        <span className="flex items-center gap-3">
                                            {icon}
                                            {label}
                                        </span>
                                    </button>
                                )
                            })
                        }
                    </div>
                )}

                {isMoreDrawerOpen && (
                    <Drawer open={isMoreDrawerOpen} onClose={() => setIsMoreDrawerOpen(false)}>
                        <DrawerContent
                            className={`block md:hidden bg-[#282828] rounded-t-2xl z-700 h-[342px]`} // ✅ Use className
                            shouldShowDragHandle={true}
                        >
                            {/* Track Info */}
                            <div className="flex items-center gap-3 p-4 border-b border-[#3E3E3E]">
                                <img
                                    src={"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033"}
                                    alt="Entity"
                                    className="w-12 h-12 rounded"
                                />
                                <div className="text-white">
                                    <div className="font-semibold text-md">{"entityDetails?.title"}</div>
                                    <div className="text-sm text-white/70">{"entityDetails?.moreDetails"}</div>
                                </div>
                            </div>

                            {/* Options */}
                            {moreMenuOptions?.map(({ icon, label, action }) => {

                                return (
                                    <button
                                        className="text-white hover:text-white/70 cursor-pointer w-full py-3 px-4 flex items-center justify-between font-normal text-md transition-transform duration-200 hover:scale-[0.99]"
                                        key={label}
                                        onClick={action}
                                    >
                                        <span className="flex items-center gap-3">
                                            {icon}
                                            {label}
                                        </span>
                                    </button>
                                );
                            })}
                        </DrawerContent>
                    </Drawer>
                )}
            </div>

            <div className="relative ml-auto" ref={viewDropdownRef}>
                <button
                    className="hidden md:flex text-white/70 dynamic-text-hover cursor-pointer text-sm items-center gap-1.5"
                    onClick={() => {
                        setIsViewDropdownOpen((prev) => !prev)
                        setShouldHideScroll(!shouldHideScroll)
                    }}
                >
                    {leftPanelSize <= 23 && <span className="font-medium">{view}</span>}
                    {
                        view == "Compact List" ? <CompactListIcon width="15" height="15" /> : <DefaultListIcon width="15" height="15" />
                    }
                </button>

                {isViewDropdownOpen && (
                    <div className="w-45 absolute z-600 bottom-9 right-0 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm">
                        <div className={`text-white/90 w-full flex items-center justify-between p-2.5 `}>
                            <span className="flex items-center gap-3 text-xs">
                                View as
                            </span>
                        </div>

                        <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                            onClick={() => setView("Compact List")}
                        >
                            <span className={`${view == "Compact List" ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                <CompactListIcon width="15" height="15" />
                                Compact List
                            </span>

                            {
                                view == "Compact List" && (
                                    <p className="text-[#3BE477]">
                                        <TickIcon width="15" height="15" />
                                    </p>
                                )
                            }
                        </button>

                        <button className="text-white/90 cursor-pointer w-full hover:bg-[#3E3E3E] flex items-center justify-between p-2.5"
                            onClick={() => setView("Default List")}
                        >
                            <span className={`${view == "Default List" ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                                <DefaultListIcon width="15" height="15" />
                                Default List
                            </span>

                            {
                                view == "Default List" && (
                                    <p className="text-[#3BE477]">
                                        <TickIcon width="15" height="15" />
                                    </p>
                                )
                            }
                        </button>
                    </div>
                )}
            </div>

            <button
                className="block md:hidden text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-[19px] ml-auto cursor-pointer"
                style={{
                    '--bgHoverColor': '#3BE477',
                } as React.CSSProperties}
            >
                <PlayIcon width="18" height="18" />
            </button>
        </div>
    );
};

export default PlaylistControls;
