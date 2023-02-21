// import { kanjis } from "../../database/kanji/kanjiDatabase";
import {
  Database,
  IndexSearchResult,
  KanjiDocument,
  SentenceDocument,
} from "@gengo-view/database";
import { useEffect, useState } from "react";
import { KanjiSvg } from "../../common/svg/svg";
import { ContentId } from "../contentId";
import { Styles } from "../style";

export function KanjiView({
  contentId,
}: {
  contentId: ContentId & { type: "kanji" };
}) {
  const [kanji, setKanji] = useState(null as IndexSearchResult<KanjiDocument>);
  const [sentences, setSentences] = useState(
    [] as IndexSearchResult<SentenceDocument>[]
  );
  useEffect(() => {
    if (contentId.dbIndex === "kanji") {
      const kanjiResult = Database.indices.kanjiIndex.get(contentId.dbId);
      setKanji(kanjiResult);
      (async () => {
        const sentencesResult = await Database.indices.sentenceIndex.searchText(
          kanjiResult.kanji
        );
        setSentences(sentencesResult);
      })();
    }
  }, [contentId]);

  return (
    kanji && (
      <div>
        <Styles.Line style={{ float: "left", marginRight: 15 }}>
          <KanjiSvg kanji={kanji.kanji} />
        </Styles.Line>
        <Styles.Line>
          <b>{kanji.kanji}</b>
        </Styles.Line>
        <Styles.Line>
          <b>JLPT:</b> N{kanji.jlpt}
        </Styles.Line>
        <Styles.Line>
          <b>Kun:</b> {kanji.kunReading?.join(", ")}
        </Styles.Line>
        <Styles.Line>
          <b>On:</b> {kanji.onReading?.join(", ")}
        </Styles.Line>
        <Styles.Line>
          <b>Meaning:</b> {kanji.meaning?.join(", ")}
        </Styles.Line>
        <Styles.Line>
          {sentences.slice(0, 20).map(sentence => (
            <li key={sentence._id}>{sentence.j}</li>
          ))}
        </Styles.Line>
      </div>
    )
  );
}
