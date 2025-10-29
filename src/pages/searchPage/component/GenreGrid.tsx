import { useNavigate } from "react-router-dom";
import { GENRE_OPTIONS } from "../../../constants";
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore";

const GenreGrid = () => {
    const navigate = useNavigate()
    const { preferences: { leftPanelSize } } = useUIPreferencesStore()

    return (
        <>
            <div className="py-6 px-4 md:px-6">
                <h1 className="text-md md:text-3xl font-bold">Browse all</h1>
            </div>
            <div className={`grid grid-cols-2 ${leftPanelSize > 25 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6 px-4 md:px-6`}>
                {GENRE_OPTIONS.map((genre) => (
                    <div
                        key={genre.id}
                        className={`${genre.bgColor} rounded-md p-6 h-28 relative overflow-hidden cursor-pointer transform transition-all duration-300 group`}
                        onClick={() => navigate(`/genre/${genre.id}`)}
                    >
                        {/* Top-left text */}
                        <div className="absolute top-4 left-4 z-10">
                            <h3 className="text-xl font-bold text-white mb-1 transition-colors">
                                {genre.title}
                            </h3>
                        </div>

                        {/* Bottom-right image */}
                        <div
                            className="group-hover-rotate absolute -bottom-2 -right-3 w-23 h-23 z-0 transform transition-transform duration-300"
                            style={{
                                '--initialRotate': '27deg',
                                '--hoverRotate': '0deg',
                            } as React.CSSProperties}
                        >
                            <img src={genre.image} alt={genre.title} className="w-full h-full object-cover rounded shadow-[0_0_20px_rgba(0,0,0,0.4)]" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GenreGrid