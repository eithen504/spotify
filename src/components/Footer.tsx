import { useLocation } from "react-router-dom"
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../Svgs";

const Footer = () => {
    const { pathname } = useLocation();
    const isHomePage = pathname == "/";

    return (
        <footer className={`pb-8 pt-14 px-4 md:pt-18 ${isHomePage ? "md:px-10" : "md:px-6"} text-[#ffffff] relative max-w-[90rem] mx-auto`}>
            <div className="flex flex-col  justify-between gap-8">
                {/* Company */}
                <div className="space-y-2">
                    <h4 className="font-bold">Company</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Jobs</a></li>
                        <li><a href="#">For the Record</a></li>
                    </ul>
                </div>

                {/* Communities */}
                <div className="space-y-2">
                    <h4 className="font-bold">Communities</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#">For Artists</a></li>
                        <li><a href="#">Developers</a></li>
                        <li><a href="#">Advertising</a></li>
                        <li><a href="#">Investors</a></li>
                        <li><a href="#">Vendors</a></li>
                    </ul>
                </div>

                {/* Useful links */}
                <div className="space-y-2">
                    <h4 className="font-bold">Useful links</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Free Mobile App</a></li>
                        <li><a href="#">Popular by Country</a></li>
                    </ul>
                </div>

                {/* Spotify Plans */}
                <div className="space-y-2">
                    <h4 className="font-bold">Spotify Plans</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                        <li><a href="#">Premium Individual</a></li>
                        <li><a href="#">Premium Duo</a></li>
                        <li><a href="#">Premium Family</a></li>
                        <li><a href="#">Premium Student</a></li>
                        <li><a href="#">Spotify Free</a></li>
                    </ul>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <a href="#" className="p-3 rounded-full bg-[#292929] hover:bg-[#727272]">
                        <InstagramIcon width="17" height="17" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-[#292929] hover:bg-[#727272]">
                        <TwitterIcon width="17" height="17" />
                    </a>
                    <a href="#" className="p-3 rounded-full bg-[#292929] hover:bg-[#727272]">
                        <FacebookIcon width="17" height="17" />
                    </a>
                </div>
            </div>

            <div className="border-t border-[#2A2A2A] my-8"></div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 flex-wrap">
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <a href="#">Legal</a>
                    <a href="#">Safety & Privacy Center</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookies</a>
                    <a href="#">About Ads</a>
                    <a href="#">Accessibility</a>
                </div>
                <p className="text-center md:text-right">© 2025 Spotify AB</p>
            </div>
        </footer>
    )
}

export default Footer