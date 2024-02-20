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
import { fontSizes } from "../../../theme";

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
              <ul
                style={{
                  // marginBlockStart: 0,
                  // marginBlockEnd: 0,
                  // paddingInlineStart: fontSizes.small,
                  // columns: 2,
                  // gap: fontSizes.giant,

                  // display: "grid",
                  // gridTemplateRows: "repeat(5, min-content)",
                  // gridAutoFlow: "column",
                  // gap: "1em",

                  // display: "grid",
                  // gridTemplateColumns: "repeat(3, max-content)",
                  // gridAutoFlow: "row",
                  // gap: "0 2em",

                  // display: "grid",
                  // gridTemplateColumns: "repeat(auto-fit, 207px)",
                  // gridAutoFlow: "row",
                  // gap: "0px 2em",
                  // flexGrow: "1",

                  // flexGrow: 1,
                  // display: "grid",
                  // gridTemplateColumns: "repeat(auto-fit, 30%)",
                  // gridAutoFlow: "row",
                  // gap: "0 2em",

                  // display: "flex",
                  // flexFlow: "wrap column",
                  // maxHeight: "150px",

                  marginBlockStart: 0,
                  marginBlockEnd: 0,
                  paddingInlineStart: fontSizes.small,
                  display: "flex",
                  flexFlow: "column wrap",
                  maxHeight: "265px",
                  gap: "0 30px",
                  overflow: "auto",
                  flexGrow: 0.5,
                }}
              >
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
