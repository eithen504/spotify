import useBreakPoint from "../hooks/useBreakPoint"
import DesktopMainLayout from "./_desktopMainLayout/DesktopMainLayout";
import MobileMainLayout from "./_mobileMainLayout/MobileMainLayout";

export default function AppLayout() {
    const [breakpoint] = useBreakPoint();

    return (
        <div className="overflow-hidden bg-[#121212]">
            {
                breakpoint == "sm" ? (
                    <MobileMainLayout />
                ) : (
                    <DesktopMainLayout />
                )
            }
        </div>
    )
}
