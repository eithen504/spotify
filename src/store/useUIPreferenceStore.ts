import { create } from "zustand";
import type { LeftSidebarTab, Sort, View } from "../types";

interface FolderInfo {
  activeId: string;
  name: string;
}

interface Preferences {
  leftPanelSize: number;
  rightPanelSize: number;
  isLeftSidebarExpanded: boolean;
  showNowPlayingView: boolean;
  showQueueView: boolean;
  isNowPlayingViewExpanded: boolean;
  isNowPlayingViewFullScreen: boolean;
  isMiniPlayerWindowOpen: boolean;
  sort: Sort;
  view: View;
  systemVolume: number[];
  leftSidebarActiveTab: LeftSidebarTab;
  folder: FolderInfo;
}

interface UIPreferencesStore {
  preferences: Preferences;
  setPreferences: (newPreferences: Partial<Preferences>) => void;
}

export const useUIPreferencesStore = create<UIPreferencesStore>((set) => ({
  preferences: {
    leftPanelSize: 22,
    rightPanelSize: 20,
    isLeftSidebarExpanded: false,
    showNowPlayingView: false,
    showQueueView: false,
    isNowPlayingViewExpanded: false,
    isNowPlayingViewFullScreen: false,
    isMiniPlayerWindowOpen: false,
    sort: "Recently Added",
    view: "Default List",
    systemVolume: [100],
    leftSidebarActiveTab: "Playlists",
    folder: {
      activeId: "",
      name: ""
    }
  },
  setPreferences: (newPreferences) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...newPreferences,
      },
    })),
}));