import { create } from 'zustand';
import type { TableColumns, TableView } from '../types';
import { TABLE_COLUMNS_CONFIG_KEY, TABLE_VIEW_KEY } from '../constants';

type TableColumnVisibilityStates = {
  tableView: TableView;
  albumTableColumns: TableColumns;
  playlistTableColumns: TableColumns;

  setTableView: (view: TableView) => void;

  toggleAlbumTableColumn: (field: keyof TableColumns) => void;
  togglePlaylistTableColumn: (field: keyof TableColumns) => void;

  setAlbumTableColumns: (columns: Partial<TableColumns>) => void;
  setPlaylistTableColumns: (columns: Partial<TableColumns>) => void;
};

export const useTableColumnVisibilityStore = create<TableColumnVisibilityStates>((set) => ({
  tableView: "Compact List",

  albumTableColumns: {
    INDEX: { visible: true },
    TITLE: { visible: true },
    ARTIST: { visible: true },
    DURATION: { visible: true },
  },

  playlistTableColumns: {
    INDEX: { visible: true },
    TITLE: { visible: true },
    ARTIST: { visible: true },
    ALBUM: { visible: true },
    "DATE ADDED": { visible: false },
    DURATION: { visible: true }
  },

  setTableView: (view) =>
    set(() => {
      localStorage.setItem(TABLE_VIEW_KEY, JSON.stringify(view));

      return {
        tableView: view
      }
    }),

  toggleAlbumTableColumn: (field) =>
    set((state) => {
      let albumTableColumns = {
        ...state.albumTableColumns,
        [field]: {
          visible: !state.albumTableColumns[field]?.visible,
        },
      }

      localStorage.setItem(TABLE_COLUMNS_CONFIG_KEY, JSON.stringify({ albumTableColumns, playlistTableColumns: state.playlistTableColumns }));

      return {
        albumTableColumns
      }
    }),

  togglePlaylistTableColumn: (field) =>
    set((state) => {
      let playlistTableColumns = {
        ...state.playlistTableColumns,
        [field]: {
          visible: !state.playlistTableColumns[field]?.visible,
        },
      }

      localStorage.setItem(TABLE_COLUMNS_CONFIG_KEY, JSON.stringify({ playlistTableColumns, albumTableColumns: state.albumTableColumns }));

      return {
        playlistTableColumns
      }
    }),

  setAlbumTableColumns: (columns) =>
    set((state) => {
      let albumTableColumns = {
        ...state.albumTableColumns,
        ...columns,
      }

      localStorage.setItem(TABLE_COLUMNS_CONFIG_KEY, JSON.stringify({ albumTableColumns, playlistTableColumns: state.playlistTableColumns }));

      return {
        albumTableColumns
      }
    }),

  setPlaylistTableColumns: (columns) =>
    set((state) => {
      let playlistTableColumns = {
        ...state.playlistTableColumns,
        ...columns,
      }

      localStorage.setItem(TABLE_COLUMNS_CONFIG_KEY, JSON.stringify({ playlistTableColumns, albumTableColumns: state.albumTableColumns }));

      return {
        playlistTableColumns
      }
    })
}));
