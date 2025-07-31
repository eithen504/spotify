import { useEffect, useState } from "react";

const useBreakPoint = () => {
    const [breakpoint, setBreakpoint] = useState('sm');

    useEffect(() => {
        const getBreakpoint = () => {
            const width = window.innerWidth;
            if (width >= 1024) return 'lg';
            if (width >= 768) return 'md';
            return 'sm';
        };

        const updateBreakpoint = () => {
            const newBreakpoint = getBreakpoint();
            setBreakpoint(newBreakpoint);
        };

        updateBreakpoint(); // set on mount
        window.addEventListener('resize', updateBreakpoint);

        return () => {
            window.removeEventListener('resize', updateBreakpoint);
        };
    }, []);

    return [breakpoint]
}

export default useBreakPoint