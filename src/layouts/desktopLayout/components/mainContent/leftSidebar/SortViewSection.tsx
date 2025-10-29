import React, { useRef, useState } from 'react';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { VIEW_ICONS } from '../../../../../constants';
import SortViewOptionsMenu from './SortViewOptionsMenu';

interface SortViewSectionProps {
    isSearchActive: boolean;
}

const SortViewSection: React.FC<SortViewSectionProps> = ({ isSearchActive }) => {
    const { preferences: { isLeftSidebarExpanded, sort, view } } = useUIPreferencesStore();
    const [isSortViewMenuOpen, setIsSortViewMenuOpen] = useState(false);
    const sortViewMenuRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative flex items-center"
            ref={sortViewMenuRef}
        >
            <div
                className="text-[#8f8f8f] dynamic-text-hover space-x-2 cursor-pointer flex items-center"
                onClick={() => setIsSortViewMenuOpen(true)}
            >
                {
                    (!isSearchActive || isLeftSidebarExpanded) && (
                        <span className="text-sm font-semibold min-w-0">{sort}</span>
                    )
                }
                <button className="transition-colors cursor-pointer">
                    {
                        VIEW_ICONS[view]
                    }
                </button>
            </div>

            {isSortViewMenuOpen && (
                <SortViewOptionsMenu
                    sortViewMenuRef={sortViewMenuRef}
                    onClose={() => setIsSortViewMenuOpen(false)}
                />
            )}
        </div>
    )
}

export default SortViewSection