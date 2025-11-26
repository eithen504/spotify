import type React from "react";
import { AddIcon, CompactListIcon, DefaultListIcon, MoreIcon, PauseIcon, PlayIcon, SavedIcon, ShareIcon } from "../Svgs";
import type { Controls, Handlers, MenuOptions } from "../types";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import { useRef, useState } from "react";
import { useBreakPoint } from "../hooks/breakPoint";
import EntityOptionsMenu from "./EntityOptionsMenu";
import EntityViewOptionsMenu from "./EntityViewOptionsMenu";
import EntityOptionsDrawer from "./EntityOptionsDrawer";
import { useTableColumnVisibilityStore } from "../store/useTableColumnVisibilityStore";
import { useCheckAuth } from "../hooks/auth";
import { toast } from "sonner";

interface EntityInfo {
    title?: string;
    imgUrl?: string
    hasSaved?: boolean;
    isPlaying?: boolean
}

interface EntityControlsProps {
    controls: Controls;
    handlers: Handlers;
    entity: EntityInfo;
    entityMenuOptions?: MenuOptions;
    entityDrawerHeight?: string;
}

const EntityControls: React.FC<EntityControlsProps> = ({
    controls,
    handlers,
    entity: {
        title,
        imgUrl,
        hasSaved,
        isPlaying
    },
    entityMenuOptions,
    entityDrawerHeight
}) => {
    /* ---------- Local States ---------- */
    const [isEntityMenuOpen, setIsEntityMenuOpen] = useState(false);
    const [isEntityDrawerOpen, setIsEntityDrawerOpen] = useState(false);
    const [isEntityViewMenuOpen, setIsEntityViewMenuOpen] = useState(false);

    /* ---------- Local References ---------- */
    const entityMenuRef = useRef<HTMLDivElement>(null);
    const entityViewMenuRef = useRef<HTMLDivElement>(null);

    /* ---------- Stores ---------- */
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { tableView } = useTableColumnVisibilityStore();

    /* ---------- Custom Hooks ---------- */
    const { data: currentUser } = useCheckAuth();
    const { breakPoint } = useBreakPoint();

    /* ---------- Methods Or Functions ---------- */
    const handleMoreIconClick = () => {
        if (!currentUser) {
            toast.error("Please Login or Signup First!");
            return;
        };

        if (breakPoint == "sm") {
            setIsEntityDrawerOpen((prev) => !prev);
        } else {
            setIsEntityMenuOpen((prev) => !prev);
        }
    }

    return (
        <div
            className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}
        >
            {/* Play */}
            {
                controls["Play"] && (
                    <button
                        className={`p-[19px] hidden md:block text-black bg-[#1ed760] dynamic-bg-hover rounded-full cursor-pointer`}
                        style={{
                            '--bgHoverColor': '#3BE477',
                        } as React.CSSProperties}
                        title="Play"
                        onClick={handlers["Play"]}
                    >
                        {
                            isPlaying ? <PauseIcon width="18" height="18" /> : <PlayIcon width="18" height="18" />
                        }
                    </button>
                )
            }

            {/* Preview */}
            {
                controls["Preview"] && (
                    <div
                        className={`${leftPanelSize <= 28 ? "w-[38px] h-[48px]" : "w-[36px] h-[46px]"
                            } flex-shrink-none relative rounded-md cursor-pointer group`}
                        title="Preview"
                        onClick={handlers["Preview"]}
                    >
                        {/* Outer frame with border and gap */}
                        <div className="absolute inset-0 flex items-center justify-center rounded-md border-2 border-gray-300 p-[2px]">
                            {/* Image stays inside with no border */}
                            <img
                                src={imgUrl}
                                className="w-full h-full object-cover rounded-sm group-hover:brightness-50"
                            />
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center group-hover-opacity transition-opacity">
                            <PlayIcon width="12" height="12" />
                        </div>
                    </div>
                )
            }

            {/* Save */}
            {
                controls["Save"] && (
                    <button className="text-white/70 dynamic-text-hover cursor-pointer"
                        title={hasSaved ? "Remove" : "Add"}
                        onClick={handlers["Save"]}
                    >
                        {
                            hasSaved ? <SavedIcon width="27" height="27" /> : <AddIcon width="27" height="27" />
                        }
                    </button>
                )
            }

            {/* Share */}
            {
                controls["Share"] && (
                    <button
                        className="text-white/70 dynamic-text-hover cursor-pointer -mt-1"
                        title="Share"
                        onClick={handlers["Share"]}
                    >
                        <ShareIcon width="25" height="25" />
                    </button>
                )
            }

            {/* Follow */}
            {
                controls["Follow"] && (
                    <button className="cursor-pointer py-1 px-6 border border-white/50 dynamic-border-hover rounded-full text-sm font-bold">
                        Follow
                    </button>
                )
            }

            {/* More */}
            {
                controls["More"] && (
                    <div
                        ref={entityMenuRef}
                        className="relative flex items-center"
                    >
                        <button
                            onClick={handleMoreIconClick}
                            className="text-white/70 dynamic-text-hover cursor-pointer"
                        >
                            <MoreIcon width="30" height="30" />
                        </button>

                        {isEntityMenuOpen && (
                            <EntityOptionsMenu
                                options={entityMenuOptions || []}
                                entityMenuRef={entityMenuRef}
                                subMenuleftShift={breakPoint == "md" ? true : false}
                                onClose={() => setIsEntityMenuOpen(false)}
                            />
                        )}

                        {isEntityDrawerOpen && (
                            <EntityOptionsDrawer
                                entity={{
                                    title,
                                    imgUrl
                                }}
                                options={entityMenuOptions || []}
                                onClose={() => setIsEntityDrawerOpen(false)}
                                height={entityDrawerHeight}
                            />
                        )}
                    </div>
                )
            }

            {/* View */}
            {
                controls["View"] && (
                    <div className="relative ml-auto flex items-center" ref={entityViewMenuRef}>
                        <button
                            className="hidden md:flex text-white/70 dynamic-text-hover cursor-pointer text-sm items-center gap-1.5"
                            onClick={() => {
                                setIsEntityViewMenuOpen((prev) => !prev)
                            }}
                        >
                            {
                                leftPanelSize <= 23 && <span className="font-medium">{tableView}</span>
                            }

                            {
                                tableView == "Compact List" ? <CompactListIcon width="15" height="15" /> : <DefaultListIcon width="15" height="15" />
                            }
                        </button>

                        {isEntityViewMenuOpen && (
                            <EntityViewOptionsMenu
                                entityViewMenuRef={entityViewMenuRef}
                                onClose={() => setIsEntityViewMenuOpen(false)}
                            />
                        )}
                    </div>
                )
            }

            {/* Play */}
            {
                controls["Play"] && (
                    <button
                        className="block md:hidden text-black bg-[#1ed760] dynamic-bg-hover rounded-full p-[19px] ml-auto cursor-pointer"
                        style={{
                            '--bgHoverColor': '#3BE477',
                        } as React.CSSProperties}
                        onClick={handlers["Play"]}
                    >
                        {
                            isPlaying ? <PauseIcon width="18" height="18" /> : <PlayIcon width="18" height="18" />
                        }
                    </button>
                )
            }
        </div>
    );
};

export default EntityControls;
