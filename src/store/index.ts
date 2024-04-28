import { create } from "zustand";

interface State {
  first?: boolean;
  second?: boolean;
  third?: boolean;
}

interface DrawerProps {
  drawerState: State;
  changeDrawerState: (drawerState: State) => void;
  collapseState: State;
  changeCollapseState: (collapseState: State) => void;
  manualState: State;
  changeManualState: (manualState: State) => void;
}

export const useDrawerStore = create<DrawerProps>((set) => ({
  drawerState: {
    first: undefined,
    second: undefined,
    third: undefined,
  },
  changeDrawerState: (drawerState) =>
    set((state) => ({ drawerState: { ...state.drawerState, ...drawerState } })),

  collapseState: {
    first: false,
    second: false,
    third: false,
  },
  changeCollapseState: (collapseState) =>
    set((state) => ({
      collapseState: { ...state.collapseState, ...collapseState },
    })),

  manualState: {
    first: undefined,
    second: undefined,
    third: undefined,
  },
  changeManualState: (manualState) =>
    set((state) => ({
      manualState: { ...state.manualState, ...manualState },
    })),
}));
