import { useState, useRef, useEffect } from "react";

// Array for dropdown items
const dropdownItems = [
    { label: "Account", external: true },
    { label: "Profile", external: false },
    { label: "Upgrade to Premium", external: true },
    { label: "Support", external: true },
    { label: "Download", external: true },
    { label: "Settings", external: false, dividerBelow: true },
    { label: "Log out", external: false, isLogout: true },
];

const RightSection = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicked outside
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
                className="hidden lg:block text-black bg-[#ffffff] py-1.5 px-4 rounded-full text-sm font-semibold cursor-pointer"
                title="Explore Premium"
            >
                Explore Premium
            </button>

            {/* "E" Profile Button */}
            <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm"
            >
                E
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute top-full right-0 mt-[17px] w-56 bg-[#1f1f1f] text-[#ffffff] rounded-lg shadow-lg border border-[#333] text-sm z-100"
                >
                    {dropdownItems.map((item, index) => (
                        <div key={index}>
                            <div
                                className={`flex items-center justify-between px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer ${item.isLogout ? "text-red-400 font-medium" : ""
                                    }`}
                            >
                                {item.label}
                                {item.external && !item.isLogout && (
                                    <span className="ml-2">↗</span>
                                )}
                            </div>
                            {item.dividerBelow && <div className="border-b border-[#333]" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RightSection;
