import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  createList,
  toggleSave as toggleSaveAction,
} from "../../../store/slices/listsSlice";
import { ContentId } from "../../view/contentId";
import { Button } from "../button/button";
import { Add, Bookmark, BookmarkBorder } from "@mui/icons-material";
import { Styles } from "./style";
import { listsByUpdateDateSelector } from "../../../store/selectors/listsByUpdateDateSelector";
import { Searchbox } from "../searchbox/searchbox";
import { useEffect, useState } from "react";

const newListKey = "NEW_LIST";

export function ListsToggleSave({
  contentId,
  inline = false,
  limitLists,
}: {
  contentId: ContentId;
  inline?: boolean;
  limitLists?: number;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(listsByUpdateDateSelector);
  const [filterText, setFilterText] = useState<string>("");
  const [listsToDisplay, setListsToDisplay] = useState<typeof lists>(lists);

  function toggleSave(listId: string) {
    dispatch(
      toggleSaveAction({
        listId,
        contentId,
      })
    );
  }

  function onCreateNewListClick() {
    const newListName = prompt("New list name:");
    if (newListName) {
      dispatch(createList({ listName: newListName, contentId }));
    }
  }

  useEffect(() => {
    const filteredLists = lists.filter(list =>
      list.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const limitedLists = Number.isInteger(limitLists)
      ? filteredLists.slice(0, limitLists)
      : filteredLists;

    setListsToDisplay(limitedLists);
  }, [lists, limitLists, filterText]);

  const element = (
    <>
      <Button key={newListKey} onClick={onCreateNewListClick}>
        <Add />
        New list
      </Button>
      {listsToDisplay.map(list => (
        <Button key={list.id} onClick={() => toggleSave(list.id)}>
          {list.contentIds.find(id => id.id === contentId.id) ? (
            <Bookmark />
          ) : (
            <BookmarkBorder />
          )}{" "}
          <div>{list.name}</div>
        </Button>
      ))}
    </>
  );

  if (inline) {
    return element;
  }

  function onFilterListsChange(filterText: string): void {
    setFilterText(filterText);
  }

  return (
    <Styles.ListsSelect>
      <span style={{ padding: 5 }}>
        <Searchbox
          placeholder="Filter lists..."
          onChange={onFilterListsChange}
        />
      </span>
      <span>{element}</span>
    </Styles.ListsSelect>
  );
}
