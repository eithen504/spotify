import type React from "react"
import { DownArrowIcon, MoreIcon } from "../../../../Svgs";

interface HeaderProps {
    onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
    return (
        <div className="flex items-center justify-between px-4 py-3 text-[#ffffff] flex-shrink-0">
            <button className="cursor-pointer"
                onClick={onClose}
            >
                <DownArrowIcon width="24" height="24" />
            </button>
            
            <h1 className="text-xs font-medium">Now Playing</h1>

            <button className="cursor-pointer rotate-90 active:text-white/60">
                <MoreIcon width="24" height="24" />
            </button>
        </div>
    )
}

export default Header