import { Delete, Edit, OpenInNew } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { openTab } from "../../../../../store/slices/tabsSlice";
import {
  deleteList as deleteListAction,
  renameList as renameListAction,
} from "../../../../../store/slices/listsSlice";
import { ListModel } from "../../../../../store/utils/listUtils";
import { formatToJapaneseDate } from "../../../../../utils/formatToJapaneseDate";
import { Button } from "../../../../common/button/button";
import { ContentIdBadge } from "../../../../common/contentIdBadge/contentIdBadge";
import { Styles } from "./style";
import { SystemContentIds } from "../../../contentId";

export function List({ list }: { list: ListModel }) {
  const dispatch = useAppDispatch();

  function openListTabs() {
    list.contentIds.forEach(contentId => {
      dispatch(openTab({ contentId }));
    });
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

  function openList(event: React.MouseEvent) {
    event.stopPropagation();
    dispatch(
      openTab({
        contentId: {
          type: "system",
          id: SystemContentIds.List,
          label: list.name,
          listId: list.id,
        },
      })
    );
  }

  // <ListStyles.ListLine
  //   onClick={event => {
  //     event.stopPropagation();
  //     dispatch(
  //       openTab({
  //         contentId: {
  //           type: "system",
  //           id: SystemContentIds.List,
  //           label: list.name,
  //           listId: list.id,
  //         },
  //       })
  //     );
  //   }}
  //   key={list.id}
  // >
  //   {list.name}
  // </ListStyles.ListLine>
  return (
    <Styles.ListWrapper onClick={openList}>
      <Styles.ListTitleText>
        {list.name} ({list.contentIds.length} items)
        <Styles.ActionButtonsWrapper>
          <Button onClick={renameList} tooltip="Rename list">
            <Edit />
          </Button>
          <Button onClick={deleteList} tooltip="Delete list">
            <Delete />
          </Button>
          <Button onClick={openListTabs} tooltip="Open list tabs">
            <OpenInNew />
          </Button>
        </Styles.ActionButtonsWrapper>
      </Styles.ListTitleText>
      <Styles.ListDateTime>
        Updated: {formatToJapaneseDate(new Date(list.updatedTimestamp))}
      </Styles.ListDateTime>
      <Styles.ListDateTime>
        Created: {formatToJapaneseDate(new Date(list.creationTimestamp))}
      </Styles.ListDateTime>
    </Styles.ListWrapper>
  );
}
