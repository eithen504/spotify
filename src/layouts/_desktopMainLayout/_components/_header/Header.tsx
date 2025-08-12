import CenterSection from "./CenterSection"
import LeftSection from "./LeftSection"
import RightSection from "./RightSection"

const Header = () => {
    return (
        <header className="bg-[#000000] px-6 py-[8px] flex items-center justify-between">
            {/* Left Section - Logo */}
            <LeftSection />

            {/* Center Section - Home Button and Search Bar */}
            <CenterSection />

            {/* Right Section - User Controls */}
            <RightSection />
        </header>
    )
}

export default Header