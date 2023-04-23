import { Database, IndexName } from "@gengo-view/database";
import { uniq } from "lodash";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { Button } from "../../../common/button/button";
import { CheckboxGroup } from "../../../common/checkboxGroup/checkboxGroup";
import { RadioGroup } from "../../../common/radioGroup/radioGroup";
import { ContentId } from "../../contentId";
import { Styles } from "../../style";

export function SystemExportView({
  contentId,
}: {
  contentId: ContentId & { type: "system" };
}) {
  const tabGroups = useAppSelector(state => state.tabs.tabGroups);
  const tabTypes = ["kanji", "name", "vocabulary"] as IndexName[];

  const [selectedTabType, setSelectedTabType] = useState<IndexName>("kanji");
  const [exportableCsv, setExportableCsv] = useState<string>("");

  const [exportableTabs, setExportableTabs] = useState<
    Record<string, unknown>[]
  >([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const exportableTabs = Object.values(tabGroups).reduce(
      (reducer, tabGroup) => {
        const exportables = tabGroup.openTabs
          .filter(tab => tab.content.type === selectedTabType)
          .map(tab => ({
            ...Database.getById<{}>(
              tab.content as ContentId & { type: IndexName }
            ),
            tabGroupId: tabGroup.id,
          }));

        reducer.push(...exportables);
        return reducer;
      },
      []
    );

    const columns = uniq(exportableTabs.map(tab => Object.keys(tab)).flat());
    setExportableTabs(exportableTabs);
    setColumns(columns);
    setSelectedColumns(columns.filter(column => !column.startsWith("_")));
  }, [JSON.stringify(tabGroups), selectedTabType]);

  useEffect(() => {
    const exportableCsv =
      selectedColumns.join(",") +
      "\n" +
      exportableTabs
        .map(tab =>
          selectedColumns
            .map(
              column =>
                (tab[column] || "").toString().replaceAll(",", ";") || ""
            )
            .join(",")
        )
        .join("\n");

    setExportableCsv(exportableCsv);
  }, [selectedColumns, exportableTabs]);

  return (
    contentId && (
      <div>
        <Styles.Header>Export</Styles.Header>
        <Styles.Line>Tabs type to export:</Styles.Line>
        <Styles.Line>
          <RadioGroup<IndexName>
            selectedOption={selectedTabType}
            options={tabTypes}
            onSelected={setSelectedTabType}
          />
        </Styles.Line>

        <Styles.Line>Columns to export:</Styles.Line>
        <Styles.Line>
          <CheckboxGroup
            options={columns}
            selectedOptions={selectedColumns}
            onChange={setSelectedColumns}
          />
        </Styles.Line>

        <Styles.Line>CSV preview:</Styles.Line>
        <Styles.CSVPreview>{exportableCsv}</Styles.CSVPreview>
        <Button
          onClick={() => {
            const BOM = "\uFEFF";
            const blob = new Blob([BOM + exportableCsv], {
              type: "text/csv;charset=utf-8",
            });

            const url = window.URL.createObjectURL(blob);
            const linkElem = document.createElement("a");
            linkElem.href = url;
            linkElem.download = selectedTabType;
            linkElem.click();
          }}
        >
          Save CSV
        </Button>
      </div>
    )
  );
}
