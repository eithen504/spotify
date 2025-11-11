import React from 'react'
import { useUIPreferencesStore } from '../../../../../store/useUIPreferenceStore';
import type { MenuOptions } from '../../../../../types';

interface CreateOptionsMenuProps {
    options: MenuOptions
    createMenuRef: React.RefObject<HTMLDivElement | null>
    onClose: () => void;
}

const CreateOptionsMenu: React.FC<CreateOptionsMenuProps> = ({ options, createMenuRef, onClose }) => {
    const { preferences } = useUIPreferencesStore();
    const { leftSidebar } = preferences;
    const { isExpanded: isLeftSidebarExpanded } = leftSidebar;

    return (
        <>
            <div
                className="fixed inset-0 z-800"
                onClick={onClose}
            />

            <div
                className="fixed w-85 z-800 bg-[#282828] rounded-[4px] shadow-[0_4px_5px_rgba(0,0,0,0.8)] text-sm text-[#ffffff]"
                style={{
                    top: `${(createMenuRef.current?.getBoundingClientRect().bottom ?? 0) + 12}px`,
                    ...((isLeftSidebarExpanded) && {
                        right: `72px`,
                    }),
                }}
            >
                <div className="p-1">
                    {
                        options.map(({ icon, label, sublabel, action, hasTopBorder }, idx) => (
                            <div
                                key={idx}
                                className={`${hasTopBorder ? "border-t border-[#3E3E3E]" : ""}`}
                            >
                                <button
                                    className="group w-full px-2 py-2 text-left text-[#ffffff] dynamic-bg-hover rounded-[2px] flex items-center justify-between group transition-colors cursor-pointer"
                                    style={{
                                        '--bgHoverColor': '#3E3E3E',
                                    } as React.CSSProperties}
                                    onClick={action}
                                >
                                    <div className="flex justify-center items-center gap-3">
                                        <div
                                            className="p-3 text-[#efefef] dynamic-text-group-hover bg-[#525252] group-hover-rotate rounded-full flex items-center justify-center transition-transform duration-300"
                                            style={{
                                                '--textGroupHoverColor': '#3BE477',
                                                '--hoverRotate': '7deg'
                                            } as React.CSSProperties}
                                        >
                                            {icon}
                                        </div>
                                        <div>
                                            <div className="text-[#ffffff] text-[16px] font-medium">{label}</div>
                                            <div className="text-[#A7A7A7] text-sm">{sublabel}</div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CreateOptionsMenu