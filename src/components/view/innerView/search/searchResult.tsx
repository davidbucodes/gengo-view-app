import {
  IndexSearchResult,
  KanjiDocument,
  VocabularyDocument,
  NameDocument,
  getReadableNameDocumentType,
} from "@davidbucodes/gengo-view-database";
import { Styles } from "./style";
import { SearchResultBadge } from "./searchResultBadge/searchResultBadge";

export function SearchResult({
  result,
}: {
  result:
    | IndexSearchResult<KanjiDocument>
    | IndexSearchResult<VocabularyDocument>
    | IndexSearchResult<NameDocument>;
}) {
  let header, body;
  let tags = [<SearchResultBadge text={result._index} key={result._index} />];

  if (result._index === "kanji") {
    const { kanji, jlpt, meaning, kunReading, onReading } =
      result as IndexSearchResult<KanjiDocument>;
    header = <>{kanji}</>;
    body = (
      <div>
        <div>
          {[kunReading?.join(", "), onReading?.join(", ")]
            .filter(i => i)
            .join(" | ")}
        </div>
        <div>{meaning?.join(", ")}</div>
      </div>
    );
    if (jlpt) {
      tags.push(
        <SearchResultBadge text={`N${String(jlpt)}`} key={`N${String(jlpt)}`} />
      );
    }
  } else if (result._index === "name") {
    const { n, r, t, d } = result as IndexSearchResult<NameDocument>;
    header = n;
    body = (
      <div style={{ textAlign: "left" }}>
        <div>
          {
            getReadableNameDocumentType(
              result as IndexSearchResult<NameDocument>
            ).t
          }{" "}
        </div>
        <div>
          {[r?.join(", "), d?.split("|").join(", ")].filter(i => i).join(" | ")}
        </div>
      </div>
    );
  } else if (result._index === "vocabulary") {
    const { display, reading, meaning, expl, jlpt } =
      result as IndexSearchResult<VocabularyDocument>;
    header = display?.join(", ");
    body = (
      <div style={{ textAlign: "left" }}>
        <div>{reading?.join(", ")}</div>
        <div>{meaning?.join(", ")}</div>
        <div>{expl?.join(", ")}</div>
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
