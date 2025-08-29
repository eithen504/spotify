import { useUIPreferencesStore } from "../../store/useUIPreferenceStore"

const TrackPageSkeleton = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div className="relative text-[#ffffff] min-h-screen">
            {/* Track Info Section */}
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Entity Cover */}
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
            <div className="relative max-w-[90rem] mx-auto">
                <div className={`gap-7 ${leftPanelSize <= 28 ? "md:gap-7" : "md:gap-4"} flex items-center px-4 md:px-6 py-6 relative max-w-[90rem] mx-auto`}>

                    {/* Play Button Skeleton (Desktop) */}
                    <div
                        className={`${leftPanelSize <= 28 ? "p-[19px]" : "p-[15px]"} hidden md:block bg-[#272727] rounded-full animate-pulse`}
                        style={{ width: 50, height: 50 }}
                    />

                    {/* Add Icon Skeleton */}
                    <div
                        className=" rounded-full animate-pulse bg-[#272727]"
                        style={{ width: leftPanelSize <= 28 ? 28 : 24, height: leftPanelSize <= 28 ? 28 : 24 }}
                    />

                    {/* Share Icon Skeleton */}
                    <div
                        className=" rounded-full animate-pulse bg-[#272727]"
                        style={{ width: leftPanelSize <= 28 ? 28 : 24, height: leftPanelSize <= 28 ? 28 : 24 }}
                    />

                    {/* More Icon Skeleton */}
                    <div
                        className=" rounded-full animate-pulse bg-[#272727]"
                        style={{ width: leftPanelSize <= 28 ? 28 : 24, height: leftPanelSize <= 28 ? 28 : 24 }}
                    />

                    {/* Play Button Skeleton (Mobile) */}
                    <div
                        className="block md:hidden bg-[#272727] rounded-full animate-pulse ml-auto"
                        style={{ width: 50, height: 50 }}
                    />
                </div>
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

export {
    TrackPageSkeleton
}