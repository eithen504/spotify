import React, { useRef, useState } from 'react';
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import { VIEW_ICONS } from '../../../../../constants';
import SortViewOptionsMenu from './SortViewOptionsMenu';

interface SortViewSectionProps {
    isSearchBarActive: boolean;
}

const SortViewSection: React.FC<SortViewSectionProps> = ({ isSearchBarActive }) => {
    const [isSortViewMenuOpen, setIsSortViewMenuOpen] = useState(false);
    const sortViewMenuRef = useRef<HTMLDivElement>(null);

    const { leftSidebar, library } = useUIPreferencesStore();
    const { isExpanded: isLeftSidebarExpanded } = leftSidebar;
    const { sort: librarySort, view: libraryView } = library;

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
                    (!isSearchBarActive || isLeftSidebarExpanded) && (
                        <span className="text-sm font-semibold min-w-0">{librarySort}</span>
                    )
                }
                <button className="transition-colors cursor-pointer">
                    {
                        VIEW_ICONS[libraryView]
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