import { Database, IndexName } from "@davidbucodes/gengo-view-database";
import { uniq } from "lodash";
import { useEffect, useRef, useState } from "react";
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
  const date = new Date().toLocaleString().split(",")[0];
  const [csvFilename, setCsvFilename] = useState<string>(
    `${date} ${selectedTabType}`
  );
  const [isCsvFilenameDirty, setIsCsvFilenameDirty] = useState<boolean>(false);
  const [exportableCsv, setExportableCsv] = useState<string>("");

  useEffect(() => {
    const date = new Date().toLocaleString().split(",")[0];
    if (!isCsvFilenameDirty) {
      setCsvFilename(`${date} ${selectedTabType}`);
    }
  }, [selectedTabType]);

  const [exportableTabs, setExportableTabs] = useState<
    Record<string, unknown>[]
  >([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const csvRef = useRef<HTMLPreElement>();

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
            .map(column => {
              const content = tab[column];
              if (Array.isArray(content)) {
                return `"${content.join("\n")}"`;
              }
              return (content || "").toString().replaceAll(",", " | ") || "";
            })
            .join(",")
        )
        .join("\n");

    setExportableCsv(exportableCsv);
  }, [selectedColumns, exportableTabs]);

  const copyCsv = () => {
    navigator.clipboard.writeText(csvRef.current?.innerText);
  };

  const selectCsv = () => {
    var range = document.createRange();
    range.selectNodeContents(csvRef.current);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const saveCsv = () => {
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + exportableCsv], {
      type: "text/csv;charset=utf-8",
    });

    const url = window.URL.createObjectURL(blob);
    const linkElem = document.createElement("a");
    linkElem.href = url;
    linkElem.download = csvFilename;
    linkElem.click();
  };

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
        <Styles.Line>
          CSV preview:
          <Button onClick={selectCsv}>Select CSV</Button>
          <Button onClick={copyCsv}>Copy CSV to clipboard</Button>
          <Button onClick={saveCsv}>Save CSV</Button>
        </Styles.Line>
        <Styles.Line>
          CSV file name:
          <Styles.Textbox
            value={csvFilename}
            onChange={event => {
              setIsCsvFilenameDirty(true);
              setCsvFilename(event.target.value);
            }}
          />
        </Styles.Line>
        <Styles.Line>Columns to export:</Styles.Line>
        <Styles.Line>
          <CheckboxGroup
            options={columns}
            selectedOptions={selectedColumns}
            onChange={setSelectedColumns}
            wrap
          />
        </Styles.Line>
        <Styles.Code ref={csvRef}>{exportableCsv}</Styles.Code>
      </div>
    )
  );
}
