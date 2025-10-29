import { Outlet, useLocation } from 'react-router-dom'
import { useScrollStore } from '../../../../store/useScrollStore';
import { useEffect, useLayoutEffect } from 'react';

const MainContent = () => {
    const { pathname } = useLocation()
    const { setIsScrolled, setScrollFromTop } = useScrollStore();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
            setScrollFromTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setIsScrolled, setScrollFromTop]);

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