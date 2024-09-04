import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyValueStorage } from "../../utils/KeyValueStorage";
import { ContentId } from "../../components/view/contentId";
import { FavoritesUtils } from "../utils/favoritesUtils";

const FAVORITES_KEY = "FAVORITES_KEY";
const favoritesName = "🇯🇵 Favorites";

export interface SavedFavoritesState {
  savedFavorites: ContentId[];
}

function saveFavoritesToStorage(favorites: ContentId[]) {
  const favoritesDump = FavoritesUtils.dumpFavorites({ favorites });
  KeyValueStorage.set(FAVORITES_KEY, favoritesDump);
}

if (!KeyValueStorage.isValueTruthy(FAVORITES_KEY)) {
  saveFavoritesToStorage([]);
}

function loadFavoritesFromStorage(): ContentId[] {
  const favoritesFromStorage = FavoritesUtils.readFavoritesDump({
    favoritesDump: KeyValueStorage.get(FAVORITES_KEY),
  });
  return favoritesFromStorage;
}

const initialState: SavedFavoritesState = {
  savedFavorites: loadFavoritesFromStorage(),
};

export const slice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (
      state,
      action: PayloadAction<{
        contentId: ContentId;
      }>
    ) => {
      const { contentId } = action.payload;
      FavoritesUtils.toggleSave(state.savedFavorites, contentId);
      saveFavoritesToStorage(state.savedFavorites);
    },
  },
});

export const { toggleFavorite } = slice.actions;

export default slice.reducer;
