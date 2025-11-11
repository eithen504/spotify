import React from 'react'
import { Drawer, DrawerContent } from './ui/drawer';
import type { MenuOptions } from '../types';
import { useLocation } from 'react-router-dom';

interface EntityInfo {
    title?: string;
    imgUrl?: string
}

interface EntityOptionsDrawerProps {
    entity: EntityInfo;
    options: MenuOptions;
    height?: string;
    onClose: () => void;
}

const EntityOptionsDrawer: React.FC<EntityOptionsDrawerProps> = ({
    entity: {
        title,
        imgUrl
    },
    options,
    height,
    onClose
}) => {
    const { pathname } = useLocation();

    const isPlaylistPage = pathname.startsWith("/playlist");
    const isAlbumPage = pathname.startsWith("/album");

    return (
        <Drawer open={true} onClose={onClose}>
            <DrawerContent
                className="bg-[#282828] rounded-t-2xl z-1000 w-full"
                style={{ height: height || "100%" }}
                shouldShowDragHandle={true}
            >
                {/* Track Info */}
                <div className="flex items-center gap-3 p-4 border-b border-[#3E3E3E]">
                    <img
                        src={imgUrl}
                        alt="Entity"
                        className="w-12 h-12 rounded"
                    />
                    <div className="text-[#ffffff]">
                        <div className="font-semibold text-md">{title}</div>
                        <div className="text-sm text-white/70">
                            {
                                isPlaylistPage ? "Playlist" : isAlbumPage ? "Album" : "Track"
                            }
                        </div>
                    </div>
                </div>

                {/* Options */}
                {options?.map(({ icon, label, action, rightSideIcon }) => {
                    return (
                        <button
                            className="text-[#ffffff] dynamic-text-hover cursor-pointer w-full py-3 px-4 flex items-center justify-between font-normal text-md transition-transform duration-200 dynamic-scale-hover"
                            style={{
                                '--textHoverColor': 'rgba(255, 255, 255, 0.7)',
                            } as React.CSSProperties}
                            key={label}
                            onClick={(e) => {
                                e.stopPropagation();
                                action();
                            }}
                        >
                            <span className="flex items-center gap-3">
                                {icon}
                                {label}
                            </span>

                            {rightSideIcon}
                        </button>
                    );
                })}
            </DrawerContent>
        </Drawer>
    )
}

export default EntityOptionsDrawer