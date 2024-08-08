import {
  Database,
  IndexName,
  IndexSearchResult,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useRef, useState } from "react";
import { ContentId } from "../contentId";
import { ContentReferences } from "../contentReferences/contentReferences";
import { Styles } from "../style";
import { TextReader } from "../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../utils/tts";
import { fontSizes } from "../../../theme";
import { InnerView } from "./innerView";
import { CopyButton } from "../../common/copyButton/copyButton";
import { SearchButton } from "../../common/searchButton/searchButton";
import { AddToListButton } from "../../common/addToListButton/addToListButton";
import { ListsToggleSave } from "../../common/listsToggleSave/listsToggleSave";

export function VocabularyView({
  contentId,
  previousContentIds,
  isDisplayed,
}: {
  contentId: ContentId & { type: "vocabulary" };
  previousContentIds: ContentId[];
  isDisplayed: boolean;
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
  const [showListsSaveToggle, setShowListsSaveToggle] =
    useState<boolean>(false);

  useEffect(() => {
    const vocabResult =
      Database.getById<IndexSearchResult<VocabularyDocument>>(contentId);
    setVocab(vocabResult);
  }, [contentId]);

  const display = vocab?.display?.join(", ");

  function onAddToListButtonClick() {
    setShowListsSaveToggle(!showListsSaveToggle);
  }

  return (
    vocab && (
      <InnerView isDisplayed={isDisplayed} focusOnArgsChange={[vocab]}>
        <Styles.Definitions>
          <Styles.Header>
            {display}
            <span>
              <CopyButton textToCopy={display} />
              <SearchButton textToSearch={display} />
              <AddToListButton
                onClick={onAddToListButtonClick}
                contentId={contentId}
              />
            </span>
          </Styles.Header>
          <div>
            {showListsSaveToggle ? (
              <ListsToggleSave contentId={contentId} />
            ) : (
              ""
            )}
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
                  tabIndex={0}
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
                    maxHeight: "400px",
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
        </Styles.Definitions>
        <ContentReferences
          contentId={contentId}
          indexNames={indexNames}
          previousContentIds={previousContentIds}
        />
      </InnerView>
    )
  );
}
