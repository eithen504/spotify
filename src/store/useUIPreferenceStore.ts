import { create } from "zustand";
import type { LeftSidebarTab, LibrarySort, LibraryView } from "../types";

type LeftSidebarState = {
  panelSize: number;
  isExpanded: boolean;
}

type LibraryState = {
  activeTab: LeftSidebarTab;
  sort: LibrarySort;
  view: LibraryView;
}

type RightSidebarState = {
  panelSize: number;
  showNowPlayingView: boolean;
  showQueueView: boolean;
  isNowPlayingViewExpanded: boolean;
  isNowPlayingViewFullScreen: boolean;
}

type Folder = {
  id: string;
  name: string;
}

type Preferences = {
  leftSidebar: LeftSidebarState;
  library: LibraryState;
  rightSidebar: RightSidebarState;
  isMiniPlayerWindowOpen: boolean;
  systemVolume: number[];
  activeFolder: Folder;
}

type UIPreferencesStore = {
  preferences: Preferences;
  setPreferences: (newPreferences: Partial<Preferences>) => void;
}

export const useUIPreferencesStore = create<UIPreferencesStore>((set) => ({
  preferences: {
    leftSidebar: {
      panelSize: 22,
      isExpanded: false,
    },
    library: {
      activeTab: "Playlists",
      sort: "Recently Added",
      view: "Default List",
    },
    rightSidebar: {
      panelSize: 20,
      showNowPlayingView: false,
      showQueueView: false,
      isNowPlayingViewExpanded: false,
      isNowPlayingViewFullScreen: false,
    },
    isMiniPlayerWindowOpen: false,
    systemVolume: [100],
    activeFolder: {
      id: "",
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