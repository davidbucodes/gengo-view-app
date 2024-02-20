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
  useTrElement = false,
}: React.PropsWithChildren<{
  searchResult:
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>;
  previousContentIds?: ContentId[];
  useTrElement?: boolean;
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

  function onKeyDown(ev: React.KeyboardEvent) {
    if (ev.code === "Enter") {
      ev.preventDefault();
      const contentId = searchResultToContentId(searchResult);
      dispatch(openTab({ contentId, previousContentIds }));
    }
  }

  const attrs: Record<string, string> = {};

  if (useTrElement) {
    attrs.as = "tr";
  }

  return (
    <Styles.Link
      {...attrs}
      tabIndex={1}
      onClick={onClick}
      onAuxClick={onAuxClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </Styles.Link>
  );
}
