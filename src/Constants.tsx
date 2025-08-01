import { AccountfilledIcon, AccountIcon, CompactGridIcon, CompactListIcon, DefaultGridIcon, DefaultListIcon, HomeFilledIcon, HomeIcon, LibraryFilledIcon, LibraryIcon, SearchFilledIcon, SearchIcon } from "./Svgs";
import type { LeftSidebarSortOption, LeftSidebarTab, LeftSidebarViewIcon, LeftSidebarViewOption, NavigationItem } from "./Types"

const LEFT_SIDEBAR_TABS: LeftSidebarTab[] = ["Playlists", "Save Playlists", "Save Albums", "Podcasts"]

const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        path: "/",
        name: "Home",
        Icon: <HomeIcon width="24" height="24" />,
        ActiveIcon: <HomeFilledIcon width="24" height="24" />,
    },
    {
        path: "/search",
        name: "Search",
        Icon: <SearchIcon width="24" height="24" />,
        ActiveIcon: <SearchFilledIcon width="24" height="24" />,
    },
    {
        path: "/myLibrary",
        name: "Library",
        Icon: <LibraryIcon width="24" height="24" />,
        ActiveIcon: <LibraryFilledIcon width="24" height="24" />,
    },
    {
        path: "",
        name: "Account",
        Icon: <AccountIcon width="26" height="26" />,
        ActiveIcon: <AccountfilledIcon width="26" height="26" />,
    },
];

const LEFT_SIDEBAR_SORT_OPTIONS: LeftSidebarSortOption[] = ["Recently Added", "Alphabetical A To Z", "Alphabetical Z To A"]

const LEFT_SIDEBAR_VIEW_OPTIONS: LeftSidebarViewOption[] = [
    {
        label: "Compact List",
        icon: <CompactListIcon width="16" height="16" />,
    },
    {
        label: "Default List",
        icon: <DefaultListIcon width="16" height="16" />,
    },
    {
        label: "Compact Grid",
        icon: <CompactGridIcon width="16" height="16" />,
    },
    {
        label: "Default Grid",
        icon: <DefaultGridIcon width="16" height="16" />,
    },
]

const LEFT_SIDEBAR_VIEW_ICONS: LeftSidebarViewIcon = {
    "Compact List": <CompactListIcon width="16" height="16" />,
    "Default List": <DefaultListIcon width="16" height="16" />,
    "Compact Grid": <CompactGridIcon width="16" height="16" />,
    "Default Grid": <DefaultGridIcon width="16" height="16" />,
};

export {
    LEFT_SIDEBAR_TABS,
    NAVIGATION_ITEMS,
    LEFT_SIDEBAR_SORT_OPTIONS,
    LEFT_SIDEBAR_VIEW_OPTIONS,
    LEFT_SIDEBAR_VIEW_ICONS
}