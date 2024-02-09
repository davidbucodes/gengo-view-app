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

export function KanjiView({
  contentId,
  previousContentIds,
}: {
  contentId: ContentId & { type: "kanji" };
  previousContentIds: ContentId[];
}) {
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

  return (
    kanji && (
      <Styles.InnerView>
        <Styles.Line style={{ float: "left", marginRight: 15 }}>
          <KanjiSvg kanji={kanji.kanji} />
        </Styles.Line>
        <Styles.Line>
          <b>{kanji.kanji}</b>
        </Styles.Line>
        <Styles.Line>
          <b>JLPT:</b> N{kanji.jlpt}
        </Styles.Line>
        {Boolean(kanji.kunReading?.length) && (
          <Styles.Line>
            <b>Kun:</b> {kanji.kunReading.join(", ")}{" "}
            {
              <TextReader
                language={TextVoiceLanguage.JA}
                textToRead={kanji.kunReading.join(", ")}
              />
            }
          </Styles.Line>
        )}
        {Boolean(kanji.onReading?.length) && (
          <Styles.Line>
            <b>On:</b> {kanji.onReading.join(", ")}{" "}
            {
              <TextReader
                language={TextVoiceLanguage.JA}
                textToRead={kanji.onReading.join(", ")}
              />
            }
          </Styles.Line>
        )}
        {Boolean(kanji.meaning?.length) && (
          <Styles.Line>
            <b>Meaning:</b> {kanji.meaning.join(", ")}
          </Styles.Line>
        )}

        <ContentReferences
          contentId={contentId}
          indexNames={indexNames}
          previousContentIds={previousContentIds}
        />
      </Styles.InnerView>
    )
  );
}
