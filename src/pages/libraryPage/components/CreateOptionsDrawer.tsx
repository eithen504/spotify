import React from 'react'
import type { MenuOptions } from '../../../types';
import { Drawer, DrawerContent } from '../../../components/ui/drawer';


interface CreateOptionsDrawerProps {
    options: MenuOptions;
    onClose: () => void;
    height?: string;
}

const CreateOptionsDrawer: React.FC<CreateOptionsDrawerProps> = ({
    options,
    onClose,
    height
}) => {
    return (
        <Drawer open={true} onClose={onClose}>
            <DrawerContent
                className="bg-[#282828] rounded-t-2xl z-700 w-[80%] mx-auto"
                shouldShowDragHandle={true}
                style={{ height }}
            >
                {/* Options */}
                <div className="mt-3 p-1">
                    {options?.map(({ icon, label, action, sublabel }) => {
                        return (
                            <button
                                className="group w-full px-2 py-2 text-left text-[#ffffff] dynamic-bg-hover rounded-[2px] flex items-center justify-between group transition-colors cursor-pointer"
                                style={{
                                    '--bgHoverColor': '#3E3E3E',
                                } as React.CSSProperties}
                                onClick={action}
                            >
                                <div className="flex justify-center items-center gap-3">
                                    <div
                                        className="p-4 text-[#efefef] dynamic-text-group-hover bg-[#525252] group-hover-rotate rounded-full flex items-center justify-center transition-transform duration-300"
                                        style={{
                                            '--textGroupHoverColor': '#3BE477',
                                            '--hoverRotate': '7deg'
                                        } as React.CSSProperties}
                                    >
                                        {icon}
                                    </div>
                                    <div>
                                        <div className="text-[#ffffff] text-[16px] font-medium">{label}</div>
                                        <div className="text-[#A7A7A7] text-[13px]">{sublabel}</div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default CreateOptionsDrawer