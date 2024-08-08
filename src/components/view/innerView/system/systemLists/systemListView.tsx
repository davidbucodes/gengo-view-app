import { Edit, Delete, OpenInNew } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { closeTab, openTab } from "../../../../../store/slices/tabsSlice";
import { TabModel } from "../../../../../store/utils/tabActions";
import { Button } from "../../../../common/button/button";
import { ContentId } from "../../../contentId";
import { Styles } from "../../../style";
import { Styles as ListStyles } from "./style";
import {
  deleteList as deleteListAction,
  renameList as renameListAction,
} from "../../../../../store/slices/listsSlice";

export function SystemListView({
  listId,
  tab,
}: {
  listId: string;
  tab: TabModel;
}) {
  const dispatch = useAppDispatch();

  const list = useAppSelector(state =>
    state.lists.savedLists.find(list => list.id === listId)
  );
  console.log(list, listId);

  if (!list) {
    dispatch(closeTab(tab));
    return;
  }

  function deleteList() {
    dispatch(deleteListAction({ listId: list.id }));
  }

  function renameList() {
    const newListName = prompt("New list name:", list.name);
    if (newListName) {
      dispatch(renameListAction({ listId: list.id, newListName }));
    }
  }

  function openListTabs() {
    list.contentIds.forEach(contentId => {
      dispatch(openTab({ contentId }));
    });
  }

  return (
    <div>
      <Styles.Header>
        {list.name}
        <ListStyles.ActionButtonsWrapper>
          <Button onClick={renameList} tooltip="Rename list">
            <Edit />
          </Button>
          <Button onClick={deleteList} tooltip="Delete list">
            <Delete />
          </Button>
          <Button onClick={openListTabs} tooltip="Open list tabs">
            <OpenInNew />
          </Button>
          {/* <Button onClick={openListTabs} tooltip="Open list tabs">
          <OpenInNew />
        </Button> */}
        </ListStyles.ActionButtonsWrapper>
      </Styles.Header>
      <span key={list.id}>
        {list.contentIds.map(id => (
          <li
            key={id.id}
            onClick={event => {
              event.stopPropagation();
              dispatch(openTab({ contentId: id }));
            }}
          >
            {id.label}
          </li>
        ))}
      </span>
    </div>
  );
}
