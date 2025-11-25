import React from 'react'
import { Drawer, DrawerContent } from '../../../components/ui/drawer';
import type { MenuOptions } from '../../../types';
import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore';
import { TickIcon } from '../../../Svgs';

interface SortOptionsDrawerProps {
  options: MenuOptions;
  onClose: () => void;
  height?: string;
}

const SortOptionsDrawer: React.FC<SortOptionsDrawerProps> = ({
  options,
  onClose,
  height
}) => {
  const { library } = useUIPreferencesStore();
  const { sort: librarySort } = library;

  return (
    <Drawer open={true} onClose={onClose}>
      <DrawerContent
        className="bg-[#282828] rounded-t-2xl z-700 w-full"
        style={{ height }}
        shouldShowDragHandle={true}
      >
        {/* Track Info */}
        <div className="flex items-center justify-center gap-3 p-4 border-b border-[#3E3E3E] text-[#ffffff]">
          <h1>Sort by</h1>
        </div>

        {/* Options */}
        {options?.map(({ icon, label, action }) => {
          return (
            <button
              className={` ${librarySort == label ? "text-[#1ED45F]" : "text-[#ffffff] dynamic-text-hover dynamic-scale-hover"} cursor-pointer w-full py-3 px-4 flex items-center justify-between font-normal text-md transition-transform duration-200`}
              style={{
                '--textHoverColor': 'rgba(255, 255, 255, 0.7)',
              } as React.CSSProperties}
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                action();
              }}
            >
              <span className={`flex items-center gap-3 `}>
                {icon}
                {label}
              </span>

              {
                librarySort == label && <TickIcon width="18" height="18" />
              }
            </button>
          );
        })}
      </DrawerContent>
    </Drawer>
  )
}

export default SortOptionsDrawer