import { useState, useRef, useEffect } from "react";

const RightSection = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center gap-4">
            {/* Browse Premium */}
            <button
                className="hidden lg:block text-[#000000] bg-[#ffffff] py-1.5 px-4 rounded-full text-sm font-semibold cursor-pointer"
                title="Explore Premium"
            >
                Explore Premium
            </button>

            {/* User Profile */}
            <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm"
            >
                E
            </button>

            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 top-12 w-56 bg-[#1F1F1F] rounded-[6px] shadow-lg text-sm text-white py-2 z-500"
                >
                    <DropdownItem label="Account" external />
                    <DropdownItem label="Profile" />
                    <DropdownItem label="Upgrade to Premium" external />
                    <DropdownItem label="Support" external />
                    <DropdownItem label="Download" external />
                    <div className="border-t border-gray-600 my-1" />
                    <DropdownItem label="Settings" />
                    <DropdownItem label="Log out" />
                </div>
            )}
        </div>
    );
};

const DropdownItem = ({ label, external }: { label: string; external?: boolean }) => (
    <div className="px-4 py-2 hover:bg-[#333] flex items-center justify-between cursor-pointer">
        <span>{label}</span>
        {external && (
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6m5-3h5v5m-11 11L21 3" />
            </svg>
        )}
    </div>
);

export default RightSection;
