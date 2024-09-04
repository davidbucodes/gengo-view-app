import { ContentId } from "../../components/view/contentId";
import { generateId } from "./generateId";
import { TabGroup } from "./tabsGroupUtils";

const allowedContentIdTypes = [
  "kanji",
  "name",
  "vocabulary",
] as ContentId["type"][];

export namespace FavoritesUtils {
  export function dumpFavorites({
    favorites,
  }: {
    favorites: ContentId[];
  }): string {
    return JSON.stringify(favorites);
  }

  export function readFavoritesDump({
    favoritesDump,
  }: {
    favoritesDump: string;
  }): ContentId[] {
    return JSON.parse(favoritesDump);
  }

  export function toggleSave(favorites: ContentId[], contentId: ContentId) {
    if (allowedContentIdTypes.includes(contentId.type)) {
      const isFavorite =
        favorites.findIndex(favorite => favorite.id === contentId.id) >= 0;
      if (isFavorite) {
        favorites = favorites.filter(favorite => favorite.id !== contentId.id);
      } else {
        favorites.unshift(contentId);
      }
    }
  }
}
