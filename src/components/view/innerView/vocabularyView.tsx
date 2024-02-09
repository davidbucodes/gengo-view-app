import {
  Database,
  IndexName,
  IndexSearchResult,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { ContentId } from "../contentId";
import { ContentReferences } from "../contentReferences/contentReferences";
import { Styles } from "../style";
import { TextReader } from "../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../utils/tts";

export function VocabularyView({
  contentId,
  previousContentIds,
}: {
  contentId: ContentId & { type: "vocabulary" };
  previousContentIds: ContentId[];
}) {
  const [vocab, setVocab] = useState(
    null as IndexSearchResult<VocabularyDocument>
  );
  const [indexNames] = useState<IndexName[]>([
    "sentence",
    "vocabulary",
    "name",
    "kanji",
  ]);

  useEffect(() => {
    const vocabResult =
      Database.getById<IndexSearchResult<VocabularyDocument>>(contentId);
    setVocab(vocabResult);
  }, [contentId]);

  return (
    vocab && (
      <Styles.InnerView>
        <Styles.Header>{vocab.display.join(", ")}</Styles.Header>
        <div>
          {Boolean(vocab.jlpt) && (
            <Styles.Line>
              <b>JLPT:</b>
              {vocab.jlpt}
            </Styles.Line>
          )}
          {Boolean(vocab.reading.length) && (
            <Styles.Line>
              <b>Reading:</b> {vocab.reading.join(", ")}{" "}
              {
                <TextReader
                  language={TextVoiceLanguage.JA}
                  textToRead={vocab.reading.join(", ")}
                />
              }
            </Styles.Line>
          )}
          {Boolean(vocab.expl.length) && (
            <Styles.Line>
              <b>Explanation:</b> {vocab.expl.join(", ")}
            </Styles.Line>
          )}
          {Boolean(vocab.meaning) && (
            <Styles.Line>
              <b>Meaning:</b>{" "}
              <ul>
                {vocab.meaning.map((m, index) => (
                  <li key={m + "" + index}>{m}</li>
                ))}
              </ul>
            </Styles.Line>
          )}
        </div>

        <ContentReferences
          contentId={contentId}
          indexNames={indexNames}
          previousContentIds={previousContentIds}
        />
      </Styles.InnerView>
    )
  );
}
