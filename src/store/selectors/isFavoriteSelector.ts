import { ListModel } from "../utils/listUtils";
import { sortBy } from "lodash";
import { RootState } from "../store";
import { ContentId } from "../../components/view/contentId";

export function isFavoriteSelector(
  contentId: ContentId
): (state: RootState) => boolean {
  return state => {
    return (
      state.favorites.savedFavorites.findIndex(
        favorite => favorite.id === contentId.id
      ) >= 0
    );
  };
}
