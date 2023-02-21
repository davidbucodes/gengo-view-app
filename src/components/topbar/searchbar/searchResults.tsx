import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { Button } from "../../common/button/button";
import { ContentIdBadge } from "../../common/contentIdBadge/contentIdBadge";
import { ContentId } from "../../view/contentId";
import { Styles } from "./style";

export function SearchResults({
  onClosePopup,
  searchText,
  searchResults,
  searchResultsLength,
}: {
  onClosePopup: () => void;
  searchText: string;
  searchResults: ContentId[];
  searchResultsLength: number;
}) {
  const dispatch = useAppDispatch();
  const maxResultsForDisplay = useAppSelector(
    state => state.config.maxResultsForDisplay
  );
  const closeSearchResultsOnPopupInteraction = useAppSelector(
    state => state.config.closeSearchResultsOnPopupInteraction
  );

  function onResultClick(result: ContentId) {
    dispatch(openTab(result));
    closePopupIfNeeded();
  }

  function closePopupIfNeeded() {
    if (closeSearchResultsOnPopupInteraction) {
      onClosePopup();
    }
  }

  const resultsNumberToDisplay = Math.min(
    searchResultsLength,
    maxResultsForDisplay
  );
  const displayedResults = searchResults.slice(0, resultsNumberToDisplay);

  return (
    <Styles.SearchResults>
      {searchResults.length === 0 && (
        <Styles.NoSearchResultsText>No results</Styles.NoSearchResultsText>
      )}
      {displayedResults.map((result, index) => (
        <Styles.SearchResult
          tabIndex={1}
          key={result.id}
          onClick={() => onResultClick(result)}
        >
          <ContentIdBadge tabContentType={result.type} />
          <Styles.SearchResultText>{result.label}</Styles.SearchResultText>
        </Styles.SearchResult>
      ))}
      <Styles.SearchResultsCount>
        Results count: {searchResultsLength} ({resultsNumberToDisplay}{" "}
        displayed)
      </Styles.SearchResultsCount>
      {displayedResults.length !== 0 && (
        <Button
          onClick={() => {
            closePopupIfNeeded();
            displayedResults.forEach(result => {
              dispatch(openTab(result));
            });
          }}
        >
          Open tabs for {resultsNumberToDisplay} displayed results
        </Button>
      )}
      {searchText !== "" && (
        <Button
          onClick={() => {
            closePopupIfNeeded();
            dispatch(
              openTab({ type: "search", id: searchText, label: searchText })
            );
          }}
        >
          Open search in tab
        </Button>
      )}
    </Styles.SearchResults>
  );
}
