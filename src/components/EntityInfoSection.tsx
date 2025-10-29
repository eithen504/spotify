import type { JSX } from "react";
import type React from "react";
import { useUIPreferencesStore } from "../store/useUIPreferenceStore";
import { EntityCoverPlaceholder } from "./Placeholders";
import { EditIcon } from "../Svgs";

interface EntityInfo {
    imgUrl: string;
    displayType: string;
    title: string;
    description: string;
    placeholderIcon?: JSX.Element;
    isOwnEntity?: boolean;
}

interface EntityInfoSectionProps {
    entity: EntityInfo;
    dominateColor: string;
    onEditEntity?: () => void;
}

const EntityInfoSection: React.FC<EntityInfoSectionProps> = ({
    entity: {
        imgUrl,
        displayType,
        title,
        description,
        placeholderIcon,
        isOwnEntity
    },
    dominateColor,
    onEditEntity
}) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div style={{ background: dominateColor }}>
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Conditional :- Entity Cover Or Entity Cover Placeholder */}
                <div onClick={onEditEntity}>
                    {
                        imgUrl ? (
                            <div
                                className={`group relative flex items-center justify-center w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                                    ? "md:w-52 md:h-52"
                                    : leftPanelSize >= 32 && leftPanelSize <= 38
                                        ? "md:w-35 md:h-35"
                                        : "md:w-40 md:h-40"
                                    } ${isOwnEntity ? "cursor-pointer" : ""} shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-[4px] bg-[#282828] text-[#7F7F7F]`}
                            >
                                <img
                                    src={imgUrl}
                                    className="h-full w-full object-cover rounded-[4px]"
                                />

                                {/* Overlay */}
                                {
                                    isOwnEntity && (
                                        <div className="absolute inset-0 group-hover-flex flex-col items-center justify-center text-[#ffffff] bg-black/50 rounded-[4px]">
                                            <EditIcon width="50" height="50" />
                                            <h1 className="text-[#d1d5dc] dynamic-text-hover mt-2">Choose Photo</h1>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <EntityCoverPlaceholder placeholderIcon={placeholderIcon} isOwnEntity={isOwnEntity} />
                        )
                    }
                </div>

                {/* Entity Info */}
                <div className="flex flex-col flex-1 min-w-0 text-center md:text-left">
                    <span className="text-sm font-semibold">{displayType}</span>
                    <h1
                        className={`text-2xl ${leftPanelSize >= 7 && leftPanelSize <= 10
                            ? "md:text-6xl"
                            : leftPanelSize >= 32 && leftPanelSize <= 38
                                ? "md:text-4xl"
                                : "md:text-5xl"
                            } font-bold mt-2 truncate`}
                    >
                        {title}
                    </h1>
                    <p className="text-sm mt-2 truncate">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default EntityInfoSection;
