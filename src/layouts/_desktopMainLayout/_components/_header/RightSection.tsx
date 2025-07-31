const RightSection = () => {
    return (
        <div className="flex items-center gap-4">
            {/* Browse Premium */}
            <button className="hidden lg:block text-gray-300 hover:text-white text-sm font-semibold">
                Explore Premium
            </button>

            {/* User Profile */}
            <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm hover:scale-105">
                E
            </button>
        </div>
    )
}

export default RightSection