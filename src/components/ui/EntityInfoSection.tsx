import type React from "react";
import { useUIPreferencesStore } from "../../store/useUIPreferenceStore";

interface EntityInfo {
    imgUrl: string;
    displayType: string;
    title: string;
    description: string;
}

interface EntityInfoSectionProps {
    entity: EntityInfo;
    dominateColor: string;
}

const EntityInfoSection: React.FC<EntityInfoSectionProps> = ({
    entity: {
        imgUrl,
        displayType,
        title,
        description
    },
    dominateColor
}) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div style={{ background: dominateColor }}>
            <div className={`relative flex flex-col md:flex-row items-center gap-6 p-6 max-w-[90rem] mx-auto`}>
                {/* Entity Cover */}
                <img
                    src={imgUrl}
                    alt="Entity Imgurl"
                    className={`w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                        ? "md:w-52 md:h-52"
                        : leftPanelSize >= 32 && leftPanelSize <= 38
                            ? "md:w-35 md:h-35"
                            : "md:w-40 md:h-40"
                        } shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-[4px]`}
                />

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
                    <p className="text-sm text-gray-300 mt-2 truncate">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default EntityInfoSection;
