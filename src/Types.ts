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

export type ViewComponent = Record<LeftSidebarViewLabel, JSX.Element>

export type HomePageTab = "All" | "Music" | "Podcasts";
