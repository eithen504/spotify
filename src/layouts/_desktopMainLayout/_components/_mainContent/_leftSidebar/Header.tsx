import { CollapsedIcon, ExpandIcon, PlusIcon } from "../../../../../Svgs"

const Header = () => {
    return (
        <div className="flex items-center justify-between mb-1 px-5 py-3">
            <div className="flex gap-2 items-center">
                <button className="text-[#8f8f8f] hover:text-[#ffffff] cursor-pointer transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-400 ease-out">
                    <CollapsedIcon width="17" height="17" />
                </button>

                <p className="text-md font-bold text-[#ffffff] -ml-7 group-hover:ml-0 transition-all duration-400">Your Library</p>
            </div>

            <div className="flex items-center space-x-2">
                <button className="p-[10px] rounded-full text-[#8f8f8f] hover:text-[#ffffff] bg-[#1f1f1f] hover:bg-[#282828] flex items-center justify-center transition cursor-pointer">
                    <PlusIcon width="16" height="16" />
                </button>
                <button className="p-[9.5px] rounded-full text-[#8f8f8f] hover:text-[#ffffff] hover:bg-[#1f1f1f] flex items-center justify-center transition cursor-pointer">
                    <ExpandIcon width="16" height="16" />
                </button>
            </div>
        </div>
    )
}

export default Header