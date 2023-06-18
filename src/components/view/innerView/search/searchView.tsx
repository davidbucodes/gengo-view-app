import {
  Database,
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { Loader } from "../../../common/loader/loader";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";
import { SearchResult } from "./searchResult";
import { Pagination } from "../../../common/pagination/pagination";
import { Link } from "../../../common/link/link";
import { CheckboxGroup } from "../../../common/checkboxGroup/checkboxGroup";

export function SearchView({
  contentId,
}: {
  contentId: ContentId & { type: "search" };
}) {
  const [searchResults, setSearchResults] = useState(
    null as (
      | IndexSearchResult<KanjiDocument>
      | IndexSearchResult<VocabularyDocument>
      | IndexSearchResult<NameDocument>
    )[]
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  useEffect(() => {
    if (contentId.id) {
      (async () => {
        const searchResults = await Database.termsIndices.searchText(
          contentId.id,
          {
            forceEnglish: selectedOptions.includes("Search English term"),
            forceJapanese: selectedOptions.includes("Search Japanese term"),
          }
        );
        setSearchResults(searchResults);
      })();
    }
  }, [contentId, selectedOptions]);

  return (
    searchResults && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Styles.Header>Search: {contentId.id}</Styles.Header>
        <Loader isLoaded={Boolean(searchResults)}>
          Results count: {searchResults.length}
        </Loader>
        <CheckboxGroup
          options={["Search English term", "Search Japanese term"]}
          onChange={setSelectedOptions}
          selectedOptions={selectedOptions}
        />
        <Styles.SearchResultsTable>
          <Pagination
            items={searchResults}
            itemsInPage={20}
            itemsRenderer={result => (
              <Link
                searchResult={result}
                key={`${result._index} ${result._id}`}
              >
                <SearchResult result={result} />
              </Link>
            )}
          />
        </Styles.SearchResultsTable>
      </div>
    )
  );
}
