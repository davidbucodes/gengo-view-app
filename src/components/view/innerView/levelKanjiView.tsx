import {
  IndexSearchResult,
  Jlpt,
  KanjiDocument,
} from "@davidbucodes/gengo-view-database";
import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { openTab, setDraggedContent } from "../../../store/slices/tabsSlice";
import { Grid } from "../../common/grid/grid";
import { GridItemModel } from "../../common/grid/gridItem";
import { searchResultToContentId } from "../../topbar/searchbar/searchResultsToContentIds";
import { ContentId } from "../contentId";
import { InnerView } from "./innerView";

export const LevelKanjiView = memo(function LevelKanjiView({
  contentId,
}: {
  contentId: ContentId & { type: "level_kanji" };
}) {
  const dispatch = useAppDispatch();

  const [kanjis, setKanjis] = useState(
    [] as IndexSearchResult<KanjiDocument>[]
  );

  useEffect(() => {
    if (contentId?.id) {
      const results = Jlpt.kanji(contentId.id);
      setKanjis(results);
    }
  }, [contentId]);

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab({ contentId: contentId }));
  }

  function onGridItemDrag(contentId: ContentId) {
    dispatch(setDraggedContent(contentId));
  }

  const items: GridItemModel[] = kanjis.map(kanji => ({
    label: kanji.kanji,
    value: searchResultToContentId(kanji),
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
    tooltip: `${kanji.kanji} ${kanji.jlpt}\n${kanji.meaning[0]}\n${[
      kanji.kun?.[0],
      kanji.on?.[0],
    ]
      .filter(i => i)
      .join(" ")}`,
  }));
  return (
    contentId?.id && (
      <div
        style={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Grid items={items} />
      </div>
    )
  );
});
