import {
  Database,
  IndexSearchResult,
  KanjiDocument,
} from "@davidbucodes/gengo-view-database";
import { range } from "lodash";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks";
import {
  openTab,
  setDraggedContent,
} from "../../../../../store/slices/tabsSlice";
import { Grid } from "../../../../common/grid/grid";
import { GridItemModel } from "../../../../common/grid/gridItem";
import { RadioGroup } from "../../../../common/radioGroup/radioGroup";
import { searchResultToContentId } from "../../../../topbar/searchbar/searchResultsToContentIds";
import { ContentId } from "../../../contentId";
import { Styles } from "../../../style";

export function SystemKanjiSearchView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  const dispatch = useAppDispatch();
  const [selectedStrokeCount, setSelectedStrokeCount] = useState<string>("1");

  const [kanjis, setKanjis] = useState(
    [] as IndexSearchResult<KanjiDocument>[]
  );

  useEffect(() => {
    (async () => {
      const results = await Database.indices.kanjiIndex.searchNumber(
        Number(selectedStrokeCount),
        "strokeCount"
      );
      console.log(results);

      setKanjis(results);
    })();
  }, [selectedStrokeCount]);

  function onGridItemClicked(contentId: ContentId) {
    dispatch(openTab(contentId));
  }

  function onGridItemDrag(contentId: ContentId) {
    dispatch(setDraggedContent(contentId));
  }

  const items: GridItemModel[] = kanjis.map(kanji => ({
    label: kanji.kanji,
    contentId: searchResultToContentId(kanji),
    onClick: onGridItemClicked,
    onDragStart: onGridItemDrag,
    tooltip: `${kanji.kanji}${kanji.jlpt ? " N" + kanji.jlpt : ""}\n${
      kanji.meaning?.[0] ? kanji.meaning?.[0] + "\n" : ""
    }${[kanji.kunReading?.[0], kanji.onReading?.[0]].filter(i => i).join(" ")}`,
  }));

  return (
    <Styles.InnerView>
      <Styles.Header>Kanji search</Styles.Header>
      <Styles.Line>Search Kanji by:</Styles.Line>
      <RadioGroup
        direction={"row"}
        onSelected={setSelectedStrokeCount}
        options={range(1, 35).map(i => i.toString())}
        selectedOption={selectedStrokeCount}
      />
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          height: 300,
        }}
      >
        <Grid items={items} />
      </div>
    </Styles.InnerView>
  );
}
