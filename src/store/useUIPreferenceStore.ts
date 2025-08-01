import { create } from "zustand";

interface Preferences {
  leftPanelSize: number;
  rightPanelSize: number;
  isLeftSidebarExpanded: boolean;
  showNowPlayingView: boolean;
  isNowPlayingViewExpanded: boolean;
  isNowPlayingViewFullScreen: boolean;
  isMiniPlayerWindowOpen: boolean;
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
    isNowPlayingViewExpanded: false,
    isNowPlayingViewFullScreen: false,
    isMiniPlayerWindowOpen: false,
  },
  setPreferences: (newPreferences) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...newPreferences,
      },
    })),
}));