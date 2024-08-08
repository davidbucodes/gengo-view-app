import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import {
  clearAllLists,
  createList as createListAction,
  setLists,
} from "../../../../../store/slices/listsSlice";
import { Button } from "../../../../common/button/button";
import { ContentId, SystemContentIds } from "../../../contentId";
import { Styles } from "../../../style";
import { Styles as ListStyles } from "./style";
import { List } from "./list";
import { ListModel, ListUtils } from "../../../../../store/utils/listUtils";
import { downloadText } from "../../../../../utils/downloadText";
import { listsByUpdateDateSelector } from "../../../../../store/selectors/listsByUpdateDateSelector";

export function SystemAllListsView() {
  const dispatch = useAppDispatch();
  const savedLists = useAppSelector(listsByUpdateDateSelector);
  const [listName, setListName] = useState<string>("");
  const [filterListsText, setFilterListsText] = useState<string>("");
  const [filteredLists, setFilteredLists] = useState<ListModel[]>([]);

  useEffect(() => {
    if (!filterListsText) {
      setFilteredLists(savedLists);
    } else {
      const filtered = (savedLists || []).filter(list => {
        const isNameContainsFilterText = list.name
          .toLowerCase()
          .includes(filterListsText.toLowerCase());
        if (isNameContainsFilterText) {
          return true;
        }

        const isSomeLabelContaintsFilterText = list.contentIds.some(contentId =>
          contentId.label.includes(filterListsText)
        );
        if (isSomeLabelContaintsFilterText) {
          return true;
        }

        return false;
      });
      setFilteredLists(filtered);
    }
  }, [filterListsText, savedLists]);

  function createList() {
    dispatch(
      createListAction({
        listName,
      })
    );
  }

  function downloadLists() {
    const listsDump = ListUtils.dumpLists({ lists: savedLists });
    downloadText("lists", listsDump, "json");
  }

  function loadListsFromText(listsDump: string) {
    try {
      const parsedLists = ListUtils.readListsDump({ listsDump });
      dispatch(setLists({ lists: parsedLists }));
    } catch (e) {
      console.error("Cannot parse lists text");
    }
  }

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target?.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsText(selectedFile, "utf-8");
      fileReader.onload = loadEvent => {
        loadListsFromText(loadEvent.target.result.toString());
      };
    }
  }

  function clearLists() {
    if (confirm("Clearing all of the lists is unrevertable action. Proceed?")) {
      dispatch(clearAllLists());
    }
  }

  return (
    <div>
      <Styles.Header>All lists</Styles.Header>
      <Styles.Line>
        List name (optional):
        <Styles.Textbox
          value={listName}
          onChange={event => {
            setListName(event.target.value);
          }}
        />
        <Button onClick={createList}>Save</Button>
      </Styles.Line>
      <Styles.Line>
        Previous lists
        <ListStyles.ActionButtonsWrapper>
          <Button onClick={downloadLists}>Download</Button>
          <label htmlFor="import-file">
            <Button>Load</Button>
            <input
              type="file"
              id="import-file"
              accept=".json"
              onChange={onFileInputChange}
              style={{ display: "none" }}
            />
          </label>
          <Button onClick={clearLists}>Clear All</Button>
        </ListStyles.ActionButtonsWrapper>
        <Styles.FilterTextbox
          placeholder="Filter lists..."
          type="search"
          onChange={event => {
            setFilterListsText(event.target.value);
          }}
        />
      </Styles.Line>
      {filteredLists.map(list => (
        <List list={list} />
      ))}
    </div>
  );
}
