import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeFilledIcon, HomeIcon } from '../../../../Svgs';

const HomeButton = () => {
    const { pathname } = useLocation();
    const isHomePage = pathname == '/'

    return (
        <Link to={"/"}
            className="p-3 text-[#ffffff] bg-[#1f1f1f] dynamic-bg-hover rounded-full flex items-center justify-center cursor-pointer"
            style={{
                '--bgHoverColor': '#282828',
            } as React.CSSProperties}
            title="Home"
        >
            {isHomePage ? <HomeFilledIcon /> : <HomeIcon />}
        </Link>
    )
}

export default HomeButton