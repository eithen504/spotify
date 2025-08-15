import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom"
import { useScrollStore } from "../../../../store/useScrollStore";

const MainContent = () => {
    const { pathname } = useLocation();
    const { setIsScrolled, setScrollFromTop } = useScrollStore();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // Correct property
            setIsScrolled(scrollTop > 0);
            setScrollFromTop(scrollTop); // Now updates correctly
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        setIsScrolled(false);
        setScrollFromTop(0);
    }, [pathname]);

    return (
        <div className="mb-[125px] bg-[#121212]">
            <Outlet />
        </div>
    )
}

export default MainContent