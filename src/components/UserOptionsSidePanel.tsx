import React from 'react'
import type { MenuOptions } from '../types';
import { useCheckAuth } from '../hooks/auth';
import { DEFAULT_USER_IMAGE_URL } from '../constants';

interface UserOptionsSidePanelProps {
    isOpen: boolean;
    options: MenuOptions;
    onClose: () => void;
}

const UserOptionsSidePanel: React.FC<UserOptionsSidePanelProps> = ({ isOpen, options, onClose }) => {
    const { data: currentUser } = useCheckAuth();

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-[799] bg-black/60 transition-opacity duration-400 
                    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 left-0 h-full w-[75%] bg-[#121212] border-r border-[#282828] z-[800] transform transition-transform duration-400 ease-in-out 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Profile</h2>
                        <button
                            onClick={onClose}
                            className="text-[#8f8f8f] hover:text-white transition"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Profile Content */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={currentUser?.avatarUrl || DEFAULT_USER_IMAGE_URL}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-lg font-semibold text-white">{currentUser?.displayName || 'User'}</h3>
                        <p className="text-sm text-[#8f8f8f]">{currentUser?.email || 'user@example.com'}</p>
                    </div>

                    {/* Menu Options */}
                    <div className="flex-1 overflow-y-auto">
                        {
                            options.map(({ label }) => (
                                <button className="w-full text-left px-4 py-3 text-white hover:bg-[#282828] rounded transition">
                                    {label}
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOptionsSidePanel