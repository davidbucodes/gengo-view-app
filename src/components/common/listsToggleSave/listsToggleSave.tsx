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

  const listsToDisplay = Number.isInteger(limitLists)
    ? lists.slice(0, limitLists)
    : lists;

  if (inline) {
    return (
      <>
        <Button key={newListKey} onClick={onCreateNewListClick}>
          <Add />
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
  }

  return (
    <Styles.ListsSelect>
      <Button key={newListKey} onClick={onCreateNewListClick}>
        <Add />
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
    </Styles.ListsSelect>
  );
}
