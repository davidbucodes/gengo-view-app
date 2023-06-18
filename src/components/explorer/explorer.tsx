import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  cleanRootTuple,
  openTabGroup,
  setRootTuple,
} from "../../store/slices/tabsDisplaySlice";
import { GroupsDisplaySide } from "../../store/utils/tabsGroupTupleUtils";
import { EmptyTabGroupsGrid } from "./emptyTabGroupsGrid";
import { Styles } from "./style";
import { TabContextMenu } from "./tabbar/tabContextMenu/tabContextMenu";
import { TabsGroupGrid } from "./tabsGroup/tabsGroupGrid";
import { SelectionContextMenu } from "./selectionContextMenu/selectionContextMenu";
import { setSelectionContextMenu } from "../../store/slices/selectionContextMenuSlice";

export function Explorer(): JSX.Element {
  const rootTabGroupId = useAppSelector(state => state.tabs.rootTabGroupId);
  const tabGroups = useAppSelector(state => state.tabs.tabGroups);
  const rootTuple = useAppSelector(state => state.tabsDisplay.rootTuple);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cleanRootTuple({ tabGroups }));
  }, [tabGroups, JSON.stringify(rootTuple)]);

  useEffect(() => {
    if (!rootTuple?.first) {
      dispatch(
        setRootTuple({
          first: rootTabGroupId,
          second: null,
          side: null,
        })
      );
    }
  }, [rootTabGroupId]);

  function onOpenGroup({
    groupId,
    groupIdToOpen,
    side,
  }: {
    groupId: string;
    groupIdToOpen: string;
    side: GroupsDisplaySide;
  }): void {
    dispatch(
      openTabGroup({
        groupId,
        groupIdToOpen,
        side,
      })
    );
  }

  function onContextMenu(ev: React.MouseEvent): void {
    ev.preventDefault();
    const selectedText = window.getSelection().toString();

    if (selectedText) {
      dispatch(
        setSelectionContextMenu({
          position: { x: ev.clientX, y: ev.clientY },
          selectedText,
        })
      );
    }
  }

  return (
    <Styles.Explorer onContextMenu={event => onContextMenu(event)}>
      <TabContextMenu />
      <SelectionContextMenu />
      {rootTuple?.first && (
        <TabsGroupGrid tabGroupTuple={rootTuple} onOpenGroup={onOpenGroup} />
      )}
      {!rootTuple?.first && <EmptyTabGroupsGrid />}
    </Styles.Explorer>
  );
}
