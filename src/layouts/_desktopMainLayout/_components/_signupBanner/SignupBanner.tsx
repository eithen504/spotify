import { useNavigate } from "react-router-dom"

const SignupBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black py-1">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 flex items-center justify-between text-white">
                <div className="flex flex-col">
                    <h3 className="text-sm font-semibold mb-1">Preview of Spotify</h3>
                    <p className="text-sm opacity-90">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
                </div>
                <button className="bg-white text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap ml-4 cursor-pointer"
                    onClick={() => navigate('/auth')}
                >
                    Sign up for free
                </button>
            </div>
        </div>
    )
}

export default SignupBanner