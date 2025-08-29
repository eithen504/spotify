import type { JSX } from "react";

export type LeftSidebarTab = "Playlists" | "Save Playlists" | "Save Albums" | "Podcasts";

export type ResizePanel = 'left' | 'right' | null;

export type NavigationItem = {
    path: string;
    name: string;
    Icon: JSX.Element;
    ActiveIcon: JSX.Element;
}

export type LeftSidebarSortOption = "Recently Added" | "Alphabetical A To Z" | "Alphabetical Z To A";

export type LeftSidebarViewLabel = 'Compact List' | 'Default List' | 'Compact Grid' | 'Default Grid';

export type LeftSidebarViewOption = {
    label: LeftSidebarViewLabel;
    icon: JSX.Element;
}

export type LeftSidebarViewIcon = Record<LeftSidebarViewLabel, JSX.Element>

export type LeftSidebarViewComponent = Record<LeftSidebarViewLabel, JSX.Element>

export type HomePageTab = "All" | "Music" | "Podcasts";
export type HomePageTabs = HomePageTab[];

export type Column = "Artist" | "Album" | "Duration" | "Date added";

export type GenreTitle =
    | "Hindi"
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

export type GenreItem = {
    id: string;
    title: GenreTitle;
    bgColor: string;
    image: string;
}

export type GenreItems = GenreItem[]

export type Genres = GenreTitle[]

export type ControlKeys = "Play" | "Preview" | "Save" | "Share" | "Follow" | "More" | "View";
export type Controls = Record<ControlKeys, boolean>;

export type MenuOption = {
    icon?: JSX.Element;
    label: string;
    action: () => void;
    hasTopBorder?: boolean;
    shouldHide?: boolean
}

export type User = {
    _id: string;
    email: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface Track {
    _id: string;
    title: string;
    coverImageUrl: string;
    audioUrl: string;
    artist: string;
    duration: string;
    genre: GenreTitle[];
    albumId: string | null;
    albumName: string,
    hasLiked: boolean,
    createdAt: Date;
    updatedAt: Date;
}
