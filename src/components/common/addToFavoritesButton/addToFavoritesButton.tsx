import { Button } from "../button/button";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ContentId } from "../../view/contentId";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { isFavoriteSelector } from "../../../store/selectors/isFavoriteSelector";
import { toggleFavorite } from "../../../store/slices/favoritesSlice";
export function AddToFavoriteButton({
  contentId,
}: {
  contentId: ContentId;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(isFavoriteSelector(contentId));

  function onToggleFavoriteClick() {
    dispatch(toggleFavorite({ contentId }));
  }

  return (
    <Button onClick={onToggleFavoriteClick}>
      {isFavorite ? <Favorite /> : <FavoriteBorder />}
    </Button>
  );
}
