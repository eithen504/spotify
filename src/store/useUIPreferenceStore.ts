import { create } from "zustand";
import type { LeftSidebarSortOption, LeftSidebarViewLabel } from "../Types";

interface Preferences {
  leftPanelSize: number;
  rightPanelSize: number;
  isLeftSidebarExpanded: boolean;
  showNowPlayingView: boolean;
  showQueueView: boolean;
  isNowPlayingViewExpanded: boolean;
  isNowPlayingViewFullScreen: boolean;
  isMiniPlayerWindowOpen: boolean;
  sort: LeftSidebarSortOption;
  view: LeftSidebarViewLabel
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
    view: "Default List"
  },
  setPreferences: (newPreferences) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...newPreferences,
      },
    })),
}));