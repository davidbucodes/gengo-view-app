import {
  IndexSearchResult,
  Jlpt,
  VocabularyDocument,
} from "@davidbucodes/gengo-view-database";
import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { openTab, setDraggedContent } from "../../../store/slices/tabsSlice";
import { Grid } from "../../common/grid/grid";
import { GridItemModel } from "../../common/grid/gridItem";
import { searchResultToContentId } from "../../topbar/searchbar/searchResultsToContentIds";
import { ContentId } from "../contentId";

export const LevelVocabularyView = memo(function LevelVocabularyView({
  contentId,
}: {
  contentId: ContentId & { type: "level_vocabulary" };
}) {
  const dispatch = useAppDispatch();

  const [vocabularies, setVocabularies] = useState(
    [] as IndexSearchResult<VocabularyDocument>[]
  );

  useEffect(() => {
    if (contentId?.id) {
      const results = Jlpt.vocabulary(contentId.id);
      setVocabularies(results);
    }
  }, [contentId]);

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab(contentId));
  }

  function onGridItemDrag(contentId: ContentId) {
    dispatch(setDraggedContent(contentId));
  }

  const items: GridItemModel[] = vocabularies.map(vocabulary => ({
    label: vocabulary.display?.join?.(", "),
    contentId: searchResultToContentId(vocabulary),
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
    tooltip: `${vocabulary.display?.[0]} ${vocabulary.jlpt}\n${vocabulary.meaning?.[0]}\n${vocabulary.reading?.[0]}`,
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
