import {
  Database,
  IndexName,
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  VocabularyDocument,
  isLatinCharactersRegexp,
  isValidRomajiRegexp,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { Loader } from "../../../common/loader/loader";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";
import { SearchResult } from "./searchResult";
import { Pagination } from "../../../common/pagination/pagination";
import { Link } from "../../../common/link/link";
import { CheckboxGroup } from "../../../common/checkboxGroup/checkboxGroup";
import { Searchbox } from "../../../common/searchbox/searchbox";
import { Fieldset } from "../../../common/fieldset/fieldset";

export function SearchView({
  contentId,
}: {
  contentId: ContentId & { type: "search" };
}) {
  const [filterResultsText, setFilterResultsText] = useState("");
  const [searchResults, setSearchResults] = useState(
    null as (
      | IndexSearchResult<KanjiDocument>
      | IndexSearchResult<VocabularyDocument>
      | IndexSearchResult<NameDocument>
    )[]
  );
  const [filteredResults, setFilteredResults] = useState(
    null as (
      | IndexSearchResult<KanjiDocument>
      | IndexSearchResult<VocabularyDocument>
      | IndexSearchResult<NameDocument>
    )[]
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<IndexName[]>([
    "kanji",
    "vocabulary",
    "name",
  ]);
  useEffect(() => {
    if (contentId.id) {
      (async () => {
        const searchResults = await Database.termsIndices.searchText(
          contentId.id,
          {
            forceEnglish: selectedOptions.includes("Search English term"),
            forceJapanese: selectedOptions.includes("Search Japanese term"),
            addKanji: true,
            addKanjiAtBottom: true,
          }
        );
        setSearchResults(searchResults);
      })();
    }
  }, [contentId, selectedOptions]);

  useEffect(() => {
    let filtered =
      searchResults?.filter(
        result => selectedIndices.indexOf(result._index) >= 0
      ) || searchResults;
    (async () => {
      if (filterResultsText) {
        filtered = await Database.termsIndices.searchText(filterResultsText, {
          forceEnglish: true,
          forceJapanese: true,
          addKanji: false,
          addKanjiAtBottom: false,
          documents: filtered,
        });
      }
      setFilteredResults(filtered);
    })();
  }, [searchResults, selectedIndices, filterResultsText]);

  const isEnglish =
    isLatinCharactersRegexp.test(contentId.id) &&
    !isValidRomajiRegexp.test(contentId.id);
  const detectedLanguage = isEnglish ? "English" : "Japanese";

  return (
    filteredResults && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Styles.Header>
          Search: {contentId.id} (detected language: {detectedLanguage})
        </Styles.Header>

        <Styles.Line>
          <div>
            <Styles.Line>
              <Loader isLoaded={Boolean(searchResults)}>
                Results count: {searchResults.length}
                {filteredResults.length < searchResults.length
                  ? ` (filtered ${
                      searchResults.length - filteredResults.length
                    })`
                  : ""}
              </Loader>
            </Styles.Line>
            <CheckboxGroup
              options={["Search English term", "Search Japanese term"]}
              onChange={setSelectedOptions}
              selectedOptions={selectedOptions}
            />
          </div>
          <Fieldset legend="Filters">
            <div
              style={{
                flexGrow: 1,
                margin: 10,
                display: "flex",
              }}
            >
              <Searchbox
                text={filterResultsText}
                placeholder="Filter results..."
                onChange={value => setFilterResultsText(value)}
              />
            </div>
            <CheckboxGroup
              options={["kanji", "vocabulary", "name"] as IndexName[]}
              onChange={setSelectedIndices}
              selectedOptions={selectedIndices}
              wrap
            />
          </Fieldset>
        </Styles.Line>

        <Styles.SearchResultsTable>
          <Pagination
            items={filteredResults}
            itemsInPage={20}
            tabIndex={0}
            itemsRenderer={result => (
              <Link
                searchResult={result}
                key={`${result._index} ${result._id}`}
              >
                <SearchResult
                  searchText={contentId.id}
                  filterResultsText={filterResultsText}
                  result={result}
                />
              </Link>
            )}
          />
        </Styles.SearchResultsTable>
      </div>
    )
  );
}
