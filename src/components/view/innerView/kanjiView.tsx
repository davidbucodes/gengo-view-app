// import { kanjis } from "../../database/kanji/kanjiDatabase";
import {
  Database,
  IndexSearchResult,
  KanjiDocument,
} from "@gengo-view/database";
import { useEffect, useState } from "react";
import { KanjiSvg } from "../../common/svg/svg";
import { ContentId } from "../contentId";
import { ContentReferences } from "../contentReferences/contentReferences";
import { Styles } from "../style";

export function KanjiView({
  contentId,
}: {
  contentId: ContentId & { type: "kanji" };
}) {
  const [kanji, setKanji] = useState(null as IndexSearchResult<KanjiDocument>);

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
        <Styles.Line>
          <b>Kun:</b> {kanji.kunReading?.join(", ")}
        </Styles.Line>
        <Styles.Line>
          <b>On:</b> {kanji.onReading?.join(", ")}
        </Styles.Line>
        <Styles.Line>
          <b>Meaning:</b> {kanji.meaning?.join(", ")}
        </Styles.Line>

        <ContentReferences
          contentId={contentId}
          indexNames={["sentence", "vocabulary"]}
        />
      </Styles.InnerView>
    )
  );
}
