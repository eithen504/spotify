import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDominantColor } from "../hooks/color";
import { SPOTIFY_IMAGE_URL } from "../constants";

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
    const { dominantColor } = useDominantColor(imgUrl || SPOTIFY_IMAGE_URL);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-grayscale-[100%] px-4">
            <div ref={containerRef}>
                {/* Modal */}
                <div
                    className="animate-slide-up flex flex-col md:flex-row items-center gap-8 p-12 md:p-16 text-white border border-[#1F1F1F] rounded-md w-full max-w-[815px] shadow-lg"
                    style={{
                        background: `linear-gradient(${dominantColor}, #121212)`,
                    }}
                >
                    {/* Image */}
                    <div className="flex-shrink-0 w-[200px] h-[200px] md:w-[290px] md:h-[290px] overflow-hidden rounded-md">
                        <img
                            src={imgUrl || SPOTIFY_IMAGE_URL}
                            alt="Auth Required"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center text-center flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-center max-w-[20rem] mx-auto">
                            Start listening with a free Spotify account
                        </h2>

                        {/* Buttons */}
                        <div className="flex flex-col gap-4 mt-8 items-center w-full">
                            <button
                                className="
                                    bg-[#1ED760] dynamic-bg-hover text-black font-bold md:font-semibold
                                    px-6 py-3 text-sm
                                    md:px-8 md:py-3 md:text-lg
                                    rounded-full transition
                                    min-w-[160px] md:min-w-[220px]
                                    cursor-pointer
                                "
                                style={{
                                    '--bgHoverColor': '#3BE477',
                                } as React.CSSProperties}
                                onClick={() => navigate('/auth')}
                            >
                                Sign up for free
                            </button>

                            <Link
                                to="https://www.spotify.com/in-en/download/windows/?referrer=dwp"
                                className="
                                    bg-transparent border border-white/30 dynamic-border-hover text-white font-semibold
                                     px-6 py-3 text-sm
                                    md:px-8 md:py-3 md:text-lg
                                    rounded-full transition
                                    min-w-[160px] md:min-w-[220px]
                                    cursor-pointer
                                "
                            >
                                Download app
                            </Link>
                        </div>

                        {/* Login */}
                        <p className="text-[11px] md:text-sm text-white/70 mt-8">
                            Already have an account?{" "}
                            <Link
                                to="/auth"
                                className="underline font-extrabold hover:text-white"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Close */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="text-sm font-semibold text-white/80 hover:text-white transition cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthRequiredModal;
