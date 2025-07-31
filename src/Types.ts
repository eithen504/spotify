import type { JSX } from "react";

export type LeftSidebarTab = "Playlists" | "Save Playlists" | "Save Albums" | "Podcasts";

export type ResizePanel = 'left' | 'right' | null;

export type NavigationItem = {
    path: string;
    name: string;
    Icon: JSX.Element;
    ActiveIcon: JSX.Element;
}
