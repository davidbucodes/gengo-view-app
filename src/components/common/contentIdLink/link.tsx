import { useAppDispatch } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { Styles } from "./style";
import { ContentId } from "../../view/contentId";

export function ContentIdLink({
  children,
  contentId,
  previousContentIds = [],
}: React.PropsWithChildren<{
  contentId: ContentId;
  previousContentIds?: ContentId[];
}>): JSX.Element {
  const dispatch = useAppDispatch();

  function onAuxClick(event: React.MouseEvent) {
    if (event.button === 1) {
      dispatch(openTab({ contentId, previousContentIds }));
    }
  }

  function onClick(event: React.MouseEvent) {
    event.stopPropagation();
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      return;
    }
    dispatch(openTab({ contentId, previousContentIds }));
  }

  return (
    <Styles.Link onClick={onClick} onAuxClick={onAuxClick}>
      {children}
    </Styles.Link>
  );
}
