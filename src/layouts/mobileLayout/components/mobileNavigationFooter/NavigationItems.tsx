import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../../../constants';

const NavigationItems = () => {
    const { pathname } = useLocation();

    return (
        <>
            {NAVIGATION_ITEMS.map((item) => {
                const isAccount = item.name === "Account";
                const isActive = pathname === item.path;

                return !isAccount ? (
                    <Link
                        key={item.name}
                        to={item.path}
                    >
                        <div className={`flex flex-col items-center ${isActive ? "text-[#ffffff]" : "text-white/70"} active:scale-95 dynamic-text-hover text-xs cursor-pointer`}>
                            {isActive ? (
                                item.ActiveIcon
                            ) : (
                                item.Icon
                            )}
                            <span className={`mt-1 text-[11px] ${isActive ? "font-medium" : "font-extralight"}`}>{item.name}</span>
                        </div>
                    </Link>
                ) : (
                    <div
                        key={item.name}
                        className="flex flex-col items-center text-white/70 dynamic-text-hover text-xs cursor-pointer"
                    >
                        {item.Icon}
                        <span className="mt-1 text-[11px] font-extralight">{item.name}</span>
                    </div>
                );
            })}
        </>
    )
}

export default NavigationItems