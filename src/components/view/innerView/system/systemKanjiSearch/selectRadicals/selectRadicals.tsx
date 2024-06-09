import React, { useEffect, useState } from "react";
import { Styles } from "./style";
import { Grid } from "../../../../../common/grid/grid";
import {
  Database,
  IndexSearchResult,
  KanjiDocument,
} from "@davidbucodes/gengo-view-database";
import { identity, mean, min, uniq } from "lodash";
import { ContentId } from "../../../../contentId";

const noDataRadicalsToStorkeCount: Record<string, number> = {
  "｜": 1,
  ノ: 1,
  ヨ: 3,
  ユ: 2,
  ハ: 2,
  マ: 2,
};

export const SelectRadicals = React.memo(function SelectRadicals({
  onRadicalClick,
}: {
  onRadicalClick?: (radical: string) => void;
}): JSX.Element {
  const [radicalsByStrokeCount, setRadicalsByStrokeCount] = useState<
    Record<number, IndexSearchResult<KanjiDocument>[]>
  >([]);

  useEffect(() => {
    (async () => {
      const uniqRadicals = uniq(
        await Database.indices.kanjiIndex.documents.flatMap(
          doc => doc.radicals || []
        )
      );

      const radicalsByStrokeCount = uniqRadicals
        .map((radical): IndexSearchResult<KanjiDocument> => {
          const docId = Database.kanjiToId[radical];
          const doc = Database.indices.kanjiIndex.get(docId);
          if (!doc._id) {
            console.log(radical, "no data");
            const strokeCount = noDataRadicalsToStorkeCount[radical];
            if (!strokeCount) {
              console.log(radical, "NO STROKE COUNT");
            }

            return {
              _id: 0,
              _index: "kanji",
              kanji: radical,
              strokeCount: [strokeCount || 1],
            };
          }
          return doc;
        })
        .reduce((reducer, doc) => {
          const minStrokeCount = min(doc.strokeCount || [1]).toString();
          reducer[minStrokeCount] ||= [];
          reducer[minStrokeCount].push(doc);
          return reducer;
        }, {} as Record<string, IndexSearchResult<KanjiDocument>[]>);

      setRadicalsByStrokeCount(radicalsByStrokeCount);
    })();
  }, []);

  return (
    <Styles.SelectRadicals>
      <Grid
        items={Object.entries(radicalsByStrokeCount).flatMap(
          ([strokeCount, radicals]) => {
            return [
              {
                value: strokeCount,
                label: strokeCount,
                onClick: () => {},
                onDragStart: () => {},
                separator: true,
                tooltip: strokeCount + " stroke count",
              },
              ...radicals.map(radical => ({
                value: radical.kanji,
                label: radical.kanji,
                onClick: () => onRadicalClick(radical.kanji),
                onDragStart: () => {},
              })),
            ];
          }
        )}
      />
    </Styles.SelectRadicals>
  );
});
