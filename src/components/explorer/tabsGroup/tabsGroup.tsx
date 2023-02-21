import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  moveDraggedTab,
  moveDraggedTabToGroup,
  moveDraggedTabToNewGroup,
  setDraggedTab,
} from "../../../store/slices/tabsSlice";
import { generateId } from "../../../store/utils/generateId";
import { TabModel } from "../../../store/utils/tabActions";
import { GroupsDisplaySide } from "../../../store/utils/tabsGroupTupleUtils";
import { View } from "../../view/view";
import { Tabbar } from "../tabbar/tabbar";
import { getViewDragArea } from "./getViewDragArea";
import { Styles } from "./style";

export type ViewDragArea = GroupsDisplaySide | "all";

export interface Area {
  topLeftX: number;
  topLeftY: number;
  bottomRightX: number;
  bottomRightY: number;
}

export function TabsGroup<T>({
  tabGroupId,
  onOpenGroup,
}: {
  tabGroupId: string;
  onOpenGroup({
    groupId,
    groupIdToOpen,
    side,
  }: {
    groupId: string;
    groupIdToOpen: string;
    side: GroupsDisplaySide;
  }): void;
}) {
  const [viewDragArea, setViewDragArea] = useState<ViewDragArea | null>(null);

  const dispatch = useAppDispatch();
  const draggedTab = useAppSelector(state => state.tabs.draggedTab);
  const tabGroup = useAppSelector(state => state.tabs.tabGroups[tabGroupId]);

  function onTabDragStart(tab: TabModel) {
    dispatch(setDraggedTab(tab));
  }

  function onTabDrop(tab: TabModel) {
    dispatch(
      moveDraggedTab({
        droppedOnTab: tab,
      })
    );
  }

  function onTabDropOnEmptyArea() {
    dispatch(moveDraggedTabToGroup({ tabGroupId }));
  }

  if (!tabGroup) {
    return;
  }

  return (
    <Styles.TabsGroup>
      <Tabbar
        tabGroupId={tabGroupId}
        onTabDragStart={onTabDragStart}
        onTabDrop={onTabDrop}
        onTabDropOnEmptyArea={onTabDropOnEmptyArea}
      />
      <Styles.DragAreaWrapper
        onDragOver={event => {
          event.preventDefault();
          if (!draggedTab) {
            return;
          }

          event.dataTransfer.dropEffect = "move";
          setViewDragArea(getViewDragArea(event));
        }}
        onDrop={event => {
          event.preventDefault();
          if (
            !draggedTab ||
            (viewDragArea === "all" && draggedTab.tabGroupId === tabGroupId) ||
            (draggedTab.tabGroupId === tabGroup.id &&
              tabGroup.openTabs.length === 1)
          ) {
            setViewDragArea(null);
            return;
          }

          if (viewDragArea === "all") {
            setViewDragArea(null);
            dispatch(moveDraggedTabToGroup({ tabGroupId }));
            return;
          } else {
            const newTabGroupId = generateId();
            const result = dispatch(
              moveDraggedTabToNewGroup({ newTabGroupId })
            );
            console.log(result);
            setTimeout(() => {
              onOpenGroup({
                groupId: tabGroupId,
                groupIdToOpen: newTabGroupId,
                side: viewDragArea,
              });
            });
            setViewDragArea(null);
            return;
          }
        }}
        onDragLeave={() => setViewDragArea(null)}
      >
        {viewDragArea === "right" && <Styles.ViewDropAreaRight />}
        {viewDragArea === "left" && <Styles.ViewDropAreaLeft />}
        {viewDragArea === "top" && <Styles.ViewDropAreaTop />}
        {viewDragArea === "bottom" && <Styles.ViewDropAreaBottom />}
        {viewDragArea === "all" && <Styles.ViewDropAreaAll />}
        <Styles.ViewWrapper>
          <View tabGroupId={tabGroupId} />
        </Styles.ViewWrapper>
      </Styles.DragAreaWrapper>
    </Styles.TabsGroup>
  );
}
