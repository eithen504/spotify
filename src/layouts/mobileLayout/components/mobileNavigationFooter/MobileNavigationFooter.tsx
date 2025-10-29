import NavigationItems from './NavigationItems';

const MobileNavigationFooter = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full h-[70px] bg-black/50 backdrop-blur-xs flex items-center justify-around z-50 shadow-md">
            <NavigationItems />
        </footer>
    )
}

export default MobileNavigationFooter