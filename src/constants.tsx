import { CompactGridItemsSkeleton, CompactListItemsSkeleton, DefaultGridItemsSkeleton, DefaultListItemsSkeleton } from "./components/Skeletons";
import CompactGridItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/CompactGridItems";
import CompactListItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/CompactListItems";
import DefaultGridItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/DefaultGridItems";
import DefaultListItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/DefaultListItems";
import { AccountfilledIcon, AccountIcon, CompactGridIcon, CompactListIcon, DefaultGridIcon, DefaultListIcon, HomeFilledIcon, HomeIcon, LibraryFilledIcon, LibraryIcon, SearchFilledIcon, SearchIcon } from "./Svgs";
import type { GenreOption, Genres, GenresIdBgColorMap, GenresIdTitleMap, HomePageTabs, LibraryTabs, NavigationItem, ViewComponent, ViewIcon, ViewSkelton, ShowPageTabs, Language, LibrarySortOptionsMap } from "./types";

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
    "Workout",
    "Focus",
    "Dance",
    "Cooking",
    "Travel",
    "Rain & Monsoon",
    "Lofi",
    "Nature & Noise"
];

const GENRE_OPTIONS: GenreOption[] = [
    {
        id: "1KLPoBkeHXzq3NaGMyvCYx",
        title: "Party",
        bgColor: "bg-[#2e112d]",
        image: "https://i.scdn.co/image/ab67fb8200005caf0b0d0bfac454671832311615"
    },
    {
        id: "2QW8TMxFVuGe7LidpUoRlf",
        title: "Chill",
        bgColor: "bg-[#c7816a]",
        image: "https://i.scdn.co/image/ab67706f0000000243cc4425ca68418fcab705fd"
    },
    {
        id: "3ZJr7yHSWEdqUfnIPpASXo",
        title: "Summer",
        bgColor: "bg-[#c7999d]",
        image: "https://i.scdn.co/image/ab67fb8200005caf1d858b423c5b3194d72c7c28"
    },
    {
        id: "4VPedCbnHr3zAgLNvFcTks",
        title: "Love",
        bgColor: "bg-[#4f6972]",
        image: "https://i.scdn.co/image/ab67706f00000002dcb7b32f8bf2e6a7851245e3"
    },
    {
        id: "5ETghADu9pQvbiKpPcknOj",
        title: "Emotional & HeartBreaking",
        bgColor: "bg-[#c7d9e0]",
        image: "https://i.scdn.co/image/ab67706f000000026a529b45bf70807cc16b1a88"
    },
    {
        id: "6RSjhZNCLaUcYiKXoxSgDt",
        title: "Road Trip",
        bgColor: "bg-[#9d9b9b]",
        image: "https://i.scdn.co/image/ab67fb8200005caf879a886d22672d9b5b987746"
    },
    {
        id: "7LKbgJMTxx1EWHWslrBnMc",
        title: "Sleep",
        bgColor: "bg-[#3a4c63]",
        image: "https://i.scdn.co/image/ab67706f00000002cd17d41419faa97069e06c16"
    },
    {
        id: "8DLoXEHwnZpVuJkNHgwUex",
        title: "Strees Relief",
        bgColor: "bg-[#3a5563]",
        image: "https://i.scdn.co/image/ab67706f000000025db1394baf8862336f19ac83"
    },
    {
        id: "9NKebCaYi6TH1VRGyxVtBP",
        title: "Instrumental",
        bgColor: "bg-[#51170c]",
        image: "https://i.scdn.co/image/ab67616d00001e026dcf35ade34953e62884a3b0"
    },
    {
        id: "10JXpYKDwxUR6LsZyGbUVo",
        title: "Happy",
        bgColor: "bg-[#ee8f37]",
        image: "https://i.scdn.co/image/ab67616d0000b27317f480c5a24fd7b5c7929521"
    },
    {
        id: "11FYRxapWUkowNzXFtVLyB",
        title: "Workout",
        bgColor: "bg-[#bcbfba]",
        image: "https://i.scdn.co/image/ab67706f00000002681908e31127979d43c8dbc6"
    },
    {
        id: "12HBETGksRQzyXtDjVqvMe",
        title: "Focus",
        bgColor: "bg-[#3b322c]",
        image: "https://i.scdn.co/image/ab67706f000000026020f2f6476db518ef747da4"
    },
    {
        id: "13MYkJpzyXTvCAWDtzJKVE",
        title: "Dance",
        bgColor: "bg-[#873c92]",
        image: "https://i.scdn.co/image/ab67616d0000b27366e49eb6cd91bf870ae08dd0"
    },
    {
        id: "14QJFnkPLTqEVdSgXLHkZe",
        title: "Cooking",
        bgColor: "bg-[#eac05e]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84eec4b5eaa5f9893e6df4e25b"
    },
    {
        id: "15UJEnpbLMWsEfQgOpBmKH",
        title: "Travel",
        bgColor: "bg-[#75797a]",
        image: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8404fd89ab8064c32896fd0cdc"
    },
    {
        id: "16LHRwGizVQymAfBkwCKoT",
        title: "Rain & Monsoon",
        bgColor: "bg-[#507897]",
        image: "https://i.scdn.co/image/ab67706f00000002eaf2ff074e8e4db414e0f686"
    },
    {
        id: "17EVnyjKwUdCQaHnpLmBeX",
        title: "Lofi",
        bgColor: "bg-[#571674]",
        image: "https://i.scdn.co/image/ab67616d00001e02c9cdb8a6f71db82df0a37459"
    },
    {
        id: "18PUKrniLDuoxAcSmBZjJG",
        title: "Nature & Noise",
        bgColor: "bg-[#727851]",
        image: "https://i.scdn.co/image/ab67706f00000002928c0c54749ddf4ad5709849"
    }
];

const GENRES_ID_TITLE_MAP: GenresIdTitleMap = {
    "1KLPoBkeHXzq3NaGMyvCYx": "Party",
    "2QW8TMxFVuGe7LidpUoRlf": "Chill",
    "3ZJr7yHSWEdqUfnIPpASXo": "Summer",
    "4VPedCbnHr3zAgLNvFcTks": "Love",
    "5ETghADu9pQvbiKpPcknOj": "Emotional & HeartBreaking",
    "6RSjhZNCLaUcYiKXoxSgDt": "Road Trip",
    "7LKbgJMTxx1EWHWslrBnMc": "Sleep",
    "8DLoXEHwnZpVuJkNHgwUex": "Strees Relief",
    "9NKebCaYi6TH1VRGyxVtBP": "Instrumental",
    "10JXpYKDwxUR6LsZyGbUVo": "Happy",
    "11FYRxapWUkowNzXFtVLyB": "Workout",
    "12HBETGksRQzyXtDjVqvMe": "Focus",
    "13MYkJpzyXTvCAWDtzJKVE": "Dance",
    "14QJFnkPLTqEVdSgXLHkZe": "Cooking",
    "15UJEnpbLMWsEfQgOpBmKH": "Travel",
    "16LHRwGizVQymAfBkwCKoT": "Rain & Monsoon",
    "17EVnyjKwUdCQaHnpLmBeX": "Lofi",
    "18PUKrniLDuoxAcSmBZjJG": "Nature & Noise"
};

const GENRES_ID_BGCOLOR_MAP: GenresIdBgColorMap = {
    "1KLPoBkeHXzq3NaGMyvCYx": "#2e112d",
    "2QW8TMxFVuGe7LidpUoRlf": "#c7816a",
    "3ZJr7yHSWEdqUfnIPpASXo": "#c7999d",
    "4VPedCbnHr3zAgLNvFcTks": "#4f6972",
    "5ETghADu9pQvbiKpPcknOj": "#c7d9e0",
    "6RSjhZNCLaUcYiKXoxSgDt": "#9d9b9b",
    "7LKbgJMTxx1EWHWslrBnMc": "#3a4c63",
    "8DLoXEHwnZpVuJkNHgwUex": "#3a5563",
    "9NKebCaYi6TH1VRGyxVtBP": "#51170c",
    "10JXpYKDwxUR6LsZyGbUVo": "#ee8f37",
    "11FYRxapWUkowNzXFtVLyB": "#bcbfba",
    "12HBETGksRQzyXtDjVqvMe": "#3b322c",
    "13MYkJpzyXTvCAWDtzJKVE": "#873c92",
    "14QJFnkPLTqEVdSgXLHkZe": "#eac05e",
    "15UJEnpbLMWsEfQgOpBmKH": "#75797a",
    "16LHRwGizVQymAfBkwCKoT": "#507897",
    "17EVnyjKwUdCQaHnpLmBeX": "#571674",
    "18PUKrniLDuoxAcSmBZjJG": "#727851"
};

const MAX_AUDIO_DURATION = 420;

const HOMEPAGE_TABS: HomePageTabs = ["All", "Music", "Podcasts"];

const LIBRARY_TABS = [
  "Playlists",
  "Save Playlists",
  "Save Albums",
  "Folders",
] as const;

const LIBRARY_SORTS = [
  "Recently Added",
  "Alphabetical A To Z",
  "Alphabetical Z To A",
] as const;

const LIBRARY_VIEWS = [
  "Compact List",
  "Default List",
  "Compact Grid",
  "Default Grid",
] as const;

const SEARCH_ITEM_TYPES = ["Album", "Track", "Playlist"] as const;

const VIEW_ICONS: ViewIcon = {
    "Compact List": <CompactListIcon width="16" height="16" />,
    "Default List": <DefaultListIcon width="16" height="16" />,
    "Compact Grid": <CompactGridIcon width="16" height="16" />,
    "Default Grid": <DefaultGridIcon width="16" height="16" />,
};

const VIEW_COMPONENTS: ViewComponent = {
    "Compact List": <CompactListItems />,
    "Default List": <DefaultListItems />,
    "Compact Grid": <CompactGridItems />,
    "Default Grid": <DefaultGridItems />,
};

const VIEW_SKELETONS: ViewSkelton = {
    "Compact List": <CompactListItemsSkeleton />,
    "Default List": <DefaultListItemsSkeleton />,
    "Compact Grid": <CompactGridItemsSkeleton />,
    "Default Grid": <DefaultGridItemsSkeleton />,
};

const SORT_OPTIONS_MAP: LibrarySortOptionsMap = {
    "Recently Added": true,
    "Alphabetical A To Z": true,
    "Alphabetical Z To A": true,
};

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
        path: "/my/library",
        name: "Library",
        Icon: <LibraryIcon width="24" height="24" />,
        ActiveIcon: <LibraryFilledIcon width="24" height="24" />,
    },
    {
        path: "",
        name: "Create",
        Icon: <AccountIcon width="26" height="26" />,
        ActiveIcon: <AccountfilledIcon width="26" height="26" />,
    },
];

const SHOW_PAGE_TABS: ShowPageTabs = ["All", "Public", "Private"];

const LANGUAGES: Language[] = [
    "Arabic",
    "Chinese",
    "Czech",
    "Dutch",
    "English",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Hebrew",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Malay",
    "Norwegian",
    "Persian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Spanish",
    "Swedish",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Vietnamese",
    "Other"
];


const FUSION_SEARCH_HISTORY_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:fusionSearchHistory";

const TABLE_VIEW_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:table-view";

const TABLE_COLUMNS_CONFIG_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:table-columns-config";

const LEFT_SIDEBAR_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:left-sidebar";

const LIBRARY_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:library";

const RIGHT_SIDEBAR_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:right-sidebar";

const MINI_PLAYER_WINDOW_OPEN_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:mini-player-window-open";

const SYSTEM_VOLUME_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:system-volume";

const OPENED_FOLDER_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:opened-folder";

const RECENT_PLAYLISTS_KEY = "31i3bxane7wwd3uc2bjv4v4owwcu:recent-playlist";

export {
    GENRES,
    GENRE_OPTIONS,
    GENRES_ID_TITLE_MAP,
    GENRES_ID_BGCOLOR_MAP,
    MAX_AUDIO_DURATION,
    HOMEPAGE_TABS,
    LIBRARY_TABS,
    LIBRARY_SORTS,
    LIBRARY_VIEWS,
    VIEW_ICONS,
    VIEW_COMPONENTS,
    VIEW_SKELETONS,
    NAVIGATION_ITEMS,
    SORT_OPTIONS_MAP,
    SHOW_PAGE_TABS,
    LANGUAGES,
    SEARCH_ITEM_TYPES,
    FUSION_SEARCH_HISTORY_KEY,
    TABLE_VIEW_KEY,
    TABLE_COLUMNS_CONFIG_KEY,
    LEFT_SIDEBAR_KEY,
    LIBRARY_KEY,
    RIGHT_SIDEBAR_KEY,
    MINI_PLAYER_WINDOW_OPEN_KEY,
    SYSTEM_VOLUME_KEY,
    OPENED_FOLDER_KEY,
    RECENT_PLAYLISTS_KEY
}