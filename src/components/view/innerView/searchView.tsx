import {
  Database,
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { Loader } from "../../common/loader/loader";
import { ContentId } from "../contentId";
import { Styles } from "../style";

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

  useEffect(() => {
    if (contentId.id) {
      (async () => {
        const searchResults = await Database.termsIndices.searchText(
          contentId.id
        );
        setSearchResults(searchResults);
      })();
    }
  }, [contentId]);

  return (
    searchResults && (
      <div>
        <Styles.Header>Search: {contentId.id}</Styles.Header>
        <Loader isLoaded={Boolean(searchResults)}>
          Results count: {searchResults.length}
        </Loader>
      </div>
    )
  );
}
