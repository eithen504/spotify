import { ExpandIcon, MoreIcon, UnCollapsedIcon } from "../../../../../Svgs"

interface HeaderProps {
    isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
    return (
        <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} flex items-center justify-between flex-shrink-0 p-4 w-full sticky top-0 bg-[#121212] z-50`}>
            {/* Title and collapse button */}
            <div className="flex gap-2 items-center">
                <button className="text-[#8f8f8f] hover:text-[#ffffff] cursor-pointer transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-400 ease-out">
                    <UnCollapsedIcon width="20" height="20" />
                </button>

                <p className="text-md font-bold text-[#ffffff] -ml-7 group-hover:ml-0 transition-all duration-400">Play Date</p>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                <button className="text-[#8f8f8f] hover:text-[#ffffff] hover:bg-[#1E1E1E] p-[6px] cursor-pointer rounded-full transition-colors">
                    <MoreIcon width="20" height="20" />
                </button>

                <button className="text-[#8f8f8f] hover:text-[#ffffff] hover:bg-[#1E1E1E] p-[8px] cursor-pointer rounded-full transition-colors">
                    <ExpandIcon width="16" height="16" />
                </button>
            </div>
        </div>
    )
}

export default Header