import React from 'react'
import { useBreakPoint } from '../hooks/breakPoint'
import { useUIPreferencesStore } from '../store/useUIPreferenceStore';
import { CompactListIcon, DefaultListIcon, TickIcon } from '../Svgs';
import { useTableColumnVisibilityStore } from '../store/useTableColumnVisibilityStore';

interface EntityViewOptionsMenuProps {
    entityViewMenuRef: React.RefObject<HTMLDivElement | null>;
    onClose: () => void;
}

const EntityViewOptionsMenu: React.FC<EntityViewOptionsMenuProps> = ({
    entityViewMenuRef,
    onClose
}) => {
    const { breakPoint } = useBreakPoint();
    const { rightSidebar } = useUIPreferencesStore();
    const { showNowPlayingView, showQueueView } = rightSidebar;
    const { tableView, setTableView } = useTableColumnVisibilityStore();

    return (
        <>
            <div
                className="fixed inset-0 z-800"
                onClick={onClose}
            />

            <div
                className="w-45 fixed z-800 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 px-1 text-sm"
                style={{
                    top: `${(entityViewMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
                    ...((breakPoint === "md" || (!showNowPlayingView && !showQueueView)) && {
                        right: `30px`,
                    }), 
                }}
            >
                <div className={`text-white/90 w-full flex items-center justify-between p-2.5 `}>
                    <span className="flex items-center gap-3 text-xs">
                        View as
                    </span>
                </div>

                <button
                    className="text-white/90 cursor-pointer w-full dynamic-bg-hover flex items-center justify-between p-2.5"
                    style={{
                        '--bgHoverColor': '#3E3E3E',
                    } as React.CSSProperties}
                    onClick={() => setTableView("Compact List")}
                >
                    <span className={`${tableView == "Compact List" ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                        <CompactListIcon width="15" height="15" />
                        Compact List
                    </span>

                    {
                        tableView == "Compact List" && (
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
                    onClick={() => setTableView("Default List")}
                >
                    <span className={`${tableView == "Default List" ? "text-[#3BE477]" : ""} flex items-center gap-3`}>
                        <DefaultListIcon width="15" height="15" />
                        Default List
                    </span>

                    {
                        tableView == "Default List" && (
                            <p className="text-[#3BE477]">
                                <TickIcon width="15" height="15" />
                            </p>
                        )
                    }
                </button>
            </div>
        </>
    )
}

export default EntityViewOptionsMenu