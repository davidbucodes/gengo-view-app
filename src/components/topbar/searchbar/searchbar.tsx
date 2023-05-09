import { Database } from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { ContentId } from "../../view/contentId";
import { SearchResults } from "./searchResults";
import { searchResultsToContentIds } from "./searchResultsToContentIds";
import { Styles } from "./style";

export function Searchbar() {
  const selectSearchOnFocus = useAppSelector(
    state => state.config.selectSearchOnFocus
  );

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isResultsPopupFocused, setIsResultsPopupFocused] = useState(false);
  const [searchText, setSearchText] = useState("");

  function onClosePopup() {
    setTimeout(() => {
      setIsResultsPopupFocused(false);
      setIsInputFocused(false);
    });
  }

  const [searchResults, setSearchResults] = useState<ContentId[]>([]);
  const [searchResultsLength, setSearchResultsLength] = useState(0);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      Database.termsIndices.searchText(searchText).then(results => {
        const contentIds = searchResultsToContentIds(results);
        setSearchResults(contentIds.slice(0, 20));
        setSearchResultsLength(contentIds.length);
      });
    }, 185);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [searchText]);

  return (
    <Styles.SearchbarWrapper>
      <Styles.Searchbar>
        <Styles.SearchInput
          type={"text"}
          onFocus={event => {
            setIsInputFocused(true);
            if (selectSearchOnFocus) {
              event.target.select();
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsInputFocused(false);
            });
          }}
          onChange={event => setSearchText(event.target.value)}
          placeholder={"Search..."}
        />
        {(isInputFocused || isResultsPopupFocused) && (
          <Styles.SearchResultsPopup
            onClick={() => {
              setIsResultsPopupFocused(true);
            }}
            onFocus={() => {
              setIsResultsPopupFocused(true);
            }}
            onBlur={() => {
              setIsResultsPopupFocused(false);
            }}
            tabIndex={0}
          >
            <SearchResults
              searchText={searchText}
              onClosePopup={onClosePopup}
              searchResults={searchResults}
              searchResultsLength={searchResultsLength}
            />
          </Styles.SearchResultsPopup>
        )}
      </Styles.Searchbar>
    </Styles.SearchbarWrapper>
  );
}
