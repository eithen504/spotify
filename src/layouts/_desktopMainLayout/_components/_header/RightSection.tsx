import { useState, useRef, useEffect } from "react";
import { useCheckAuth, useLogoutUser } from "../../../../hooks/auth";
import { useNavigate } from "react-router-dom";
import type { MenuOption } from "../../../../Types";
import { ExternalLinkIcon, PlusIcon } from "../../../../Svgs";
import ProfileDropdown from "./ProfileDropdown";

const RightSection = () => {
    const navigate = useNavigate();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [profileMenuOptions, setProfileMenuOptions] = useState<MenuOption[]>([]);
    const { data: currentUser, isLoading } = useCheckAuth()
    const { mutateAsync: logoutUser } = useLogoutUser()
    const profileDropdownRef = useRef<HTMLDivElement | null>(null);

    const isUnauthenticated = !isLoading && !currentUser;

    useEffect(() => {
        if (!currentUser) return

        const adminId = import.meta.env.VITE_ADMIN_ID;
        const isAdminProfile = currentUser._id == adminId;

        if (isAdminProfile) {
            setProfileMenuOptions([
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Account',
                    action: () => navigate("/account")
                },
                {
                    label: 'Profile',
                    action: () => navigate(`/show/${currentUser._id}`)
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Track',
                    action: () => { }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Playlist',
                    action: () => { }
                },
                {
                    icon: <PlusIcon width="16" height="16" />,
                    label: 'Upload Album',
                    action: () => { }
                },
                {
                    label: 'Settings',
                    action: () => { }
                },
                {
                    label: 'Log out',
                    action: () => { logoutUser() },
                    hasTopBorder: true
                },
            ])

        } else {
            setProfileMenuOptions([
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Account',
                    action: () => navigate("/account")
                },
                {
                    label: 'Profile',
                    action: () => navigate(`/show/${currentUser._id}`)
                },
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Upgrade to Premium',
                    action: () => { },
                },
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Support',
                    action: () => { }
                },
                {
                    icon: <ExternalLinkIcon width="16" height="16" />,
                    label: 'Download',
                    action: () => { },
                }, {
                    label: 'Settings',
                    action: () => { },
                },
                {
                    label: 'Log out',
                    action: () => { logoutUser() },
                    hasTopBorder: true
                },
            ])
        }
    }, [currentUser])

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center gap-4">
            {
                isUnauthenticated ? (
                    <>
                        <button className="hidden lg:block cursor-pointer text-gray-400 dynamic-text-hover text-sm font-semibold py-1.5 px-4 rounded-full"
                            onClick={() => navigate("/auth")}
                        >
                            Sign up
                        </button>

                        <button className="bg-white text-black cursor-pointer text-sm font-semibold py-2 px-6 rounded-full"
                            onClick={() => navigate("/auth")}
                        >
                            Login
                        </button>
                    </>
                ) : (
                    <>
                        {/* Browse Premium */}
                        <button
                            className="hidden lg:block text-black bg-[#ffffff] py-1.5 px-4 rounded-full text-sm font-semibold cursor-pointer"
                            title="Explore Premium"
                        >
                            Explore Premium
                        </button>

                        {/* Profile Button */}
                        <div className="relative flex items-center" ref={profileDropdownRef}>
                            <div
                                className="bg-[#121212] dynamic-bg-hover p-2 rounded-full cursor-pointer"
                                style={{
                                    '--bgHoverColor': '#1F1F1F',
                                } as React.CSSProperties}
                                onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                            >

                                {
                                    currentUser?.avatarUrl ? (
                                        <img src={currentUser?.avatarUrl} className="w-8 h-8 rounded-full" />
                                    ) : (
                                        <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm cursor-pointer">
                                            {currentUser?.displayName?.[0].toUpperCase()}
                                        </button>
                                    )
                                }
                            </div>

                            {/* Profile Dropdown */}
                            {isProfileDropdownOpen && (
                                <ProfileDropdown profileMenuOptions={profileMenuOptions} />
                            )}
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default RightSection;
