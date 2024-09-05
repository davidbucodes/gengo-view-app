import { Button } from "../button/button";

import { ContentId } from "../../view/contentId";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { isFamiliarSelector } from "../../../store/selectors/isFamiliarSelector";
import { toggleFamiliar } from "../../../store/slices/familiarsSlice";
import { Beenhere, BeenhereOutlined } from "@mui/icons-material";
export function AddToFamiliarsButton({
  contentId,
}: {
  contentId: ContentId;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const isFamiliar = useAppSelector(isFamiliarSelector(contentId));

  function onToggleFamiliarClick() {
    dispatch(toggleFamiliar({ contentId }));
  }

  return (
    <Button onClick={onToggleFamiliarClick}>
      {isFamiliar ? <Beenhere /> : <BeenhereOutlined />}
    </Button>
  );
}
