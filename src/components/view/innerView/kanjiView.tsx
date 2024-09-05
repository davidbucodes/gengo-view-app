// import { kanjis } from "../../database/kanji/kanjiDatabase";
import {
  Database,
  IndexName,
  IndexSearchResult,
  KanjiDocument,
} from "@davidbucodes/gengo-view-database";
import { useEffect, useState } from "react";
import { KanjiSvg } from "../../common/svg/svg";
import { ContentId } from "../contentId";
import { ContentReferences } from "../contentReferences/contentReferences";
import { Styles } from "../style";
import { TextReader } from "../../common/textReader/textReader";
import { TextVoiceLanguage } from "../../../utils/tts";
import { InnerView } from "./innerView";
import { useAppSelector } from "../../../store/hooks";
import { DropdownSelect } from "../../common/dropdownSelect/dropdownSelect";
import { CopyButton } from "../../common/copyButton/copyButton";
import { ListsToggleSave } from "../../common/listsToggleSave/listsToggleSave";
import { AddToListButton } from "../../common/addToListButton/addToListButton";
import { SearchButton } from "../../common/searchButton/searchButton";
import { AddToFamiliarsButton } from "../../common/addToFamiliarsButton/addToFamiliarsButton";

export function KanjiView({
  contentId,
  previousContentIds,
  isDisplayed,
}: {
  contentId: ContentId & { type: "kanji" };
  previousContentIds: ContentId[];
  isDisplayed: boolean;
}) {
  const [showListsSaveToggle, setShowListsSaveToggle] =
    useState<boolean>(false);
  const shouldShowKanjiPinyin = useAppSelector(state => {
    return state.config.showKanjiPinyin;
  });
  const [kanji, setKanji] = useState(null as IndexSearchResult<KanjiDocument>);
  const [indexNames] = useState<IndexName[]>([
    "sentence",
    "vocabulary",
    "name",
    "kanji",
  ]);

  useEffect(() => {
    const kanjiResult =
      Database.getById<IndexSearchResult<KanjiDocument>>(contentId);
    setKanji(kanjiResult);
  }, [contentId]);

  function onAddToListButtonClick() {
    setShowListsSaveToggle(!showListsSaveToggle);
  }

  return (
    kanji && (
      <InnerView isDisplayed={isDisplayed} focusOnArgsChange={[kanji]}>
        <Styles.Definitions>
          <Styles.Line style={{ float: "left", marginRight: 10 }}>
            <KanjiSvg kanji={kanji.kanji} />
          </Styles.Line>
          <Styles.Header style={{ marginTop: 10 }}>
            <b>{kanji.kanji}</b>
            <span>
              <CopyButton textToCopy={kanji.kanji} />
              <SearchButton textToSearch={kanji.kanji} />
              <AddToFamiliarsButton contentId={contentId} />
              <AddToListButton
                onClick={onAddToListButtonClick}
                contentId={contentId}
              />
            </span>
          </Styles.Header>

          {showListsSaveToggle ? <ListsToggleSave contentId={contentId} /> : ""}
          {Boolean(kanji.jlpt) && (
            <Styles.Line>
              <b>JLPT:</b> N{kanji.jlpt}
            </Styles.Line>
          )}
          {Boolean(kanji.kun?.length) && (
            <Styles.Line>
              <b>Kun:</b> {kanji.kun.join(", ")}{" "}
              <TextReader
                language={TextVoiceLanguage.JA}
                textToRead={kanji.kun.join(", ")}
              />
            </Styles.Line>
          )}
          {Boolean(kanji.on?.length) && (
            <Styles.Line>
              <b>On:</b> {kanji.on.join(", ")}{" "}
              {
                <TextReader
                  language={TextVoiceLanguage.JA}
                  textToRead={kanji.on.join(", ")}
                />
              }
            </Styles.Line>
          )}
          {Boolean(kanji.pinyin?.length) && shouldShowKanjiPinyin && (
            <Styles.Line>
              <b>Pinyin:</b> {kanji.pinyin.join(", ")}{" "}
              {
                <TextReader
                  language={TextVoiceLanguage.CH}
                  textToRead={kanji.pinyin.join(", ")}
                />
              }
            </Styles.Line>
          )}
          {Boolean(kanji.meaning?.length) && (
            <Styles.Line>
              <b>Meaning:</b> {kanji.meaning.join(", ")}
            </Styles.Line>
          )}
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
