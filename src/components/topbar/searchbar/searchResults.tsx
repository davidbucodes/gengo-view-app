import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { openTab } from "../../../store/slices/tabsSlice";
import { Button } from "../../common/button/button";
import { ContentIdBadge } from "../../common/contentIdBadge/contentIdBadge";
import { ContentId } from "../../view/contentId";
import { Styles } from "./style";

export function SearchResults({
  onClosePopup,
  onFocus,
  onBlur,
  searchText,
  searchResults,
  searchResultsLength,
}: {
  onClosePopup: () => void;
  onFocus: () => void;
  onBlur: () => void;
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

  const [isSomeElementFocused, setIsSomeElementFocused] = useState(false);

  useEffect(() => {
    if (isSomeElementFocused) {
      onFocus();
    } else {
      onBlur();
    }
  }, [isSomeElementFocused]);

  function onResultClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    result: ContentId
  ) {
    console.log(e.button);
    if (e.button === 1) {
      dispatch(openTab({ contentId: result }));
    } else if (e.button === 0) {
      dispatch(openTab({ contentId: result }));
      closePopupIfNeeded();
    }
  }

  function onResultKeyDown(
    e: React.KeyboardEvent<HTMLDivElement>,
    result: ContentId
  ) {
    if (e.code === "Enter" && !e.altKey) {
      dispatch(openTab({ contentId: result }));
      closePopupIfNeeded();
    }
    if (e.code === "Escape") {
      closePopupIfNeeded();
    } else if (e.code === "ArrowDown" || e.code === "ArrowRight") {
      (e.currentTarget?.nextElementSibling as HTMLElement)?.focus();
    } else if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
      const previousElement = e.currentTarget?.previousElementSibling;

      if (previousElement) {
        (e.currentTarget?.previousElementSibling as HTMLElement)?.focus();
      } else {
        const searchbar =
          e.currentTarget?.parentElement?.parentElement?.previousElementSibling;

        console.log(e.currentTarget?.parentElement);
        console.log(e.currentTarget?.parentElement?.parentElement);
        console.log(
          e.currentTarget?.parentElement?.parentElement?.previousElementSibling
        );
        if (searchbar?.tagName === "INPUT") {
          (searchbar as HTMLElement).focus();
        }
      }
    }
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
    <Styles.SearchResults
      tabIndex={-1}
      onFocus={() => {
        setIsSomeElementFocused(true);
      }}
      onBlur={() => {
        setIsSomeElementFocused(false);
      }}
    >
      {searchResults.length === 0 && (
        <Styles.NoSearchResultsText>No results</Styles.NoSearchResultsText>
      )}
      {displayedResults.map((result, index) => (
        <Styles.SearchResult
          tabIndex={1}
          key={result.id}
          onMouseDown={e => onResultClick(e, result)}
          onKeyDown={e => onResultKeyDown(e, result)}
          onFocus={() => {
            setIsSomeElementFocused(true);
          }}
          onBlur={() => {
            setIsSomeElementFocused(false);
          }}
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
          tabIndex={1}
          onFocus={() => setIsSomeElementFocused(true)}
          onClick={() => {
            closePopupIfNeeded();
            displayedResults.forEach(result => {
              dispatch(openTab({ contentId: result }));
            });
          }}
        >
          Open tabs for {resultsNumberToDisplay} displayed results
        </Button>
      )}
      {searchText !== "" && (
        <Button
          tabIndex={1}
          onFocus={() => setIsSomeElementFocused(false)}
          onClick={() => {
            closePopupIfNeeded();
            dispatch(
              openTab({
                contentId: {
                  type: "search",
                  id: searchText,
                  label: searchText,
                },
              })
            );
          }}
        >
          Open search in tab
        </Button>
      )}
    </Styles.SearchResults>
  );
}
