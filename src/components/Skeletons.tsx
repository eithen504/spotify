import { useBreakPoint } from "../hooks/breakPoint";
import { useTableColumnVisibilityStore } from "../store/useTableColumnVisibilityStore";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";

const HomePageSkeleton = () => {
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;

    return (
        <div className="relative text-white min-h-screen">
            {/* Content */}
            <div className="text-white flex flex-col pt-0 relative z-10 max-w-[90rem] mx-auto">
                <div className="pb-10 px-4 md:px-10 mt-6">
                    <div className={`grid grid-cols-2 ${leftPanelSize >= 32 ? "md:grid md:grid-cols-2" : "md:grid md:grid-cols-4"} gap-2`}>
                        {/* Skeleton for Liked Tracks item */}
                        <div className="relative bg-[#272727] rounded-[4px] overflow-hidden">
                            <div className="flex items-center animate-pulse">
                                <div className="w-12 h-12 bg-[#353535] flex-shrink-0"></div>
                                <div className="p-2 flex-1 min-w-0">
                                    <div className="h-4 bg-[#353535] rounded w-3/4"></div>
                                </div>
                            </div>
                        </div>

                        {/* Skeleton for 7 more playlist items */}
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="relative bg-[#272727] rounded-[4px] overflow-hidden">
                                <div className="flex items-center animate-pulse">
                                    <div className="w-12 h-12 bg-[#353535] flex-shrink-0"></div>
                                    <div className="p-2 flex-1 min-w-0">
                                        <div className="h-4 bg-[#353535] rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {[...Array(3)].map((_, sectionIndex) => (
                    <div
                        key={sectionIndex}
                        className="pb-7 md:pb-10 relative mt-7 md:mt-0"
                    >
                        <div
                            className={`${true ? "px-4 md:px-10" : "px-4 md:px-6"
                                } flex justify-between items-center pb-2`}
                        >
                            {/* Title skeleton */}
                            <div className="h-6 w-32 bg-[#272727] rounded animate-pulse"></div>

                            {/* Show all button skeleton */}
                            <div className="h-5 w-16 bg-[#272727] rounded animate-pulse"></div>
                        </div>

                        {/* PlaylistSection Items */}
                        <div className="relative">
                            {/* Playlist items container */}
                            <div
                                className={`flex overflow-x-auto hide-scrollbar ${true ? "px-1 md:px-7" : "px-1 md:px-3"
                                    }`}
                            >
                                {/* Skeleton playlist items (8 items) */}
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="p-3 flex-none w-44">
                                        <div className="animate-pulse">
                                            {/* Cover image skeleton */}
                                            <div className="bg-[#272727] w-full aspect-square rounded-sm"></div>

                                            {/* Title skeleton */}
                                            <div className="h-5 bg-[#272727] rounded mt-2 w-3/4"></div>

                                            {/* Metadata skeleton */}
                                            <div className="h-4 bg-[#272727] rounded mt-1 w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

const AlbumPageSkeleton = () => {
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { tableView } = useTableColumnVisibilityStore();

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Album Info Section */}
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Album Cover */}
                <div
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                        ? "md:w-52 md:h-52"
                        : leftPanelSize >= 32 && leftPanelSize <= 38
                            ? "md:w-35 md:h-35"
                            : "md:w-40 md:h-40"
                        } bg-[#272727] animate-pulse rounded-[4px] shrink-0`}
                />

                {/* Album Info */}
                <div className="min-w-0 w-full space-y-2">
                    <div className="h-4 bg-[#272727] rounded-md w-1/6 animate-pulse mx-auto md:mx-0" />
                    <div className="h-8 bg-[#272727] rounded-md w-3/4 animate-pulse mx-auto md:mx-0" />
                    <div className="h-4 bg-[#272727] rounded-md w-1/3 animate-pulse mx-auto md:mx-0" />
                </div>
            </div>

            {/* Album Controls */}
            <div
                className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}
            >
                {/* Play */}
                <div
                    className="p-[28px] hidden md:block rounded-full bg-[#272727] animate-pulse"
                />

                {/* Preview */}
                <div
                    className={`${leftPanelSize <= 28 ? "w-[38px] h-[48px]" : "w-[36px] h-[46px]"
                        } flex-shrink-none relative rounded-md group bg-[#272727] animate-pulse `}
                />

                {/* Save */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* Share */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* More */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* View */}
                <div
                    className="relative ml-auto items-center p-[13.5px] hidden md:flex rounded-full bg-[#272727] animate-pulse"
                />

                {/* Play Small Screen */}
                <div
                    className="p-[28px] block md:hidden rounded-full bg-[#272727] animate-pulse ml-auto"
                />
            </div>

            {/* Album Tracks */}
            <div className="px-1 md:px-6">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center text-sm py-2.5 px-3 md:px-4 animate-pulse"
                    >
                        {/* Index */}
                        <div className="w-6 h-6 rounded-full text-white/40 bg-[#272727] hidden md:block" />

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3 ml-2">
                            {/* Track Title And Artist */}
                            <div className="min-w-0 space-y-1">
                                {/* Track Title */}
                                <div className="h-4 w-40 bg-[#272727] rounded-md" />

                                {
                                    tableView != "Compact List" && (
                                        <>
                                            {/* Track Artist */}
                                            <div className="h-3 w-24 bg-[#272727] rounded-md" />
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        {
                            tableView == "Compact List" && (
                                <>
                                    {/* Artist */}
                                    <div
                                        className={`flex-1 truncate ml-35 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"
                                            }`}
                                    >
                                        <div className="h-3 w-20 bg-[#272727] rounded-md" />
                                    </div>
                                </>
                            )
                        }

                        {/* Like, Duration And More */}
                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            {/* Like */}
                            <div className="w-4 h-4 bg-[#272727] rounded-full" />

                            {/* Duration */}
                            <div className="h-3 w-10 bg-[#272727] rounded-md" />

                            {/* More */}
                            <div className="w-5 h-5 bg-[#272727] rounded-full" />
                        </div>

                        {/* More Icon For Small Screen */}
                        <div className="w-16 text-right text-white/70 justify-end items-center gap-1 flex md:hidden">
                            <div className="w-5 h-5 bg-[#272727] rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const TrackPageSkeleton = () => {
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Track Info Section */}
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Track Cover */}
                <div
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                        ? "md:w-52 md:h-52"
                        : leftPanelSize >= 32 && leftPanelSize <= 38
                            ? "md:w-35 md:h-35"
                            : "md:w-40 md:h-40"
                        } bg-[#272727] animate-pulse rounded-[4px] shrink-0`}
                />

                {/* Track Info */}
                <div className="min-w-0 w-full space-y-2">
                    <div className="h-4 bg-[#272727] rounded-md w-1/6 animate-pulse mx-auto md:mx-0" />
                    <div className="h-8 bg-[#272727] rounded-md w-3/4 animate-pulse mx-auto md:mx-0" />
                    <div className="h-4 bg-[#272727] rounded-md w-1/3 animate-pulse mx-auto md:mx-0" />
                </div>
            </div>

            {/* Track Controls */}
            <div
                className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}
            >
                {/* Play */}
                <div
                    className="p-[28px] hidden md:block rounded-full bg-[#272727] animate-pulse"
                />

                {/* Save */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* Share */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* More */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* Play Small Screen */}
                <div
                    className="p-[28px] block md:hidden rounded-full bg-[#272727] animate-pulse ml-auto"
                />
            </div>

            <div className="relative max-w-[90rem] mx-auto">
                {/* Recommended section */}
                <div className="mb-4 px-4 md:px-6 mt-4 space-y-2">
                    <div className="h-5 w-32 bg-[#272727] rounded-md animate-pulse" />
                    <div className="h-3 w-40 bg-[#272727] rounded-md animate-pulse" />
                </div>


                {/* Recomended Tracks */}
                <div className="px-1 md:px-6">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center text-sm py-2.5 px-3 md:px-4 animate-pulse"
                        >
                            {/* Index */}
                            <div className="w-6 h-6 rounded-full text-white/40 bg-[#272727] hidden md:block" />

                            {/* Cover and Titles */}
                            <div className="flex-1 min-w-0 flex items-center gap-3 ml-2">
                                {/* Skeleton image */}
                                <div className="bg-[#272727] w-[50px] h-[50px] md:w-[42px] md:h-[42px] rounded-[4px] flex-shrink-0" />
                                <div className="min-w-0 space-y-1">
                                    {/* Title skeleton */}
                                    <div className="h-4 w-40 bg-[#272727] rounded-md" />
                                    {/* Artist skeleton */}
                                    <div className="h-3 w-24 bg-[#272727] rounded-md" />
                                </div>
                            </div>

                            {/* Action buttons + duration (desktop) */}
                            <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                                <div className="w-4 h-4 bg-[#272727] rounded-full" />
                                <div className="h-3 w-10 bg-[#272727] rounded-md" />
                                <div className="w-5 h-5 bg-[#272727] rounded-full" />
                            </div>

                            {/* More button (mobile) */}
                            <div className="w-16 text-right text-white/70 justify-end items-center gap-1 flex md:hidden">
                                <div className="w-5 h-5 bg-[#272727] rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

const PlaylistPageSkeleton = () => {
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const { tableView } = useTableColumnVisibilityStore();

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Playlist Info Section */}
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Playlist Cover */}
                <div
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                        ? "md:w-52 md:h-52"
                        : leftPanelSize >= 32 && leftPanelSize <= 38
                            ? "md:w-35 md:h-35"
                            : "md:w-40 md:h-40"
                        } bg-[#272727] animate-pulse rounded-[4px] shrink-0`}
                />

                {/* playlist Info */}
                <div className="min-w-0 w-full space-y-2">
                    <div className="h-4 bg-[#272727] rounded-md w-1/6 animate-pulse mx-auto md:mx-0" />
                    <div className="h-8 bg-[#272727] rounded-md w-3/4 animate-pulse mx-auto md:mx-0" />
                    <div className="h-4 bg-[#272727] rounded-md w-1/3 animate-pulse mx-auto md:mx-0" />
                </div>
            </div>

            {/* Playlist Controls */}
            <div
                className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}
            >
                {/* Play */}
                <div
                    className="p-[28px] hidden md:block rounded-full bg-[#272727] animate-pulse"
                />

                {/* Preview */}
                <div
                    className={`${leftPanelSize <= 28 ? "w-[38px] h-[48px]" : "w-[36px] h-[46px]"
                        } flex-shrink-none relative rounded-md group bg-[#272727] animate-pulse `}
                />

                {/* Save */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* Share */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* More */}
                <div
                    className="p-[13.5px] rounded-full bg-[#272727] animate-pulse"
                />

                {/* View */}
                <div
                    className="relative ml-auto items-center p-[13.5px] hidden md:flex rounded-full bg-[#272727] animate-pulse"
                />

                {/* Play Small Screen */}
                <div
                    className="p-[28px] block md:hidden rounded-full bg-[#272727] animate-pulse ml-auto"
                />
            </div>

            {/* Playlist Tracks */}
            <div className="px-1 md:px-6">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center text-sm py-2.5 px-3 md:px-4 animate-pulse"
                    >
                        {/* Index */}
                        <div className="w-6 h-6 rounded-full text-white/40 bg-[#272727] hidden md:block" />

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3 ml-2">
                            {
                                tableView != "Compact List" && (
                                    <>
                                        {/* Track Image */}
                                        <div className="bg-[#272727] w-[50px] h-[50px] md:w-[42px] md:h-[42px] rounded-[4px] flex-shrink-0" />
                                    </>
                                )
                            }

                            {/* Track Title And Artist */}
                            <div className="min-w-0 space-y-1">
                                {/* Track Title */}
                                <div className="h-4 w-40 bg-[#272727] rounded-md" />

                                {
                                    tableView != "Compact List" && (
                                        <>
                                            {/* Track Artist */}
                                            <div className="h-3 w-24 bg-[#272727] rounded-md" />
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        {/* Album */}
                        <div
                            className={`flex-1 truncate ml-35 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"
                                }`}
                        >
                            <div className="h-3 w-20 bg-[#272727] rounded-md" />
                        </div>

                        {/* Date Added */}
                        <div
                            className={`w-32 ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"
                                }`}
                        >
                            <div className="h-3 w-20 bg-[#272727] rounded-md" />
                        </div>

                        {/* Like, Duration And More */}
                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            {/* Like */}
                            <div className="w-4 h-4 bg-[#272727] rounded-full" />

                            {/* Duration */}
                            <div className="h-3 w-10 bg-[#272727] rounded-md" />

                            {/* More */}
                            <div className="w-5 h-5 bg-[#272727] rounded-full" />
                        </div>

                        {/* More Icon For Small Screen */}
                        <div className="w-16 text-right text-white/70 justify-end items-center gap-1 flex md:hidden">
                            <div className="w-5 h-5 bg-[#272727] rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const CollectionTracksPageSkeleton = () => {
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize } = leftSidebar;
    const {tableView} = useTableColumnVisibilityStore();

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Collection Info Section */}
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Collection Cover */}
                <div
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                        ? "md:w-52 md:h-52"
                        : leftPanelSize >= 32 && leftPanelSize <= 38
                            ? "md:w-35 md:h-35"
                            : "md:w-40 md:h-40"
                        } bg-[#272727] animate-pulse rounded-[4px] shrink-0`}
                />

                {/* Collection Info */}
                <div className="min-w-0 w-full space-y-2">
                    <div className="h-4 bg-[#272727] rounded-md w-1/6 animate-pulse mx-auto md:mx-0" />
                    <div className="h-8 bg-[#272727] rounded-md w-3/4 animate-pulse mx-auto md:mx-0" />
                    <div className="h-4 bg-[#272727] rounded-md w-1/3 animate-pulse mx-auto md:mx-0" />
                </div>
            </div>

            {/* Collection Controls */}
            <div
                className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}
            >
                {/* Play */}
                <div
                    className="p-[28px] hidden md:block rounded-full bg-[#272727] animate-pulse"
                />

                {/* View */}
                <div
                    className="relative ml-auto items-center p-[13.5px] hidden md:flex rounded-full bg-[#272727] animate-pulse"
                />

                {/* Play Small Screen */}
                <div
                    className="p-[28px] block md:hidden rounded-full bg-[#272727] animate-pulse ml-auto"
                />
            </div>

            {/* Collection Tracks */}
            <div className="px-1 md:px-6">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center text-sm py-2.5 px-3 md:px-4 animate-pulse"
                    >
                        {/* Index */}
                        <div className="w-6 h-6 rounded-full text-white/40 bg-[#272727] hidden md:block" />

                        {/* Title with Image */}
                        <div className="flex-1 min-w-0 flex items-center gap-3 ml-2">
                            {
                                tableView != "Compact List" && (
                                    <>
                                        {/* Track Image */}
                                        <div className="bg-[#272727] w-[50px] h-[50px] md:w-[42px] md:h-[42px] rounded-[4px] flex-shrink-0" />
                                    </>
                                )
                            }

                            {/* Track Title And Artist */}
                            <div className="min-w-0 space-y-1">
                                {/* Track Title */}
                                <div className="h-4 w-40 bg-[#272727] rounded-md" />

                                {
                                    tableView != "Compact List" && (
                                        <>
                                            {/* Track Artist */}
                                            <div className="h-3 w-24 bg-[#272727] rounded-md" />
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        {/* Album */}
                        <div
                            className={`flex-1 truncate ml-35 text-sm ${leftPanelSize <= 28 ? "hidden md:block" : "hidden md:hidden"
                                }`}
                        >
                            <div className="h-3 w-20 bg-[#272727] rounded-md" />
                        </div>

                        {/* Date Added */}
                        <div
                            className={`w-32 ml-5 ${leftPanelSize <= 25 ? "hidden md:block" : "hidden md:hidden"
                                }`}
                        >
                            <div className="h-3 w-20 bg-[#272727] rounded-md" />
                        </div>

                        {/* Like, Duration And More */}
                        <div className="w-23 text-right justify-end items-center gap-2 hidden md:flex">
                            {/* Like */}
                            <div className="w-4 h-4 bg-[#272727] rounded-full" />

                            {/* Duration */}
                            <div className="h-3 w-10 bg-[#272727] rounded-md" />

                            {/* More */}
                            <div className="w-5 h-5 bg-[#272727] rounded-full" />
                        </div>

                        {/* More Icon For Small Screen */}
                        <div className="w-16 text-right text-white/70 justify-end items-center gap-1 flex md:hidden">
                            <div className="w-5 h-5 bg-[#272727] rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function CompactListItemsSkeleton() {
    return (
        <div className="flex-1 px-3 mb-4">
            {Array.from({ length: 10 }).map(() => (
                <div className="flex items-center space-x-3 p-2 rounded">
                    {/* Skeleton for Text */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-4 w-3/4 bg-[#353535] rounded animate-pulse" />
                        <div className="h-3 w-1/3 bg-[#353535] rounded animate-pulse" />
                    </div>
                </div>
            ))}

        </div>
    )
}

function DefaultListItemsSkeleton() {
    return (
        <div className="flex-1 px-3 mb-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center space-x-3 p-2 rounded"
                >
                    {/* Skeleton for Image */}
                    <div className="w-12 h-12 rounded-[4px] bg-[#353535] animate-pulse" />

                    {/* Skeleton for Text */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-4 w-3/4 bg-[#353535] rounded animate-pulse" />
                        <div className="h-3 w-1/3 bg-[#353535] rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function CompactGridItemsSkeleton() {
    const { breakPoint } = useBreakPoint();
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakPoint === "md"
                    ? "grid-layout"
                    : (leftPanelSize <= 28 && breakPoint != "sm")
                        ? "grid-layout"
                        : "custom-grid-layout"
                } px-3 mb-4`}
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-3 rounded-[4px] flex flex-col overflow-hidden">
                    {/* Skeleton Image */}
                    <div className="relative w-full aspect-square rounded-[4px] bg-[#353535] animate-pulse" />
                </div>
            ))}
        </div>
    )
}

function DefaultGridItemsSkeleton() {
    const { breakPoint } = useBreakPoint();
    const { leftSidebar } = useUIPreferencesStore();
    const { panelSize: leftPanelSize, isExpanded: isLeftSidebarExpanded } = leftSidebar;

    return (
        <div
            className={`${isLeftSidebarExpanded
                ? "expand-grid-layout"
                : breakPoint === "md"
                    ? "grid-layout"
                    : (leftPanelSize <= 28 && breakPoint != "sm")
                        ? "grid-layout"
                        : "custom-grid-layout"
                } px-3 mb-4`}
        >
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="p-3 rounded-[4px] flex flex-col overflow-hidden">
                    {/* Skeleton Image */}
                    <div className="relative w-full aspect-square rounded-[4px] bg-[#353535] animate-pulse" />

                    {/* Skeleton Text Section */}
                    <div className="w-full mt-2 space-y-2">
                        <div className="h-4 w-3/4 bg-[#353535] rounded animate-pulse" />
                        <div className="h-3 w-1/4 bg-[#353535] rounded animate-pulse" />
                    </div>
                </div>
            ))}
        </div>
    )
}

function SmallScreenLibraryPanelSkelton() {
    return (
        <div className="mb-4">
            <div className="flex flex-col space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex justify-center">
                        <div className="p-2 rounded-[4px] relative flex-shrink-0">
                            {/* Skeleton Image */}
                            <div className="w-12 h-12 rounded-[4px] bg-[#353535] animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export {
    HomePageSkeleton,
    AlbumPageSkeleton,
    TrackPageSkeleton,
    PlaylistPageSkeleton,
    CollectionTracksPageSkeleton,
    CompactListItemsSkeleton,
    DefaultListItemsSkeleton,
    CompactGridItemsSkeleton,
    DefaultGridItemsSkeleton,
    SmallScreenLibraryPanelSkelton,
}