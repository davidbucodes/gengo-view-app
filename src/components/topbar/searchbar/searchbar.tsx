import { Database } from "@davidbucodes/gengo-view-database";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ContentId } from "../../view/contentId";
import { SearchResults } from "./searchResults";
import { searchResultsToContentIds } from "./searchResultsToContentIds";
import { Styles } from "./style";
import { openTab } from "../../../store/slices/tabsSlice";
import { patchKeyboardConfig } from "../../../store/slices/keyboardSlice";
import { pickCommand } from "../../../store/slices/commandSlice";

export function Searchbar() {
  const ref = useRef<HTMLInputElement>();

  const commandQueue = useAppSelector(state => state.command.commandQueue);

  useEffect(() => {
    dispatch(
      patchKeyboardConfig({
        config: {
          KeyF: "Focus searchbox",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (commandQueue.includes("Focus searchbox")) {
      dispatch(pickCommand({ name: "Focus searchbox" }));
      setTimeout(() => ref?.current?.focus());
    }
  }, [commandQueue]);

  const dispatch = useAppDispatch();
  const selectSearchOnFocus = useAppSelector(
    state => state.config.selectSearchOnFocus
  );

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isResultsPopupFocused, setIsResultsPopupFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ContentId[]>([]);
  const [searchResultsLength, setSearchResultsLength] = useState(0);

  function onClosePopup() {
    setTimeout(() => {
      setIsResultsPopupFocused(false);
      setIsInputFocused(false);
    });
  }

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
          ref={ref}
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
          onKeyDown={event => {
            if (event.code === "Enter" && event.altKey === true) {
              dispatch(
                openTab({
                  type: "search",
                  label: searchText,
                  id: searchText,
                })
              );
              ref.current?.blur();
              setIsResultsPopupFocused(false);
            }
          }}
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
            tabIndex={-1}
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
