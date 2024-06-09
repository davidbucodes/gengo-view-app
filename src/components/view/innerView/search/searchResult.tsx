import {
  IndexSearchResult,
  KanjiDocument,
  VocabularyDocument,
  NameDocument,
  getReadableNameDocumentType,
} from "@davidbucodes/gengo-view-database";
import { Styles } from "./style";
import { SearchResultBadge } from "./searchResultBadge/searchResultBadge";
import { highlightEntry } from "../../../../utils/highlightEntry";
import { useAppSelector } from "../../../../store/hooks";

export function SearchResult({
  result,
  searchText,
  filterResultsText,
}: {
  result:
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>;
  searchText: string;
  filterResultsText?: string;
}) {
  let header, body;
  let tags = [<SearchResultBadge text={result._index} key={result._index} />];
  const highlightWordAtReferences = useAppSelector(
    state => state.config.highlightWordAtReferences
  );

  if (result._index === "kanji") {
    const { kanji, jlpt, meaning, kun, on } =
      result as IndexSearchResult<KanjiDocument>;
    header = !highlightWordAtReferences
      ? kanji
      : highlightEntry(kanji, searchText, filterResultsText);
    const readingDisplay = [kun?.join(", "), on?.join(", ")]
      .filter(i => i)
      .join(" | ");
    const meaningDisplay = meaning?.join(", ");
    body = (
      <div>
        <div>
          {!highlightWordAtReferences
            ? readingDisplay
            : highlightEntry(readingDisplay, searchText, filterResultsText)}
        </div>
        <div>
          {!highlightWordAtReferences
            ? meaningDisplay
            : highlightEntry(meaningDisplay, searchText, filterResultsText)}
        </div>
      </div>
    );
    if (jlpt) {
      tags.push(
        <SearchResultBadge text={`N${String(jlpt)}`} key={`N${String(jlpt)}`} />
      );
    }
  } else if (result._index === "name") {
    const { n, r, t, d } = result as IndexSearchResult<NameDocument>;
    header = !highlightWordAtReferences
      ? n
      : highlightEntry(n, searchText, filterResultsText);

    const readingDisplay = [r?.join(", "), d?.split("|").join(", ")]
      .filter(i => i)
      .join(" | ");
    const typeDisplay = getReadableNameDocumentType(
      result as IndexSearchResult<NameDocument>
    ).t?.replace("|", " |  ");
    body = (
      <div style={{ textAlign: "left" }}>
        <div>
          {!highlightWordAtReferences
            ? typeDisplay
            : highlightEntry(typeDisplay, searchText, filterResultsText)}
        </div>
        <div>
          {!highlightWordAtReferences
            ? readingDisplay
            : highlightEntry(readingDisplay, searchText, filterResultsText)}
        </div>
      </div>
    );
  } else if (result._index === "vocabulary") {
    const { display, reading, meaning, expl, jlpt } =
      result as IndexSearchResult<VocabularyDocument>;
    header = !highlightWordAtReferences
      ? display?.join(", ")
      : highlightEntry(display?.join(", "), searchText, filterResultsText);

    const readingDisplay = reading?.join(", ");
    const meaningDisplay = meaning?.join(", ");
    const explanationDisplay = expl?.join(", ");
    body = (
      <div style={{ textAlign: "left" }}>
        <div>
          {!highlightWordAtReferences
            ? readingDisplay
            : highlightEntry(readingDisplay, searchText, filterResultsText)}
        </div>
        <div>
          {!highlightWordAtReferences
            ? meaningDisplay
            : highlightEntry(meaningDisplay, searchText, filterResultsText)}
        </div>
        <div>
          {!highlightWordAtReferences
            ? explanationDisplay
            : highlightEntry(explanationDisplay, searchText, filterResultsText)}
        </div>
      </div>
    );
    if (jlpt) {
      tags.push(
        <SearchResultBadge text={`N${String(jlpt)}`} key={`N${String(jlpt)}`} />
      );
    }
  }

  return (
    <Styles.SearchResult>
      <Styles.SearchResultLine>
        <b>{header}</b>
        {tags}
      </Styles.SearchResultLine>
      <Styles.SearchResultLine>{body}</Styles.SearchResultLine>
    </Styles.SearchResult>
  );
}
