import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  currentFolderId: null,
  userInfo: null,
  setCurrentFolderId: (id) => set({ currentFolderId: id }),
  setUserInfo: (info) => set({ userInfo: info }),
}));
