import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListModel, ListUtils } from "../utils/listUtils";
import { KeyValueStorage } from "../../utils/KeyValueStorage";
import { ContentId } from "../../components/view/contentId";
import { sortListsByUpdateDate } from "../selectors/listsByUpdateDateSelector";

const LISTS_KEY = "LISTS_KEY";
const favoritesListName = "🇯🇵 Favorites";

export interface SavedListsState {
  savedLists: ListModel[];
}

function saveListsToStorage(lists: ListModel[]) {
  const listsDump = ListUtils.dumpLists({ lists });
  KeyValueStorage.set(LISTS_KEY, listsDump);
}

function createDefaultList(): ListModel {
  return ListUtils.createList(favoritesListName);
}

if (!KeyValueStorage.isValueTruthy(LISTS_KEY)) {
  saveListsToStorage([createDefaultList()]);
}

function loadListsFromStorage(): ListModel[] {
  const listsFromStorage = ListUtils.readListsDump({
    listsDump: KeyValueStorage.get(LISTS_KEY),
  });
  return listsFromStorage;
}

const initialState: SavedListsState = {
  savedLists: loadListsFromStorage(),
};

export const slice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createList: (
      state,
      action: PayloadAction<{
        listName: string;
        contentId?: ContentId;
      }>
    ) => {
      const { listName, contentId } = action.payload;
      const newList = ListUtils.createList(
        listName,
        [contentId].filter(id => id)
      );
      state.savedLists.unshift(newList);
      saveListsToStorage(state.savedLists);
    },
    clearAllLists: state => {
      state.savedLists = [createDefaultList()];
      saveListsToStorage(state.savedLists);
    },
    setLists: (
      state,
      action: PayloadAction<{
        lists: ListModel[];
      }>
    ) => {
      const { lists } = action.payload;
      state.savedLists = lists;
      saveListsToStorage(state.savedLists);
    },
    deleteList: (
      state,
      action: PayloadAction<{
        listId: ListModel["id"];
      }>
    ) => {
      state.savedLists = state.savedLists.filter(
        list => list.id !== action.payload.listId
      );
      saveListsToStorage(state.savedLists);
    },
    renameList: (
      state,
      action: PayloadAction<{
        listId: ListModel["id"];
        newListName: string;
      }>
    ) => {
      const list = state.savedLists.find(
        list => list.id === action.payload.listId
      );
      list.name = action.payload.newListName;
      list.updatedTimestamp = Date.now();
      saveListsToStorage(state.savedLists);
    },
    toggleSave: (
      state,
      action: PayloadAction<{
        listId: string;
        contentId: ContentId;
      }>
    ) => {
      const { listId, contentId } = action.payload;
      const list = state.savedLists.find(list => list.id === listId);
      ListUtils.toggleSave(list, contentId);
      list.updatedTimestamp = Date.now();
      saveListsToStorage(state.savedLists);
    },
    toggleSaveToRecentlyUpdatedList: (
      state,
      action: PayloadAction<{
        listIndex: number;
        contentId: ContentId;
      }>
    ) => {
      const { listIndex, contentId } = action.payload;
      const sortedLists = sortListsByUpdateDate(state.savedLists);
      const list = sortedLists[listIndex];
      if (!list) {
        return;
      }

      ListUtils.toggleSave(list, contentId);
      list.updatedTimestamp = Date.now();
      saveListsToStorage(state.savedLists);
    },
  },
});

export const {
  createList,
  clearAllLists,
  setLists,
  deleteList,
  renameList,
  toggleSave,
  toggleSaveToRecentlyUpdatedList,
} = slice.actions;

export default slice.reducer;
