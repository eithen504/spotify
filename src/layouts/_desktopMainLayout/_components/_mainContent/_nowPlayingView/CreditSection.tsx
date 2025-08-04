const CreditSection = () => {
    return (
        <div className="mt-6 bg-[#1e1e1e] p-4 rounded-md shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-[#ffffff]">Credits</h3>
                <button
                    className="text-sm font-medium text-[#aaaaaa] dynamic-text-hover hover:underline cursor-pointer"
                >
                    Show all
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-white font-medium">Title</p>
                    <p className="text-sm text-[#aaaaaa]">This Is Our Title</p>
                </div>
                <div>
                    <p className="text-white font-medium">Artist</p>
                    <p className="text-sm text-[#aaaaaa]">Michael Keenan</p>
                </div>
                <div>
                    <p className="text-white font-medium">Upload Date</p>
                    <p className="text-sm text-[#aaaaaa]">02/07/2025</p>
                </div>
            </div>
        </div>
    )
}

export default CreditSection