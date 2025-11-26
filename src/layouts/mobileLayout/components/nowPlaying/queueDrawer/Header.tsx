import React from 'react'
import { CrossIcon } from '../../../../../Svgs';

type HeaderProps = {
    onClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => {
    return (
        <div className="flex items-center justify-between flex-shrink-0 p-4 w-full sticky top-0 z-5  bg-[#282828]">
            <p className="text-md font-bold text-[#ffffff] truncate">
                Queue
            </p>

            <button
                className="text-[#8f8f8f] dynamic-text-hover p-[8px] cursor-pointer rounded-full transition-colors"
                title="Close Queue Drawer"
                onClick={onClose}
            >
                <CrossIcon width="15" height="15" />
            </button>
        </div>
    )
}

export default Header