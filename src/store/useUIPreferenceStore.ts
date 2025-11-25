import { create } from "zustand";
import type { LibraryTab, LibrarySort, LibraryView } from "../types";
import { LEFT_SIDEBAR_KEY, LIBRARY_KEY, MINI_PLAYER_WINDOW_OPEN_KEY, OPENED_FOLDER_KEY, RIGHT_SIDEBAR_KEY, SYSTEM_VOLUME_KEY } from "../constants";

type LeftSidebarState = {
  panelSize: number;
  isExpanded: boolean;
}

type LibraryState = {
  activeTab: LibraryTab;
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

type FolderState = {
  id: string;
  name: string;
}

type UIPreferencesStore = {
  leftSidebar: LeftSidebarState;
  library: LibraryState;
  rightSidebar: RightSidebarState;
  isMiniPlayerWindowOpen: boolean;
  systemVolume: number[];
  openedFolder: FolderState;
  setLeftSidebar: (leftSidebar: Partial<LeftSidebarState>) => void;
  setLibrary: (library: Partial<LibraryState>) => void;
  setRightSidebar: (rightSidebar: Partial<RightSidebarState>) => void;
  setIsMiniPlayerWindowOpen: (isMiniPlayerWindowOpen: boolean) => void;
  setSystemVolume: (volume: number[]) => void;
  setOpenedFolder: (folder: Partial<FolderState>) => void;
}

export const useUIPreferencesStore = create<UIPreferencesStore>((set) => ({
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
    isNowPlayingViewFullScreen: false
  },
  isMiniPlayerWindowOpen: false,
  systemVolume: [100],
  openedFolder: {
    id: "",
    name: ""
  },

  setLeftSidebar: (leftSidebar) => {
    set((state) => {
      const updatedLeftSidebar = {
        ...state.leftSidebar,
        ...leftSidebar
      }
      localStorage.setItem(LEFT_SIDEBAR_KEY, JSON.stringify(updatedLeftSidebar));

      return {
        leftSidebar: updatedLeftSidebar
      }
    })
  },

  setLibrary: (library) => {
    set((state) => {
      const updatedLibrary = {
        ...state.library,
        ...library
      }

      localStorage.setItem(LIBRARY_KEY, JSON.stringify(updatedLibrary));

      return {
        library: updatedLibrary
      }
    })
  },

  setRightSidebar: (rightSidebar) => {
    set((state) => {
      const updatedRightSidebar = {
        ...state.rightSidebar,
        ...rightSidebar
      }

      localStorage.setItem(RIGHT_SIDEBAR_KEY, JSON.stringify(updatedRightSidebar));

      return {
        rightSidebar: updatedRightSidebar
      }
    })
  },

  setIsMiniPlayerWindowOpen: (isMiniPlayerWindowOpen) => {
    set(() => {
      localStorage.setItem(MINI_PLAYER_WINDOW_OPEN_KEY, JSON.stringify(isMiniPlayerWindowOpen));

      return {
        isMiniPlayerWindowOpen
      }
    })
  },

  setSystemVolume: (volume) => {
    set(() => {
      localStorage.setItem(SYSTEM_VOLUME_KEY, JSON.stringify(volume));

      return {
        systemVolume: volume
      }
    })
  },

  setOpenedFolder: (folder) => {
    set((state) => {
      const updatedOpenedFolder = {
        ...state.openedFolder,
        ...folder
      }
      localStorage.setItem(OPENED_FOLDER_KEY, JSON.stringify(updatedOpenedFolder));

      return {
        openedFolder: updatedOpenedFolder
      }
    })
  }
}));