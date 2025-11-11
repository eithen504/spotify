import { useCallback, useEffect, useRef, useState } from "react";
import { AddIcon, CrossIcon, ExpandIcon, MinimizeIcon, NextIcon, PlayIcon, PrevIcon, RepeatIcon, ShareIcon, ShuffleIcon, HighVolumeIcon, PauseIcon, SavedIcon } from "../../../../Svgs";
import { Slider } from "../../../../components/ui/slider";
import { useTrackDetailsStore } from "../../../../store/useTrackDetailsStore";
import { useDominantColor } from "../../../../hooks/color";
import { formatDuration } from "../../../../utils";
import { useLikeTrack, useTrackLikeStatus } from "../../../../hooks/like";

type Position = {
    x: number;
    y: number;
};

type Size = {
    width: number;
    height: number;
};

type SavedState = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type ResizeStart = {
    x: number;
    y: number;
    width: number;
    height: number;
    posX: number;
    posY: number;
    right: number;
    bottom: number;
};

type ResizeDirection =
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | '';

interface MiniPlayerWindowProps {
    onClose: () => void;
    progress: number[];
    currentTime: number;
    handleProgressChange: (value: number[]) => void;
}

const MiniPlayerWindow: React.FC<MiniPlayerWindowProps> = ({ onClose, progress, currentTime, handleProgressChange }) => {
    const { trackDetails, setTrackDetails } = useTrackDetailsStore();
    const { dominantColor } = useDominantColor(trackDetails.coverImageUrl || "");
    const { getTrackLikeStatus } = useTrackLikeStatus()
    const hasLiked = getTrackLikeStatus({ hasLiked: trackDetails.hasLiked, trackId: trackDetails._id })
    const { mutateAsync: likeTrack } = useLikeTrack();

    const handleLikeUnlikeTrack = () => {
        likeTrack(trackDetails);
    }

    const initialWidth = 300;
    const initialHeight = 330;
    const initialX = window.innerWidth / 2 - initialWidth / 2;
    const initialY = window.innerHeight / 2 - initialHeight / 2;

    const [position, setPosition] = useState<Position>({ x: initialX, y: initialY });
    const [size, setSize] = useState<Size>({ width: initialWidth, height: initialHeight });
    const [isMinimized] = useState<boolean>(false);
    const [isMaximized, setIsMaximized] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection>('');
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState<ResizeStart>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        posX: 0,
        posY: 0,
        right: 0,
        bottom: 0
    });
    const [savedState, setSavedState] = useState<SavedState>({
        x: initialX,
        y: initialY,
        width: initialWidth,
        height: initialHeight
    });

    const windowRef = useRef<HTMLDivElement>(null);

    // Helper function to get client coordinates from either mouse or touch event
    const getClientCoordinates = (e: MouseEvent | TouchEvent): { clientX: number; clientY: number } => {
        if ('touches' in e) {
            return {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY
            };
        } else {
            return {
                clientX: e.clientX,
                clientY: e.clientY
            };
        }
    };

    const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (isMaximized) return;
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        setDragStart({
            x: clientX - position.x,
            y: clientY - position.y
        });
    }, [position, isMaximized]);

    const handleResizeMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent, direction: ResizeDirection) => {
        e.stopPropagation();
        if (isMaximized) return;
        setIsResizing(true);
        setResizeDirection(direction);

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        setResizeStart({
            x: clientX,
            y: clientY,
            width: size.width,
            height: size.height,
            posX: position.x,
            posY: position.y,
            right: window.innerWidth - position.x - size.width,
            bottom: window.innerHeight - position.y - size.height
        });
    }, [size, position, isMaximized]);

    const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
        const { clientX, clientY } = getClientCoordinates(e);

        if (isDragging && !isMaximized) {
            const newX = clientX - dragStart.x;
            const newY = clientY - dragStart.y;

            // Keep window within viewport
            const maxX = window.innerWidth - size.width;
            const maxY = window.innerHeight - (isMinimized ? 40 : size.height);

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
            return;
        }

        if (isResizing && !isMaximized) {
            const deltaX = clientX - resizeStart.x;
            const deltaY = clientY - resizeStart.y;

            // Minimum size constraints
            const minWidth = 300;
            const minHeight = 330;

            let newWidth = size.width;
            let newHeight = size.height;
            let newX = position.x;
            let newY = position.y;

            // Calculate new dimensions based on resize direction
            switch (resizeDirection) {
                case 'left':
                    newWidth = Math.max(minWidth, resizeStart.width - deltaX);
                    newX = Math.min(resizeStart.posX + deltaX, resizeStart.posX + resizeStart.width - minWidth);
                    break;

                case 'right':
                    newWidth = Math.max(minWidth, resizeStart.width + deltaX);
                    newWidth = Math.min(newWidth, window.innerWidth - position.x);
                    break;

                case 'top':
                    newHeight = Math.max(minHeight, resizeStart.height - deltaY);
                    // Ensure window doesn't go above the top of the screen
                    newY = Math.max(0, Math.min(
                        resizeStart.posY + deltaY,
                        resizeStart.posY + resizeStart.height - minHeight
                    ));
                    break;

                case 'bottom':
                    newHeight = Math.max(minHeight, resizeStart.height + deltaY);
                    newHeight = Math.min(newHeight, window.innerHeight - position.y);
                    break;

                case 'top-left':
                    newWidth = Math.max(minWidth, resizeStart.width - deltaX);
                    newX = Math.min(resizeStart.posX + deltaX, resizeStart.posX + resizeStart.width - minWidth);
                    newHeight = Math.max(minHeight, resizeStart.height - deltaY);
                    // Ensure window doesn't go above the top of the screen
                    newY = Math.max(0, Math.min(
                        resizeStart.posY + deltaY,
                        resizeStart.posY + resizeStart.height - minHeight
                    ));
                    break;

                case 'top-right':
                    newWidth = Math.max(minWidth, resizeStart.width + deltaX);
                    newWidth = Math.min(newWidth, window.innerWidth - position.x);
                    newHeight = Math.max(minHeight, resizeStart.height - deltaY);
                    // Ensure window doesn't go above the top of the screen
                    newY = Math.max(0, Math.min(
                        resizeStart.posY + deltaY,
                        resizeStart.posY + resizeStart.height - minHeight
                    ));
                    break;

                case 'bottom-left':
                    newWidth = Math.max(minWidth, resizeStart.width - deltaX);
                    newX = Math.min(resizeStart.posX + deltaX, resizeStart.posX + resizeStart.width - minWidth);
                    newHeight = Math.max(minHeight, resizeStart.height + deltaY);
                    newHeight = Math.min(newHeight, window.innerHeight - position.y);
                    break;

                case 'bottom-right':
                    newWidth = Math.max(minWidth, resizeStart.width + deltaX);
                    newWidth = Math.min(newWidth, window.innerWidth - position.x);
                    newHeight = Math.max(minHeight, resizeStart.height + deltaY);
                    newHeight = Math.min(newHeight, window.innerHeight - position.y);
                    break;

                default:
                    break;
            }

            // Apply the new dimensions and position
            setSize({ width: newWidth, height: newHeight });
            setPosition({ x: newX, y: newY });
        }
    }, [isDragging, isResizing, dragStart, resizeStart, position, resizeDirection, isMaximized, isMinimized, size]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeDirection('');
    }, []);

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove, { passive: false });
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchend', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('touchmove', handleMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchend', handleMouseUp);
            };
        }
    }, [isDragging, isResizing, handleMove, handleMouseUp]);

    const handleMaximize = () => {
        if (isMaximized) {
            // Restore
            setPosition({ x: savedState.x, y: savedState.y });
            setSize({ width: savedState.width, height: savedState.height });
            setIsMaximized(false);
        } else {
            // Maximize
            setSavedState({ x: position.x, y: position.y, width: size.width, height: size.height });
            setPosition({ x: 0, y: 0 });
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setIsMaximized(true);
        }
    };

    return (
        <div
            ref={windowRef}
            className={`fixed bg-[#121212] border border-[#2E3030] shadow-2xl z-50 select-none ${isMaximized ? '' : 'rounded-xl overflow-hidden'
                }`}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: isMinimized ? 'auto' : size.height,
                zIndex: 1000,
                touchAction: 'none' // Prevent default touch behaviors like scrolling
            }}
        >
            {/* Title Bar */}
            <div
                className={`h-10 bg-[#121212] flex items-center justify-between px-4 select-none relative overflow-hidden ${isMaximized ? 'cursor-default rounded-t-xl' : 'cursor-move rounded-t-xl'
                    } `}
                onMouseDown={(e) => !isMaximized && handleMouseDown(e)}
                onTouchStart={(e) => !isMaximized && handleMouseDown(e)}
                onDoubleClick={handleMaximize}
            >
                <div className="flex items-center space-x-3 z-10">
                    <span className="text-[#ffffff] text-xs font-medium drop-shadow-sm">open.spotiy.com</span>
                </div>

                <div className="flex items-center space-x-1 z-10">
                    <button
                        className="text-white/80 dynamic-text-hover dynamic-bg-hover cursor-pointer p-2 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95"
                        style={{
                            '--bgHoverColor': '#ffffff1a',
                        } as React.CSSProperties}
                        onClick={handleMaximize}
                    >
                        {isMaximized ? <MinimizeIcon width="11" height="11" /> : <ExpandIcon width="11" height="11" />}
                    </button>
                    <button
                        className="text-white/80 dynamic-text-hover dynamic-bg-hover cursor-pointer p-2 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95"
                        style={{
                            '--bgHoverColor': '#ffffff1a',
                        } as React.CSSProperties}
                        onClick={() => {
                            onClose()
                        }}
                    >
                        <CrossIcon width="12" height="12" />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex flex-col" style={{ height: 'calc(100% - 48px)' }}>
                {/* Scrollable content area */}
                <div className="flex-1 overflow-auto rounded-md mx-[6px] group relative"
                    style={{ background: dominantColor || "#3C3C3C" }}
                >
                    {/* Dark overlay for the entire screen (red background) */}
                    <div
                        className="absolute inset-0 bg-black group-hover-opacity transition-opacity duration-300 pointer-events-none"
                        style={{
                            '--hoverOpacity': 0.5,
                        } as React.CSSProperties}
                    />

                    {/* Main Content with centered image */}
                    <div className="h-full flex items-center justify-center p-4 relative">
                        <div className="max-w-[90%] max-h-[90%] w-auto h-auto aspect-square rounded-sm shadow-2xl overflow-hidden">
                            <img
                                src={trackDetails.coverImageUrl}
                                alt="Spotify Logo"
                                className="w-full h-full object-cover transition-all duration-300"
                            />

                            {/* Controls that appear on hover */}
                            <div
                                className="absolute inset-0 flex items-center justify-center gap-1 hide-scrollbar group-hover-opacity transition-opacity duration-300"
                                style={{
                                    '--hoverOpacity': 1,
                                } as React.CSSProperties}
                            >
                                <button className="cursor-pointer rounded-full p-2 text-white">
                                    <HighVolumeIcon width="18" height="18" />
                                </button>

                                <button className="cursor-pointer rounded-full p-2 text-white">
                                    <ShuffleIcon width="18" height="18" />
                                </button>

                                <button className="cursor-pointer rounded-full p-2 text-white">
                                    <PrevIcon width="18" height="18" />
                                </button>

                                <button className="cursor-pointer bg-white rounded-full p-4 text-black"
                                    onClick={() => setTrackDetails({ isPlaying: !trackDetails.isPlaying })}
                                >
                                    {
                                        trackDetails.isPlaying ? <PauseIcon width="20" height="20" /> : <PlayIcon width="20" height="20" />
                                    }
                                </button>

                                <button className="cursor-pointer rounded-full p-2 text-white">
                                    <NextIcon width="18" height="18" />
                                </button>

                                <button className="cursor-pointer rounded-full p-2 text-white">
                                    <RepeatIcon width="18" height="18" />
                                </button>

                                <button className="cursor-pointer rounded-full p-2 -mt-1 text-white">
                                    <ShareIcon width="18" height="18" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar on hover */}
                    <div
                        className="absolute bottom-1 left-0 right-0 px-1 py-1 group-hover-opacity transition-opacity duration-300"
                        style={{
                            '--hoverOpacity': 1,
                        } as React.CSSProperties}
                    >
                        <div className="flex justify-between text-white text-xs mb-1">
                            <span>{formatDuration(currentTime)}</span>
                            <span>{trackDetails.duration}</span>
                        </div>
                        <div className="h-1 rounded-full hide-scrollbar">
                            <Slider
                                max={100}
                                defaultValue={[0]}
                                value={progress}
                                onValueChange={handleProgressChange}
                                className={`${trackDetails._id ? "cursor-grab" : "cursor-not-allowed"} w-full`}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Bar - now part of the content flow */}
                <div
                    className={`h-15 bg-[#121212] flex items-center justify-between px-4 -mb-[7px] select-none relative overflow-hidden`}
                >
                    <div className="flex flex-col items-start space-y-0.5 z-10">
                        <span className="text-white text-lg font-bold">{trackDetails.title}</span>
                        <span className="text-gray-400 text-sm">{trackDetails.artist}</span>
                    </div>

                    <div
                        className="text-gray-400 dynamic-text-hover cursor-pointer flex items-center space-x-1 z-10"
                        onClick={handleLikeUnlikeTrack}
                    >
                        {
                            hasLiked ? <SavedIcon width="17" height="17" /> : <AddIcon width="17" height="17" />
                        }
                    </div>
                </div>
            </div>

            {/* Resize Handles */}
            {!isMinimized && !isMaximized && (
                <>
                    <div
                        className="absolute top-0 left-0 right-0 h-2 cursor-n-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'top')}
                    />
                    <div
                        className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'bottom')}
                    />
                    <div
                        className="absolute top-0 bottom-0 left-0 w-2 cursor-w-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'left')}
                    />
                    <div
                        className="absolute top-0 bottom-0 right-0 w-2 cursor-e-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'right')}
                    />

                    <div
                        className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'top-left')}
                    />
                    <div
                        className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'top-right')}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'bottom-left')}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                        onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
                        onTouchStart={(e) => handleResizeMouseDown(e, 'bottom-right')}
                    />
                </>
            )}
        </div>
    );
};

export default MiniPlayerWindow;