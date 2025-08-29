import type { JSX } from "react"
import type React from "react"
import { useUIPreferencesStore } from "../../../store/useUIPreferenceStore"

interface EntityCoverPlaceholderProps {
    placeHolderIcon?: JSX.Element
}

const EntityCoverPlaceholder: React.FC<EntityCoverPlaceholderProps> = ({ placeHolderIcon }) => {
    const { preferences: { leftPanelSize } } = useUIPreferencesStore();

    return (
        <div
            className={`flex items-center justify-center w-50 h-50 ${leftPanelSize >= 7 && leftPanelSize <= 10
                ? "md:w-52 md:h-52"
                : leftPanelSize >= 32 && leftPanelSize <= 38
                    ? "md:w-35 md:h-35"
                    : "md:w-40 md:h-40"
                } shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-[4px] bg-[#282828]`}
        >
            {placeHolderIcon}
        </div>
    )
}

export default EntityCoverPlaceholder