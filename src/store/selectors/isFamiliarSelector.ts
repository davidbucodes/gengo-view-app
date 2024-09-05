import { RootState } from "../store";
import { ContentId } from "../../components/view/contentId";

export function isFamiliarSelector(
  contentId: ContentId
): (state: RootState) => boolean {
  return state => {
    return Boolean(state.familiars.savedFamiliars[contentId.id]);
  };
}
