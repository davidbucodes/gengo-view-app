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
import { ContentId } from "../../view/contentId";

export function Link({
  children,
  searchResult,
  previousContentIds = [],
}: React.PropsWithChildren<{
  searchResult:
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>;
  previousContentIds?: ContentId[];
}>): JSX.Element {
  const dispatch = useAppDispatch();

  function onAuxClick(event: React.MouseEvent) {
    if (event.button === 1) {
      const contentId = searchResultToContentId(searchResult);
      dispatch(openTab({ contentId, previousContentIds }));
    }
  }

  function onClick(event: React.MouseEvent) {
    event.stopPropagation();
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      return;
    }
    const contentId = searchResultToContentId(searchResult);
    dispatch(openTab({ contentId, previousContentIds }));
  }

  return (
    <Styles.Link onClick={onClick} onAuxClick={onAuxClick}>
      {children}
    </Styles.Link>
  );
}
