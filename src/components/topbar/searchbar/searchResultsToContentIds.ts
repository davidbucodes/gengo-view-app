import {
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { ContentId } from "../../view/contentId";

export function searchResultToContentId(
  searchResult:
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>
): ContentId {
  switch (searchResult._index) {
    case "kanji": {
      return {
        id: (searchResult as KanjiDocument).kanji + searchResult._id,
        type: searchResult._index,
        label: (searchResult as KanjiDocument).kanji,
        dbId: searchResult._id,
        dbIndex: searchResult._index,
      } as ContentId;
    }
    case "name": {
      return {
        id: (searchResult as NameDocument).n + searchResult._id,
        type: searchResult._index,
        label: (searchResult as NameDocument).n,
        dbId: searchResult._id,
        dbIndex: searchResult._index,
      } as ContentId;
    }
    case "vocabulary": {
      return {
        id:
          (searchResult as VocabularyDocument).display.join(",") +
          searchResult._id,
        type: searchResult._index,
        label: (searchResult as VocabularyDocument).display.join(","),
        dbId: searchResult._id,
        dbIndex: searchResult._index,
      } as ContentId;
    }
  }
}

export function searchResultsToContentIds(
  searchResults: (
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>
  )[]
): ContentId[] {
  return searchResults.map(searchResultToContentId);
}
