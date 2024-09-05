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
import { identity, meanBy, sortBy, uniq, zip } from "lodash";
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
import { Beenhere } from "@mui/icons-material";
import { searchResultToContentId } from "../../topbar/searchbar/searchResultsToContentIds";
import { Styles } from "./style";

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
  const savedFamiliars = useAppSelector(
    state => state.familiars.savedFamiliars
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

  const [isSavedFamiliarDictionary, setIsSavedFamiliarDictionary] = useState<
    Record<string, boolean>
  >({});

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

  useEffect(() => {
    const isSavedFamiliarsDict: Record<string, boolean> = {};
    [vocabulary, kanji, names]
      .filter(identity)
      .flat()
      .forEach(searchResult => {
        const { id } = searchResultToContentId(searchResult);
        isSavedFamiliarsDict[searchResult._index + searchResult._id] = Boolean(
          savedFamiliars[id]
        );
      });
    setIsSavedFamiliarDictionary(isSavedFamiliarsDict);
  }, [vocabulary, kanji, names, savedFamiliars]);

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
              <Styles.FlexTd>
                {isSavedFamiliarDictionary[kanji._index + kanji._id] ? (
                  <Beenhere
                    style={{
                      marginRight: 6,
                    }}
                  />
                ) : (
                  ""
                )}
                {kanji.kanji}
              </Styles.FlexTd>
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
              <Styles.FlexTd>
                {isSavedFamiliarDictionary[vocab._index + vocab._id] ? (
                  <Beenhere
                    style={{
                      marginRight: 6,
                    }}
                  />
                ) : (
                  ""
                )}
                <span>
                  {!highlightWordAtReferences
                    ? vocab.display.join(", ")
                    : highlightEntry(
                        vocab.display.join(", "),
                        firstLabelEntry,
                        vocabularyFilterText
                      )}
                </span>
                {vocab.jlpt ? (
                  <Badge
                    text={`N${vocab.jlpt}`}
                    textToColor={`${vocab.jlpt}`}
                  />
                ) : (
                  ""
                )}
              </Styles.FlexTd>
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
              <Styles.FlexTd>
                {isSavedFamiliarDictionary[name._index + name._id] ? (
                  <Beenhere
                    style={{
                      marginRight: 6,
                    }}
                  />
                ) : (
                  ""
                )}
                <span>
                  {!highlightWordAtReferences
                    ? name.n
                    : highlightEntry(name.n, firstLabelEntry, namesFilterText)}
                </span>
              </Styles.FlexTd>
              {/* <ruby>
                  {!highlightWordAtReferences
                    ? name.n
                    : highlightEntry(name.n, firstLabelEntry, namesFilterText)}
                  <rt>{name.r}</rt>
                </ruby> */}
              <td>{name.r}</td>
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
