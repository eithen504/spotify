import { useNavigate } from "react-router-dom";
import { AddIcon, MoreIcon, PlayIcon, ShareIcon } from "../../../Svgs";

const episodes = [
    {
        title: 'Reason Why Jey Uso Won Royal Rumble 2025',
        creator: 'Asli Akhada',
        date: '2 Feb',
        duration: '21 min 9 sec',
        description:
            'At WWE Royal Rumble 2025, the action was intense with a thrilling 30 man royal rumble 2025 match that delivered unforgettable moments...',
        image: 'https://i.scdn.co/image/ab67656300005f1f123f5b836ff55c49b603388b'
    },
    {
        title: 'WWE Royal Rumble 2025 Predictions',
        creator: 'Asli Akhada',
        date: '1 Feb',
        duration: '19 min 38 sec',
        description:
            "The Royal Rumble 2025 Highlights are out and they're setting the WWE Universe abuzz! Fans can now watch the Royal Rumble 2025 Full Match...",
        image: 'https://i.scdn.co/image/ab67656300005f1f123f5b836ff55c49b603388b'
    },
];

const PodcastEpisodes = () => {
    const navigate = useNavigate()

    return (
        <div className="text-[#ffffff] p-4 md:p-6 mt-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">All Episodes</h2>
            {episodes.map((ep, index) => (
                <div
                    key={index}
                    className="group cursor-pointer flex items-start gap-4 p-4 rounded-none dynamic-bg-hover border-t border-[#2a2a2a]"
                    style={{
                        '--bgHoverColor': '#1F1F1F',
                    } as React.CSSProperties}
                    onClick={() => navigate("/episode/1234")}
                >
                    <img
                        src={ep.image}
                        alt={ep.title}
                        className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold hover:underline">{ep.title}</h3>
                        <p className="text-sm text-gray-300">Video • {ep.creator}</p>
                        <p className="text-sm mt-2 text-gray-400">{ep.description}</p>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-sm text-gray-300">
                                {ep.date} • {ep.duration}
                            </p>
                        </div>

                        {/* Two random SVGs at the bottom */}
                        <div className="flex justify-between mt-4">
                            <div className="flex gap-8">
                                <button className="text-white/70 dynamic-text-hover cursor-pointer">
                                    <AddIcon width="22" height="22" />
                                </button>
                                <button className="group-hover-opacity text-white/70 dynamic-text-hover cursor-pointer -mt-[3.6px]">
                                    <ShareIcon width="20" height="20" />
                                </button>
                                <button className="group-hover-opacity text-white/70 dynamic-text-hover cursor-pointer">
                                    <MoreIcon width="24" height="24" />
                                </button>
                            </div>


                            <button className="bg-white text-black rounded-full p-2">
                                <PlayIcon width="16" height="16" />
                            </button>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}

export default PodcastEpisodes