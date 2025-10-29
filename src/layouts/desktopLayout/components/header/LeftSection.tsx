import { Link } from "react-router-dom"
import { LogoIcon } from "../../../../Svgs"

const LeftSection = () => {
    return (
        <div className="flex items-center">
            {/* Spotify Logo */}
            <Link
                to={"/"}
                className="rounded-full text-[#ffffff] flex items-center justify-center"
            >
                <LogoIcon width="35" height="35" />
            </Link>
        </div>
    )
}

export default LeftSection