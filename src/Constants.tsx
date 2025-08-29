import CompactGridItems from "./layouts/_desktopMainLayout/_components/_mainContent/_leftSidebar/CompactGridItems";
import CompactListItems from "./layouts/_desktopMainLayout/_components/_mainContent/_leftSidebar/CompactListItems";
import DefaultGridItems from "./layouts/_desktopMainLayout/_components/_mainContent/_leftSidebar/DefaultGridItems";
import DefaultListItems from "./layouts/_desktopMainLayout/_components/_mainContent/_leftSidebar/DefaultListItems";
import { AccountfilledIcon, AccountIcon, CompactGridIcon, CompactListIcon, DefaultGridIcon, DefaultListIcon, HomeFilledIcon, HomeIcon, LibraryFilledIcon, LibraryIcon, SearchFilledIcon, SearchIcon } from "./Svgs";
import type { GenreItems, HomePageTabs, LeftSidebarSortOption, LeftSidebarTab, LeftSidebarViewIcon, LeftSidebarViewOption, NavigationItem, LeftSidebarViewComponent, Genres } from "./Types"

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

const LEFT_SIDEBAR_VIEW_COMPONENTS: LeftSidebarViewComponent = {
    "Compact List": <CompactListItems />,
    "Default List": <DefaultListItems />,
    "Compact Grid": <CompactGridItems />,
    "Default Grid": <DefaultGridItems />,
};

const HOMEPAGE_TABS: HomePageTabs = ["All", "Music", "Podcasts"]

const GENRE_ITEMS: GenreItems = [
    {
        id: "1KLPoBkeHXzq3NaGMyvCYx",
        title: "Party",
        bgColor: "bg-[#8D67AB]",
        image: "https://i.scdn.co/image/ab67706f00000002d2c23cff8e4056e5c891216d"
    },
    {
        id: "2QW8TMxFVuGe7LidpUoRlf",
        title: "Chill",
        bgColor: "bg-[#B06239]",
        image: "https://i.scdn.co/image/ab67706f0000000243cc4425ca68418fcab705fd"
    },
    {
        id: "3ZJr7yHSWEdqUfnIPpASXo",
        title: "Summer",
        bgColor: "bg-[#27856A]",
        image: "https://i.scdn.co/image/ab67706f000000025e5ae44995b14abdb1e6695e"
    },
    {
        id: "4VPedCbnHr3zAgLNvFcTks",
        title: "Love",
        bgColor: "bg-[#DC148C]",
        image: "https://i.scdn.co/image/ab67706f00000002dcb7b32f8bf2e6a7851245e3"
    },
    {
        id: "5ETghADu9pQvbiKpPcknOj",
        title: "Emotional & HeartBreaking",
        bgColor: "bg-[#1E3264]",
        image: "https://i.scdn.co/image/ab67706f000000026a529b45bf70807cc16b1a88"
    },
    {
        id: "6RSjhZNCLaUcYiKXoxSgDt",
        title: "Road Trip",
        bgColor: "bg-[#8D67AB]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84ab7f27e3e1e376b29cf2f22d"
    },
    {
        id: "7LKbgJMTxx1EWHWslrBnMc",
        title: "Sleep",
        bgColor: "bg-[#1E3264]",
        image: "https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16"
    },
    {
        id: "8DLoXEHwnZpVuJkNHgwUex",
        title: "Strees Relief",
        bgColor: "bg-[#5179A1]",
        image: "https://i.scdn.co/image/ab67706f000000025db1394baf8862336f19ac83"
    },
    {
        id: "9NKebCaYi6TH1VRGyxVtBP",
        title: "Instrumental",
        bgColor: "bg-[#1F5F4D]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84de3927234c577925c274e45e"
    },
    {
        id: "10JXpYKDwxUR6LsZyGbUVo",
        title: "Happy",
        bgColor: "bg-[#0D73EC]",
        image: "https://i.scdn.co/image/ab67616d0000b27317f480c5a24fd7b5c7929521"
    },
    {
        id: "11FYRxapWUkowNzXFtVLyB",
        title: "workout",
        bgColor: "bg-[#777777]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84124bd0cf5122f4e1aa2a65b7"
    },
    {
        id: "12HBETGksRQzyXtDjVqvMe",
        title: "Focus",
        bgColor: "bg-[#A56752]",
        image: "https://i.scdn.co/image/ab67706f000000026020f2f6476db518ef747da4"
    },
    {
        id: "13MYkJpzyXTvCAWDtzJKVE",
        title: "Dance",
        bgColor: "bg-[#477D95]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8443c71a3a90d88df3ba8acd78"
    },
    {
        id: "14QJFnkPLTqEVdSgXLHkZe",
        title: "Cooking",
        bgColor: "bg-[#7D4B32]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84eec4b5eaa5f9893e6df4e25b"
    },
    {
        id: "15UJEnpbLMWsEfQgOpBmKH",
        title: "Travel",
        bgColor: "bg-[#0D72ED]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8404fd89ab8064c32896fd0cdc"
    },
    {
        id: "16LHRwGizVQymAfBkwCKoT",
        title: "Rain & Monsoon",
        bgColor: "bg-[#006450]",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyupWpvf4JJhOavy8wvuwwL5sqLjmMvWu4Wg&s"
    },
    {
        id: "17EVnyjKwUdCQaHnpLmBeX",
        title: "Lofi",
        bgColor: "bg-[#BA5D07]",
        image: "https://i.scdn.co/image/ab67616d00001e02c9cdb8a6f71db82df0a37459"
    },
    {
        id: "18PUKrniLDuoxAcSmBZjJG",
        title: "Nature & Noise",
        bgColor: "bg-[#05241E]",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTteCZYrLEdaHGuBcEaapjjDMYsoI77V3eJIg&s"
    }
];

const GENRES: Genres = [
    "Party",
    "Chill",
    "Summer",
    "Love",
    "Emotional & HeartBreaking",
    "Road Trip",
    "Sleep",
    "Strees Relief",
    "Instrumental",
    "Happy",
    "workout",
    "Focus",
    "Dance",
    "Cooking",
    "Travel",
    "Rain & Monsoon",
    "Lofi",
    "Nature & Noise"
];

const MAX_AUDIO_DURATION = 420;

export {
    LEFT_SIDEBAR_TABS,
    NAVIGATION_ITEMS,
    LEFT_SIDEBAR_SORT_OPTIONS,
    LEFT_SIDEBAR_VIEW_OPTIONS,
    LEFT_SIDEBAR_VIEW_ICONS,
    LEFT_SIDEBAR_VIEW_COMPONENTS,
    HOMEPAGE_TABS,
    GENRE_ITEMS,
    MAX_AUDIO_DURATION,
    GENRES
}