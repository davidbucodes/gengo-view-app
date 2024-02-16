import {
  Database,
  IndexName,
  IndexSearchResult,
  KanjiDocument,
  NameDocument,
  SentenceDocument,
  VocabularyDocument,
  isKanjiRegexp,
} from "@davidbucodes/gengo-view-database";
import { meanBy, sortBy, uniq } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "../../common/link/link";
import { ContentId } from "../contentId";
import { Section } from "./section";
import { TextReader } from "../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../utils/tts";

const indexNameToTitle: Record<IndexName, string> = {
  name: "Names",
  vocabulary: "Vocabulary",
  kanji: "Kanji",
  sentence: "Sentences",
};
export function ContentReferences({
  contentId,
  indexNames,
  previousContentIds,
}: {
  contentId: ContentId;
  indexNames: IndexName[];
  previousContentIds: ContentId[];
}) {
  const [sentences, setSentences] =
    useState<IndexSearchResult<SentenceDocument>[]>(null);
  const [vocabulary, setVocabulary] =
    useState<IndexSearchResult<VocabularyDocument>[]>(null);
  const [names, setNames] = useState<IndexSearchResult<NameDocument>[]>(null);
  const [kanji, setKanji] = useState<IndexSearchResult<KanjiDocument>[]>(null);

  const [sentencesFilterText, setSentencesFilterText] = useState<string>();
  const [vocabularyFilterText, setVocabularyFilterText] = useState<string>();
  const [namesFilterText, setNamesFilterText] = useState<string>();

  useEffect(() => {
    if (indexNames.includes("sentence")) {
      (async () => {
        let sentencesResult = await Database.indices.sentenceIndex.searchText(
          contentId.label?.split(",")[0]
        );
        if (sentencesFilterText) {
          sentencesResult = await Database.indices.sentenceIndex.searchText(
            sentencesFilterText,
            {
              documents: sentencesResult,
              english: true,
              japanese: true,
              scorePenalty: 0,
            }
          );
        }
        setSentences(sentencesResult);
      })();
    }
  }, [contentId, indexNames, sentencesFilterText]);

  useEffect(() => {
    if (indexNames.includes("vocabulary")) {
      (async () => {
        let vocabularyResult =
          await Database.indices.vocabularyIndex.searchText(
            contentId.label?.split(",")[0]
          );

        if (vocabularyFilterText) {
          vocabularyResult = await Database.indices.vocabularyIndex.searchText(
            vocabularyFilterText,
            {
              documents: vocabularyResult,
              english: true,
              japanese: true,
              scorePenalty: 0,
            }
          );
        }
        setVocabulary(
          sortBy(vocabularyResult, vocab => meanBy(vocab.display, "length"))
        );
      })();
    }
  }, [contentId, indexNames, vocabularyFilterText]);

  useEffect(() => {
    if (indexNames.includes("name")) {
      (async () => {
        let nameResult = await Database.indices.nameIndex.searchText(
          contentId.label?.split(",")[0]
        );

        if (namesFilterText) {
          nameResult = await Database.indices.nameIndex.searchText(
            namesFilterText,
            {
              documents: nameResult,
              english: true,
              japanese: true,
              scorePenalty: 0,
            }
          );
        }
        setNames(sortBy(nameResult, name => name.n.length));
      })();
    }
  }, [contentId, indexNames, namesFilterText]);

  useEffect(() => {
    if (indexNames.includes("kanji")) {
      (async () => {
        let kanjis = uniq([...(contentId?.label?.match(isKanjiRegexp) || [])]);

        setKanji(
          kanjis
            .map(kanji => {
              const kanjiId = Database.kanjiToId[kanji];
              if (Number.isInteger(kanjiId)) {
                return Database.indices.kanjiIndex.get(kanjiId);
              }
            })
            .filter(kanji => kanji)
        );
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
            <Link
              searchResult={kanji}
              key={kanji._id}
              previousContentIds={previousContentIds}
              useTrElement
            >
              <td>{kanji.kanji}</td>
              <td>{kanji.meaning ? kanji.meaning?.join(", ") : ""}</td>
            </Link>
          )}
          itemsCountAtPage={10}
        />
      )}
      {vocabulary && (
        <Section
          title={indexNameToTitle["vocabulary"]}
          items={vocabulary}
          itemsRenderer={vocab => (
            <Link
              searchResult={vocab}
              key={vocab._id}
              previousContentIds={previousContentIds}
              useTrElement
            >
              <td>{vocab.display.join(", ")}</td>
              <td>{vocab.reading.join(", ")}</td>
              <td>{vocab.meaning.join(", ")}</td>
            </Link>
          )}
          itemsCountAtPage={10}
          onTextFilterInputChange={filterText => {
            setVocabularyFilterText(filterText);
          }}
        />
      )}
      {sentences && (
        <Section
          title={indexNameToTitle["sentence"]}
          items={sentences}
          itemsRenderer={sentence => (
            <tr key={sentence._id}>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {sentence.j}
                  <TextReader
                    language={TextVoiceLanguage.JA}
                    textToRead={sentence.j}
                  />
                </div>
                <div>
                  {sentence.e}{" "}
                  <TextReader
                    language={TextVoiceLanguage.EN}
                    textToRead={sentence.e}
                  />
                </div>
              </td>
            </tr>
          )}
          itemsCountAtPage={10}
          onTextFilterInputChange={filterText => {
            setSentencesFilterText(filterText);
          }}
        />
      )}
      {names && (
        <Section
          title={indexNameToTitle["name"]}
          items={names}
          itemsRenderer={name => (
            <Link
              searchResult={name}
              key={name._id}
              previousContentIds={previousContentIds}
              useTrElement
            >
              <td>
                <ruby>
                  {name.n}
                  <rt>{name.r}</rt>
                </ruby>
              </td>
              <td>{name.d}</td>
            </Link>
          )}
          itemsCountAtPage={10}
          onTextFilterInputChange={filterText => {
            setNamesFilterText(filterText);
          }}
        />
      )}
    </div>
  );
}
