import {
  Database,
  IndexName,
  IndexSearchResult,
  SentenceDocument,
  VocabularyDocument,
} from "@gengo-view/database";
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

  useEffect(() => {
    if (indexNames.includes("sentence")) {
      (async () => {
        const sentencesResult = await Database.indices.sentenceIndex.searchText(
          contentId.label
        );
        setSentences(sentencesResult);
      })();
    }
    if (indexNames.includes("vocabulary")) {
      (async () => {
        const vocabularyResult =
          await Database.indices.vocabularyIndex.searchText(contentId.label);
        setVocabulary(vocabularyResult);
      })();
    }
  }, [contentId, indexNames]);

  return (
    <div>
      {vocabulary && (
        <Section
          title={indexNameToTitle["vocabulary"]}
          items={vocabulary}
          itemsRenderer={vocab => (
            <li key={vocab._id}>
              <ruby>
                {vocab.display.join(", ")}
                <rt>{vocab.reading.join(", ")}</rt>
              </ruby>
              : {vocab.meaning.join(", ")}
            </li>
          )}
          itemsCountAtPage={10}
        />
      )}
      {sentences && (
        <Section
          title={indexNameToTitle["sentence"]}
          items={sentences}
          itemsRenderer={sentence => (
            <li key={sentence._id}>
              <ruby>
                {sentence.j}
                <rt>{sentence.e}</rt>
              </ruby>
            </li>
          )}
          itemsCountAtPage={10}
        />
      )}
    </div>
  );
}
