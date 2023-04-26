import {
  Database,
  IndexName,
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  SentenceDocument,
  VocabularyDocument,
  isKanjiRegexp,
} from "@gengo-view/database";
import { meanBy, sortBy, uniq } from "lodash";
import { useEffect, useState } from "react";
import { ContentId } from "../contentId";
import { Section } from "./section";

const indexNameToTitle: Record<IndexName, string> = {
  name: "Names",
  vocabulary: "Vocabulary",
  kanji: "Kanji",
  sentence: "Sentences",
};
export function ContentReferences({
  contentId,
  indexNames,
}: {
  contentId: ContentId;
  indexNames: IndexName[];
}) {
  const [sentences, setSentences] =
    useState<IndexSearchResult<SentenceDocument>[]>(null);
  const [vocabulary, setVocabulary] =
    useState<IndexSearchResult<VocabularyDocument>[]>(null);
  const [names, setNames] = useState<IndexSearchResult<NameDocument>[]>(null);
  const [kanji, setKanji] = useState<IndexSearchResult<KanjiDocument>[]>(null);

  useEffect(() => {
    if (indexNames.includes("kanji")) {
      (async () => {
        const kanjis = uniq([...contentId.label.match(isKanjiRegexp)]);
        setKanji(
          kanjis.map(kanji => {
            const kanjiId = Database.kanjiToId[kanji];
            if (Number.isInteger(kanjiId)) {
              return Database.indices.kanjiIndex.get(kanjiId);
            }
          })
        );
      })();
    }
    if (indexNames.includes("sentence")) {
      (async () => {
        const sentencesResult = await Database.indices.sentenceIndex.searchText(
          contentId.label?.split(",")[0]
        );
        setSentences(sentencesResult);
      })();
    }
    if (indexNames.includes("vocabulary")) {
      (async () => {
        const vocabularyResult =
          await Database.indices.vocabularyIndex.searchText(
            contentId.label?.split(",")[0]
          );
        setVocabulary(
          sortBy(vocabularyResult, vocab => meanBy(vocab.display, "length"))
        );
      })();
    }
    if (indexNames.includes("name")) {
      (async () => {
        const nameResult = await Database.indices.nameIndex.searchText(
          contentId.label?.split(",")[0]
        );
        setNames(sortBy(nameResult, name => name.n.length));
      })();
    }
  }, [contentId, indexNames]);

  return (
    <div>
      {kanji && (
        <Section
          title={indexNameToTitle["kanji"]}
          items={kanji}
          itemsRenderer={kanji => (
            <tr key={kanji._id}>
              <td>{kanji.kanji}</td>
              <td>{kanji.meaning ? kanji.meaning?.join(", ") : ""}</td>
            </tr>
          )}
          itemsCountAtPage={10}
        />
      )}
      {vocabulary && (
        <Section
          title={indexNameToTitle["vocabulary"]}
          items={vocabulary}
          itemsRenderer={vocab => (
            <tr key={vocab._id}>
              <td>
                <ruby>
                  {vocab.display.join(", ")}
                  <rt>{vocab.reading.join(", ")}</rt>
                </ruby>
              </td>
              <td>{vocab.meaning.join(", ")}</td>
            </tr>
          )}
          itemsCountAtPage={10}
        />
      )}
      {sentences && (
        <Section
          title={indexNameToTitle["sentence"]}
          items={sentences}
          itemsRenderer={sentence => (
            <tr key={sentence._id}>
              <td>
                <ruby>
                  {sentence.j}
                  <rt>{sentence.e}</rt>
                </ruby>
              </td>
            </tr>
          )}
          itemsCountAtPage={10}
        />
      )}
      {names && (
        <Section
          title={indexNameToTitle["name"]}
          items={names}
          itemsRenderer={name => (
            <tr key={name._id}>
              <td>
                <ruby>
                  {name.n}
                  <rt>{name.r}</rt>
                </ruby>
              </td>
              <td>{name.d}</td>
            </tr>
          )}
          itemsCountAtPage={10}
        />
      )}
    </div>
  );
}
