import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyValueStorage } from "../../utils/KeyValueStorage";
import { ContentId } from "../../components/view/contentId";
import { FamiliarsUtils, SavedFamiliars } from "../utils/familiarsUtils";

const FAMILIARS_KEY = "FAMILIARS_KEY";

export interface SavedFamiliarsState {
  savedFamiliars: SavedFamiliars;
}

function saveFamiliarsToStorage(familiars: SavedFamiliars) {
  const familiarsDump = FamiliarsUtils.dumpFamiliars({ familiars });
  KeyValueStorage.set(FAMILIARS_KEY, familiarsDump);
}

if (!KeyValueStorage.isValueTruthy(FAMILIARS_KEY)) {
  saveFamiliarsToStorage({});
}

function loadFamiliarsFromStorage(): SavedFamiliars {
  const familiarsFromStorage = FamiliarsUtils.readFamiliarsDump({
    familiarsDump: KeyValueStorage.get(FAMILIARS_KEY),
  });
  return familiarsFromStorage;
}

const initialState: SavedFamiliarsState = {
  savedFamiliars: loadFamiliarsFromStorage(),
};

export const slice = createSlice({
  name: "familiars",
  initialState,
  reducers: {
    toggleFamiliar: (
      state,
      action: PayloadAction<{
        contentId: ContentId;
      }>
    ) => {
      const { contentId } = action.payload;
      FamiliarsUtils.toggleSave(state.savedFamiliars, contentId);
      saveFamiliarsToStorage(state.savedFamiliars);
    },
  },
});

export const { toggleFamiliar } = slice.actions;

export default slice.reducer;
