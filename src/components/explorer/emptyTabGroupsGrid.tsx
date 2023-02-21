import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { moveDraggedTabToNewGroup } from "../../store/slices/tabsSlice";
import { generateId } from "../../store/utils/generateId";
import { Styles } from "./style";

export function EmptyTabGroupsGrid(): JSX.Element {
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);
  const dispatch = useAppDispatch();
  const [isTabDraggedOver, setIsTabDraggedOver] = useState(false);
  return (
    <Styles.EmptyTabGroupsGrid
      onDragOver={event => {
        event.preventDefault();
        if (!draggedTab) {
          return;
        }

        event.dataTransfer.dropEffect = "move";
        setIsTabDraggedOver(true);
      }}
      onDragLeave={() => setIsTabDraggedOver(false)}
      onDrop={event => {
        event.preventDefault();
        if (draggedTab) {
          const newTabGroupId = generateId();
          dispatch(moveDraggedTabToNewGroup({ newTabGroupId }));
        }
      }}
      isTabDraggedOver={isTabDraggedOver}
    >
      <Styles.EmptyTabGroupsGridHeader>
        GengoView
      </Styles.EmptyTabGroupsGridHeader>
      <Styles.EmptyTabGroupsGridText>
        Start exploring by:
        <br />
        dropping kanji from the list,
        <br />
        clicking on kanji from the list
        <br />
        or opening search result
      </Styles.EmptyTabGroupsGridText>
    </Styles.EmptyTabGroupsGrid>
  );
}
