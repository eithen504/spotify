import { useUIPreferencesStore } from "../../../../../store/useUIPreferenceStore";
import { CrossIcon } from "../../../../../Svgs";

interface HeaderProps {
    isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
    const { setPreferences } = useUIPreferencesStore();

    const handleHideQueueView = () => {
        setPreferences({ showQueueView: false })
        localStorage.setItem("showQueueView", "false")
    }

    return (
        <div className={`${isScrolled ? "shadow-[0_4px_5px_rgba(0,0,0,0.8)]" : ""} flex items-center justify-between flex-shrink-0 p-4 w-full sticky top-0 bg-[#121212] z-5`}>
            <p className="text-md font-bold text-[#ffffff] truncate">
                Queue
            </p>

            <button
                className="text-[#8f8f8f] dynamic-text-hover dynamic-bg-hover p-[8px] cursor-pointer rounded-full transition-colors"
                style={{
                    '--bgHoverColor': '#1E1E1E',
                } as React.CSSProperties}
                title="Hide Queue View"
                onClick={handleHideQueueView}
            >
                <CrossIcon width="15" height="15" />
            </button>

        </div>
    )
}

export default Header