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
import { meanBy, sortBy, uniq, zip } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "../../common/link/link";
import { ContentId } from "../contentId";
import { Section } from "./section";
import { TextReader } from "../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../utils/tts";
import { useAppSelector } from "../../../store/hooks";
import { highlightEntry } from "../../../utils/highlightEntry";
import { SearchResultBadge } from "../innerView/search/searchResultBadge/searchResultBadge";
import { Badge } from "../../common/badge/badge";

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
  const highlightWordAtReferences = useAppSelector(
    state => state.config.highlightWordAtReferences
  );

  const [sentences, setSentences] =
    useState<IndexSearchResult<SentenceDocument>[]>(null);
  const [vocabulary, setVocabulary] =
    useState<IndexSearchResult<VocabularyDocument>[]>(null);
  const [names, setNames] = useState<IndexSearchResult<NameDocument>[]>(null);
  const [kanji, setKanji] = useState<IndexSearchResult<KanjiDocument>[]>(null);

  const [sentencesFilterText, setSentencesFilterText] = useState<string>();
  const [vocabularyFilterText, setVocabularyFilterText] = useState<string>();
  const [namesFilterText, setNamesFilterText] = useState<string>();

  const firstLabelEntry = contentId.label?.split(",")[0];

  useEffect(() => {
    if (indexNames.includes("sentence")) {
      (async () => {
        let sentencesResult = await Database.indices.sentenceIndex.searchText(
          firstLabelEntry
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
          await Database.indices.vocabularyIndex.searchText(firstLabelEntry);

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
          sortBy(
            sortBy(vocabularyResult, vocab => meanBy(vocab.display, "length")),
            vocab => -vocab.jlpt
          )
        );
      })();
    }
  }, [contentId, indexNames, vocabularyFilterText]);

  useEffect(() => {
    if (indexNames.includes("name")) {
      (async () => {
        let nameResult = await Database.indices.nameIndex.searchText(
          firstLabelEntry
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
    <div
      style={{
        marginBottom: 10,
      }}
    >
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
              <td>
                {!highlightWordAtReferences
                  ? vocab.display.join(", ")
                  : highlightEntry(
                      vocab.display.join(", "),
                      firstLabelEntry,
                      vocabularyFilterText
                    )}
                {vocab.jlpt ? (
                  <Badge
                    text={`N${vocab.jlpt}`}
                    textToColor={`${vocab.jlpt}`}
                  />
                ) : (
                  ""
                )}
              </td>
              <td>
                {!highlightWordAtReferences
                  ? vocab.reading.join(", ")
                  : highlightEntry(
                      vocab.reading.join(", "),
                      firstLabelEntry,
                      vocabularyFilterText
                    )}
              </td>
              <td>
                {!highlightWordAtReferences
                  ? vocab.meaning.join(", ")
                  : highlightEntry(
                      vocab.meaning.join(", "),
                      firstLabelEntry,
                      vocabularyFilterText
                    )}
              </td>
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
                <div>
                  {!highlightWordAtReferences
                    ? sentence.j
                    : highlightEntry(
                        sentence.j,
                        firstLabelEntry,
                        sentencesFilterText
                      )}
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
                        firstLabelEntry,
                        sentencesFilterText
                      )}{" "}
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
                  {!highlightWordAtReferences
                    ? name.n
                    : highlightEntry(name.n, firstLabelEntry, namesFilterText)}
                  <rt>{name.r}</rt>
                </ruby>
              </td>
              <td>
                {!highlightWordAtReferences
                  ? name.d
                  : highlightEntry(name.d, firstLabelEntry, namesFilterText)}
              </td>
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
