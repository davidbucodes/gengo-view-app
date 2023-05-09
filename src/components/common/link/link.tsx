import {
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { useAppDispatch } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { searchResultToContentId } from "../../topbar/searchbar/searchResultsToContentIds";
import { Styles } from "./style";

export function Link({
  children,
  searchResult,
}: React.PropsWithChildren<{
  searchResult:
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>;
}>): JSX.Element {
  const dispatch = useAppDispatch();

  function onAuxClick(event: React.MouseEvent) {
    if (event.button === 1) {
      const contentId = searchResultToContentId(searchResult);
      dispatch(openTab(contentId));
    }
  }

  function onClick(event: React.MouseEvent) {
    event.stopPropagation();
    const contentId = searchResultToContentId(searchResult);
    dispatch(openTab(contentId));
  }

  return (
    <Styles.Link onClick={onClick} onAuxClick={onAuxClick}>
      {children}
    </Styles.Link>
  );
}
