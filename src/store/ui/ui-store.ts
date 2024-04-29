import { create } from 'zustand';

interface State{
    isSideMenuOpen: boolean;
    opendSideMenu: () => void;
    closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    opendSideMenu: () => set({ isSideMenuOpen: true }),
    closeSideMenu: () => set({ isSideMenuOpen: false })
}))