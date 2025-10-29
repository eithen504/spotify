import React from 'react'
import type { MenuOptions } from '../../../../types';

interface UserOptionsMenuProps {
    options: MenuOptions;
    userMenuRef: React.RefObject<HTMLDivElement | null>
    onClose: () => void;
}

const UserOptionsMenu: React.FC<UserOptionsMenuProps> = ({ options, userMenuRef, onClose }) => {
    return (
        <>
            <div
                className="fixed inset-0 z-800"
                onClick={onClose}
            />

            <div
                className="fixed w-55 z-800 bg-[#282828] rounded-[4px] shadow-[0_4px_5px_rgba(0,0,0,0.8)] text-sm text-[#ffffff]"
                style={{
                    top: `${(userMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 9}px`,
                    right: '28px'
                }}
            >
                <div className="p-1">
                    {
                        options.map(({ icon, label, action, hasTopBorder }) => (
                            <div key={label} className={`${hasTopBorder ? "border-t border-[#3E3E3E]" : ""}`}>
                                <button
                                    className="w-full px-3 py-2.5 text-left text-[#ffffff] dynamic-bg-hover flex items-center justify-between group transition-colors cursor-pointer"
                                    style={{
                                        '--bgHoverColor': '#3E3E3E',
                                    } as React.CSSProperties}
                                    onClick={action}
                                >
                                    <span className="text-sm">{label}</span>
                                    {icon}
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default UserOptionsMenu
