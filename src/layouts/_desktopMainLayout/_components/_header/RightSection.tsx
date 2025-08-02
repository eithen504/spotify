const RightSection = () => {
    return (
        <div className="flex items-center gap-4">
            {/* Browse Premium */}
            <button
                className="hidden lg:block text-[#000000] bg-[#ffffff] py-1.5 px-4 rounded-full text-sm font-semibold cursor-pointer"
                title="Explore Premium"
            >
                Explore Premium
            </button>

            {/* User Profile */}
            <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                E
            </button>
        </div>
    )
}

export default RightSection