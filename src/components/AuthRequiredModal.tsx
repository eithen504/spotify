import React, { useEffect, useRef } from "react";
import { useDominantColor } from "../hooks/color";
import { Link, useNavigate } from "react-router-dom";

interface AuthRequiredModalProps {
    onClose: () => void;
    imgUrl: string;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
    onClose,
    imgUrl,
}) => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const { dominantColor } = useDominantColor(imgUrl);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-grayscale-[100%] z-[100]">
            <div ref={containerRef}>
                {/* Modal */}
                <div
                    className="flex animate-slide-up flex-col md:flex-row items-stretch gap-10 p-16 text-white border border-[#1F1F1F] rounded-md w-full max-w-[815px] shadow-lg relative"
                    style={{
                        background: `linear-gradient(${dominantColor || "#3C3C3C"}, #121212)`,
                    }}
                >
                    {/* Left: Album/Poster */}
                    <div className="flex-shrink-0 w-[290px] h-[290px] overflow-hidden rounded-md">
                        <img
                            src={imgUrl}
                            alt="Auth Required"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="flex flex-col justify-center flex-1 text-center">
                        <h2 className="text-[32px] font-bold leading-snug">
                            Start listening with a free Spotify account
                        </h2>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4 mt-4 w-full md:w-auto items-center">
                            <button
                                className="bg-[#1ED760] dynamic-bg-hover text-black font-semibold px-8 py-3 rounded-full transition w-full md:w-auto cursor-pointer"
                                style={{
                                    '--bgHoverColor': '#3BE477',
                                } as React.CSSProperties}
                                onClick={() => navigate("/auth")}
                            >
                                Sign up for free
                            </button>
                            <Link
                                to={"https://www.spotify.com/in-en/download/windows/?referrer=dwp"}
                                className="bg-transparent border border-white/30 dynamic-border-hover text-white font-semibold px-8 py-3 rounded-full transition w-full md:w-auto cursor-pointer"
                            >
                                Download app
                            </Link>
                        </div>

                        {/* Login link */}
                        <p className="text-sm text-white/70 mt-6 text-center">
                            Already have an account?{" "}
                            <Link to={"/auth"} className="underline hover:text-white font-extrabold cursor-pointer">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Close text outside modal */}
                <div className="w-full flex justify-center mt-4">
                    <div
                        className="text-md font-semibold text-white/80 dynamic-text-hover px-4 py-1 rounded-md cursor-pointer"
                        onClick={onClose}
                    >
                        <span>Close</span>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default AuthRequiredModal;
