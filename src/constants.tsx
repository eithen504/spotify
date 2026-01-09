import { CompactGridItemsSkeleton, CompactListItemsSkeleton, DefaultGridItemsSkeleton, DefaultListItemsSkeleton } from "./components/Skeletons";
import CompactGridItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/CompactGridItems";
import CompactListItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/CompactListItems";
import DefaultGridItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/DefaultGridItems";
import DefaultListItems from "./layouts/desktopLayout/components/mainContent/leftSidebar/DefaultListItems";
import { AccountfilledIcon, AccountIcon, CompactGridIcon, CompactListIcon, DefaultGridIcon, DefaultListIcon, HomeFilledIcon, HomeIcon, LibraryFilledIcon, LibraryIcon, SearchFilledIcon, SearchIcon } from "./Svgs";
import type { HomePageTabs, NavigationItem, ViewComponent, ViewIcon, ViewSkelton, ShowPageTabs, LibrarySortOptionsMap, GenresMap } from "./types";

const GENRES = [
  // {
  //   id: "3ZJr7yHSWEdqUfnIPpASXo",
  //   title: "Summer",
  //   bgColor: "#27856A",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf1d858b423c5b3194d72c7c28"
  // },
  // {
  //   id: "1KLPoBkeHXzq3NaGMyvCYx",
  //   title: "Love",
  //   bgColor: "#DC148C",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf21c9a95a2702ce535fb07915"
  // },
  // {
  //   id: "7MqAxb9kT8t2w70zkTqRj5",
  //   title: "Mood",
  //   bgColor: "#B31048",
  //   image: "https://i.scdn.co/image/ab67fb8200005cafe542e9b59b1d2ae04b46b91c"
  // },
  // {
  //   id: "0PLU8u8MyjYbV5uWiRjHte",
  //   title: "Party",
  //   bgColor: "#8D67AB",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf0b0d0bfac454671832311615"
  // },
  // {
  //   id: "6GKJrPQfutE3SmAMv6Vnrn",
  //   title: "Decades",
  //   bgColor: "#A56752",
  //   image: "https://i.scdn.co/image/ab67fb8200005cafb7e805033eb938aa75d09336"
  // },
  // {
  //   id: "5A9qKLA4R1tQhPnYH1k7vB",
  //   title: "Dance/Electronic",
  //   bgColor: "#477D95",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf26ada793217994216c79dad8"
  // },
  // {
  //   id: "4RqvmyV7Wk3xNCePuFYvRh",
  //   title: "Student",
  //   bgColor: "#AF2896",
  //   image: "https://i.scdn.co/image/ab67fb8200005cafdad1281e13697e8d8cf8f347"
  // },
  // {
  //   id: "1Cvx9rtfJmZqB32TQHcuvV",
  //   title: "Chill",
  //   bgColor: "#B06239",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf330ca3a3bfaf8b18407fb33e"
  // },
  // {
  //   id: "6FkaUzp9yrx4hqhVp6wS4a",
  //   title: "Workout",
  //   bgColor: "#777777",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf6af6d83c78493644c9b0627b"
  // },
  // {
  //   id: "4DkfSna2hTbbYTuKe3gMwg",
  //   title: "Sleep",
  //   bgColor: "#1E3264",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf1cef0cee1e498abb8e74955f"
  // },
  // {
  //   id: "7JZp2b9VcX8F2tMkwe1RyM",
  //   title: "Instrumental",
  //   bgColor: "#537AA1",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf44774504bdbe31a7bc45598c"
  // },
  // {
  //   id: "2NKCcdSy8DaCgeuv5ZkWNb",
  //   title: "At Home",
  //   bgColor: "#5179A1",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf60ad5f3ea4988eff993d5e1a"
  // },
  // {
  //   id: "7jNQXo7S7HB5zZqRneMx28",
  //   title: "Classical",
  //   bgColor: "#7D4B32",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf4597370d1058e1ec3c1a56fa"
  // },
  // {
  //   id: "0xJtDdgA1id36SjaqTlwBt",
  //   title: "Folk & Acoustic",
  //   bgColor: "#BC5900",
  //   image: "https://i.scdn.co/image/ab67fb8200005cafcc70a3c2e4c71398708bdc4a"
  // },
  // {
  //   id: "5mK7Zut2Y9kZye8gPNgm7v",
  //   title: "Focus",
  //   bgColor: "#A56752",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf9a27506d5dde68b9da373196"
  // },
  // {
  //   id: "4r9Gw7mGxHkXybjvxN2I6y",
  //   title: "Children & Family",
  //   bgColor: "#4D96E2",
  //   image: "https://i.scdn.co/image/ab67fb8200005cafe72590f91baff169b1595ab4"
  // },
  // {
  //   id: "7iNFAUtQtr2oAc16p6DqCk",
  //   title: "Cooking & Dining",
  //   bgColor: "#BA5D07",
  //   image: "https://i.scdn.co/image/ab67fb8200005cafacbcb985978c387411d69e4f"
  // },
  {
    id: "2d0pm4ytxytr5LRZkijPNJ",
    title: "Wellness",
    bgColor: "#148A08",
    image: "https://i.scdn.co/image/ab67fb8200005cafd4a8da930bccd56ebd7e48b0"
  },
  // {
  //   id: "4Pxr7y2ph4EBZCD5xG7kZJ",
  //   title: "Travel",
  //   bgColor: "#0D72ED",
  //   image: "https://i.scdn.co/image/ab67fb8200005caf879a886d22672d9b5b987746"
  // },
  {
    id: "6Bxqye6sr9FofZy7Jj9eH2",
    title: "Nature & Noise",
    bgColor: "#477D95",
    image: "https://i.scdn.co/image/ab67fb8200005caf71ab47ac71efc219fa2cb171"
  }
] as const;

const GENRES_MAP: GenresMap= GENRES.reduce((acc, option) => {
  acc[option.id] = option;
  return acc;
}, {} as any);

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

const LANGUAGES = [
    "Arabic",
    "Albanian",
    "Chinese",
    "Czech",
    "Croatian",
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
] as const;

const SPOTIFY_IMAGE_URL = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c438d2441afb02250f8cd040e";

const DEFAULT_USER_IMAGE_URL = "https://static.vecteezy.com/system/resources/thumbnails/057/998/997/small/person-icon-user-sign-profile-icon-man-symbol-flat-design-vector.jpg";

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
    GENRES_MAP,
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
    SPOTIFY_IMAGE_URL,
    DEFAULT_USER_IMAGE_URL,
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