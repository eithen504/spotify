import React from 'react'
import type { MenuOption } from '../../../../Types';

interface ProfileDropdownProps {
    profileMenuOptions: MenuOption[];
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ profileMenuOptions }) => {
    return (
        <div className="absolute right-0 top-14 w-52 bg-[#282828] rounded-[4px] shadow-[0_0_20px_rgba(0,0,0,0.8)] py-1 z-200">
            {profileMenuOptions.map(({ icon, label, action, hasTopBorder }) => (
                <div className="px-1">
                    <div key={label} className={`${hasTopBorder ? "border-t border-[#3E3E3E]" : ""}`}>
                        <button
                            className="w-full px-3 py-2.5 text-left text-[#ffffff] dynamic-bg-hover rounded-[2px] flex items-center justify-between group transition-colors cursor-pointer"
                            style={{
                                '--bgHoverColor': '#3E3E3E',
                            } as React.CSSProperties}
                            onClick={action}
                        >
                            <span className="text-sm font-semibold">{label}</span>
                            {icon}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfileDropdown