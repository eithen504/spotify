import { AccountfilledIcon, AccountIcon, HomeFilledIcon, HomeIcon, LibraryFilledIcon, LibraryIcon, SearchFilledIcon, SearchIcon } from "./Svgs";
import type { LeftSidebarTab, NavigationItem } from "./Types"

const LEFT_SIDEBAR_TABS: LeftSidebarTab[] = ["Playlists", "Save Playlists", "Save Albums", "Podcasts"]

const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        path: "/",
        name: "Home",
        Icon: <HomeIcon width="24" height = "24" />,
        ActiveIcon: <HomeFilledIcon width="24" height = "24" />,
    },
    {
        path: "/search",
        name: "Search",
        Icon: <SearchIcon width="24" height = "24" />,
        ActiveIcon: <SearchFilledIcon width="24" height = "24" />,
    },
    {
        path: "/myLibrary",
        name: "Library",
        Icon: <LibraryIcon width="24" height = "24" />,
        ActiveIcon: <LibraryFilledIcon width="24" height = "24" />,
    },
    {
        path: "",
        name: "Account",
        Icon: <AccountIcon width="26" height = "26" />,
        ActiveIcon: <AccountfilledIcon width="26" height = "26" />,
    },
];

export {
    LEFT_SIDEBAR_TABS,
    NAVIGATION_ITEMS
}