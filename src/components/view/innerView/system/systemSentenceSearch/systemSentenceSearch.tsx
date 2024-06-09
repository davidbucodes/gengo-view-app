import {
  Database,
  IndexSearchResult,
  KanjiDocument,
  SentenceDocument,
} from "@davidbucodes/gengo-view-database";
import { range } from "lodash";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  openTab,
  setDraggedContent,
} from "../../../../../store/slices/tabsSlice";
import { Grid } from "../../../../common/grid/grid";
import { GridItemModel } from "../../../../common/grid/gridItem";
import { RadioGroup } from "../../../../common/radioGroup/radioGroup";
import { searchResultToContentId } from "../../../../topbar/searchbar/searchResultsToContentIds";
import { ContentId } from "../../../contentId";
import { Styles } from "../../../style";
import { ContentReferences } from "../../../contentReferences/contentReferences";
import { Searchbox } from "../../../../common/searchbox/searchbox";
import { TextReader } from "../../../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../../../utils/tts";
import { highlightEntry } from "../../../../../utils/highlightEntry";
import { Pagination } from "../../../../common/pagination/pagination";

export function SystemSentenceSearchView() {
  const highlightWordAtReferences = useAppSelector(
    state => state.config.highlightWordAtReferences
  );

  const [searchedText, setSearchedText] = useState("");
  const [filterResultsText, setFilterResultsText] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<IndexSearchResult<SentenceDocument>>
  >([]);

  useEffect(() => {
    (async () => {
      let results: IndexSearchResult<SentenceDocument>[] = [];
      if (searchedText.length) {
        results = await Database.indices.sentenceIndex.searchText(
          searchedText,
          {
            english: true,
            japanese: true,
            scorePenalty: 0,
          }
        );
      }

      if (results.length && filterResultsText.length) {
        results = await Database.indices.sentenceIndex.searchText(
          filterResultsText,
          {
            english: true,
            japanese: true,
            scorePenalty: 0,
            documents: results,
          }
        );
      }

      setSearchResults(results);
    })();
  }, [filterResultsText, searchedText]);

  return (
    <Styles.InnerView>
      <Styles.Header>Sentence search</Styles.Header>
      <Styles.Line>Filter:</Styles.Line>
      <Styles.Line>
        <Searchbox
          text={searchedText}
          placeholder="Search sentences..."
          onChange={value => setSearchedText(value)}
          useSecondaryFilter
          secondaryText={filterResultsText}
          secondaryPlaceholder="Filter results..."
          onSecondaryChange={value => setFilterResultsText(value)}
        />
      </Styles.Line>
      <Pagination
        items={searchResults}
        itemsInPage={30}
        itemsRenderer={sentence => (
          <div
            key={sentence._id}
            style={{
              border: "1px  solid grey",
              padding: 15,
            }}
          >
            <div>
              {!highlightWordAtReferences
                ? sentence.j
                : highlightEntry(sentence.j, searchedText, filterResultsText)}
              <TextReader
                language={TextVoiceLanguage.JA}
                textToRead={sentence.j}
              />
            </div>
            <div>
              {!highlightWordAtReferences
                ? sentence.e
                : highlightEntry(
                    sentence.e,
                    searchedText,
                    filterResultsText
                  )}{" "}
              <TextReader
                language={TextVoiceLanguage.EN}
                textToRead={sentence.e}
              />
            </div>
          </div>
        )}
      />
    </Styles.InnerView>
  );
}
