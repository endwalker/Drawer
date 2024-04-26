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
    first: undefined,
    second: undefined,
    third: undefined,
  },
  changeCollapseState: (collapseState) =>
    set((state) => ({
      collapseState: { ...state.collapseState, ...collapseState },
    })),
}));
