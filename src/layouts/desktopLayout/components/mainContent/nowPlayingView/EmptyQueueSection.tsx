import { useNavigate } from "react-router-dom";
import { useTrackDetailsStore } from "../../../../../store/useTrackDetailsStore";

const EmptyQueueSection = () => {
    const navigate = useNavigate();
    const { trackDetails } = useTrackDetailsStore();

    return (
        <div className="bg-[#1e1e1e] mt-4 p-4 rounded-md shadow-md flex flex-col items-center justify-center text-center space-y-3">
            <h2 className="text-white text-md font-bold">
                Your queue is empty
            </h2>
            <button
                className={`border border-[#7c7c7c] ${trackDetails._id ? "cursor-pointer dynamic-border-hover" : "cursor-not-allowed"} py-1.5 px-6 text-sm font-medium rounded-full`}
                onClick={() => navigate("/search")}
                disabled={!trackDetails._id}
            >
                Search for something new
            </button>
        </div>
    );
};

export default EmptyQueueSection;
