import type { JSX } from "react";

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
    | "workout"
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

export type LeftSidebarTab = "Playlists" | "Save Playlists" | "Save Albums" | "Folders";
export type LeftSidebarTabs = LeftSidebarTab[]

export type Sort = "Recently Added" | "Alphabetical A To Z" | "Alphabetical Z To A";
export type View = 'Compact List' | 'Default List' | 'Compact Grid' | 'Default Grid';

export type SortOptions = Record<Sort, boolean>

export type ViewIcon = Record<View, JSX.Element>

export type ViewComponent = Record<View, JSX.Element>

export type ViewSkelton = Record<View, JSX.Element>

export type ControlKeys = "Play" | "Preview" | "Save" | "Share" | "Follow" | "More" | "View";
export type Controls = Record<ControlKeys, boolean>;
export type Handlers = Record<ControlKeys, () => void>;

export type Column = "Artist" | "Album" | "Duration" | "Date added";
export type Columns = Record<Column, boolean>

export type ShowPageTab = "All" | "Public" | "Private";
export type ShowPageTabs = ShowPageTab[];

export type Visibility = "Public" | "Private";

export type NavigationItem = {
    path: string;
    name: string;
    Icon: JSX.Element;
    ActiveIcon: JSX.Element;
}

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

export type SearchItemType = "Track" | "Album" | "Playlist" | "Search";

export type SearchItem = {
    type: SearchItemType,
    _id: string;
    title: string;
    artist?: string;
    coverImageUrl: string;
};

export type AlphabetLetter =
    | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
    | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
    | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export type SearchDictionary = {
    [key in AlphabetLetter]: SearchItem[];
};

export type SearchItemIDMap = Record<string, SearchItem>;

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
    coverImageUrl: string;
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

