import type { JSX } from "react";
import type { LIBRARY_SORTS, LIBRARY_TABS, LIBRARY_VIEWS, SEARCH_ITEM_TYPES } from "./constants";

export type TrackDetails = Track & {
    isPlaying: boolean;
};

export type MenuOption = {
    icon?: JSX.Element;
    label: string;
    sublabel?: string;
    action: () => void;
    hasTopBorder?: boolean;
    rightSideIcon?: JSX.Element;
    subMenu?: MenuOptions;
    hideOption?: boolean;
}

export type MenuOptions = MenuOption[];

export type GenresIdTitleMap = Record<string, Genre>

export type GenresIdBgColorMap = Record<string, string>;

export type Genre =
    | "Party"
    | "Chill"
    | "Summer"
    | "Love"
    | "Emotional & HeartBreaking"
    | "Road Trip"
    | "Sleep"
    | "Strees Relief"
    | "Instrumental"
    | "Happy"
    | "Workout"
    | "Focus"
    | "Dance"
    | "Cooking"
    | "Travel"
    | "Rain & Monsoon"
    | "Lofi"
    | "Nature & Noise";

export type Genres = Genre[]

export type GenreOption = {
    id: string;
    title: Genre;
    bgColor: string;
    image: string;
}

export type ResizePanel = 'left' | 'right' | null;

export type HomePageTab = "All" | "Music" | "Podcasts";
export type HomePageTabs = HomePageTab[];



export type LibraryTab = typeof LIBRARY_TABS[number];
export type LibraryTabs = LibraryTab[];

export type LibrarySort = typeof LIBRARY_SORTS[number];

export type LibraryView = typeof LIBRARY_VIEWS[number];



export type LibrarySortOptionsMap = Record<LibrarySort, boolean>;

export type ViewIcon = Record<LibraryView, JSX.Element>

export type ViewComponent = Record<LibraryView, JSX.Element>

export type ViewSkelton = Record<LibraryView, JSX.Element>

export type ControlKeys = "Play" | "Preview" | "Save" | "Share" | "Follow" | "More" | "View";
export type Controls = Record<ControlKeys, boolean>;
export type Handlers = Record<ControlKeys, () => void>;

export type ShowPageTab = "All" | "Public" | "Private";
export type ShowPageTabs = ShowPageTab[];

export type Visibility = "Public" | "Private";

export type NavigationItem = {
    path: string;
    name: string;
    Icon: JSX.Element;
    ActiveIcon: JSX.Element;
}

export type TrackMenuState = {
    isOpen: boolean;
    track: Track | null;
};

export type Language =
    | "Arabic"
    | "Chinese"
    | "Czech"
    | "Dutch"
    | "English"
    | "Finnish"
    | "French"
    | "German"
    | "Greek"
    | "Hebrew"
    | "Indonesian"
    | "Italian"
    | "Japanese"
    | "Korean"
    | "Malay"
    | "Norwegian"
    | "Persian"
    | "Polish"
    | "Portuguese"
    | "Romanian"
    | "Russian"
    | "Spanish"
    | "Swedish"
    | "Thai"
    | "Turkish"
    | "Ukrainian"
    | "Vietnamese"
    | "Other";


export type SearchItemType = typeof SEARCH_ITEM_TYPES[number];

export type SearchItem = {
    type: SearchItemType,
    _id: string;
    title: string;
    artist: string;
    coverImageUrl: string;
};

export type SearchItems = SearchItem[];

export type AlphabetLetter =
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
    | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
    | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export type SearchDictionary = {
    [key in AlphabetLetter]: SearchItem[];
};

export type SearchItemIDMap = Record<string, SearchItem>;

/* Table Column */
export type ColumnVisibility = {
    visible: boolean;
};

export type TableView = "Compact List" | "Default List";

export type TableColumns = {
    INDEX: ColumnVisibility;
    TITLE: ColumnVisibility;
    ARTIST: ColumnVisibility;
    ALBUM?: ColumnVisibility;
    "DATE ADDED"?: ColumnVisibility;
    DURATION: ColumnVisibility;
};

export type TableColumnKey = keyof TableColumns

export type User = {
    _id: string;
    email: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Track = {
    _id: string;
    title: string;
    coverImageUrl?: string;
    audioUrl: string;
    artist: string;
    duration: number;
    genres: Genre[];
    albumId: string | null;
    albumName: string,
    language: Language,
    hasLiked: boolean,
    createdAt: Date;
    updatedAt: Date;
}

export type Playlist = {
    _id: string;
    title: string;
    coverImageUrl: string;
    userId: string;
    username: string;
    genres: Genre[];
    tracks: string[];
    hasSaved: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type Album = {
    _id: string;
    title: string;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Folder = {
    _id: string;
    name: string;
    userId: string;
    playlists: string[];
    createdAt: Date;
    updatedAt: Date;
};

