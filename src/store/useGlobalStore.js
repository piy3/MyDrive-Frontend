// store/useGlobalStore.js
import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  currentFolderId: null,
  userInfo: null,
  foldersMap: {}, // structure: { [parentFolderId]: [folders] }

  setCurrentFolderId: (id) => set({ currentFolderId: id }),
  setUserInfo: (info) => set({ userInfo: info }),

  // set folders for a specific parent
  setFoldersForParent: (parentId, folders) =>
    set((state) => ({
      foldersMap: {
        ...state.foldersMap,
        [parentId]: folders,
      },
    })),
    
    updateFolderInParent: (parentId, updatedFolder) =>
  set((state) => {
    const existingFolders = state.foldersMap[parentId] || []; // fallback to empty array
    const updatedList = existingFolders.map((f) =>
      f._id === updatedFolder._id ? updatedFolder : f
    );

    return {
      foldersMap: {
        ...state.foldersMap,
        [parentId]: updatedList,
      },
    };
  }),



  // add a folder to a specific parent
  addFolderToParent: (parentId, folder) =>
    set((state) => ({
      foldersMap: {
        ...state.foldersMap,
        [parentId]: [...(state.foldersMap[parentId] || []), folder],
      },
    })),
}));
