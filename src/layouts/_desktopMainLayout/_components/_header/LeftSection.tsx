import { LogoIcon } from "../../../../Svgs"

const LeftSection = () => {
    return (
        <div className="flex items-center">
            {/* Spotify Logo */}
            <button className="rounded-full flex items-center justify-center">
                <LogoIcon width="35" height="35" />
            </button>
        </div>
    )
}

export default LeftSection