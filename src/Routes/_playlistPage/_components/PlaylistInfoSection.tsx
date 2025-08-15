import { useUIPreferencesStore } from '../../../store/useUIPreferenceStore'

const PlaylistInfoSection = () => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div style={{ background: "#2D2453" }}>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto">
                {/* Playlist Cover */}
                <img
                    src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da849d25907759522a25b86a3033"
                    alt="Tollywood Pearls"
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:w-52 md:h-52" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:w-35 md:h-35" : "md:w-40 md:h-40"} shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-[4px]`}
                />
                {/* Playlist Info */}
                <div className="flex flex-col flex-1 min-w-0 text-center md:text-left">
                    <span className="text-sm font-semibold">Public Playlist</span>
                    <h1 className={`text-2xl ${leftPanelSize >= 7 && leftPanelSize <= 10 ? "md:text-6xl" : leftPanelSize >= 32 && leftPanelSize <= 38 ? "md:text-4xl" : "md:text-5xl"} font-bold mt-2 truncate`}>
                        Tollywood Pearls djddhhdhdhd
                    </h1>
                    <p className="text-sm text-gray-300 mt-2 truncate">Created by User • 25 songs, 2 hr 15 min</p>
                </div>
            </div>
        </div>
    )
}

export default PlaylistInfoSection