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
import { patchKeyboardConfig } from "../../store/slices/keyboardSlice";
import { pickCommand } from "../../store/slices/commandSlice";
import { toggleSaveToRecentlyUpdatedList } from "../../store/slices/listsSlice";
import { toggleFamiliar } from "../../store/slices/familiarsSlice";

export function Explorer(): JSX.Element {
  const rootTabGroupId = useAppSelector(state => state.tabs.rootTabGroupId);
  const tabGroups = useAppSelector(state => state.tabs.tabGroups);
  const rootTuple = useAppSelector(state => state.tabsDisplay.rootTuple);
  const commandQueue = useAppSelector(state => state.command.commandQueue);
  const activeTabContentId = useAppSelector(state => {
    const activeTabGroupId = state.tabs.activeTabGroupQueue[0];
    const activeTabGroup = state.tabs.tabGroups[activeTabGroupId];
    if (!activeTabGroup) {
      return null;
    }
    const activeTabId =
      state.tabs.tabGroups[activeTabGroupId]?.activeTabQueue.at(-1);
    const activeTab = state.tabs.tabGroups[activeTabGroupId]?.openTabs.find(
      tab => tab.id === activeTabId
    );
    if (!activeTab) {
      return null;
    }

    return activeTab.content;
  });
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

  useEffect(() => {
    dispatch(
      patchKeyboardConfig({
        config: {
          Digit1:
            "Toggle save status of current tab to first recently updated list",
          Digit2:
            "Toggle save status of current tab to second recently updated list",
          Digit3:
            "Toggle save status of current tab to third recently updated list",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (
      commandQueue.includes(
        "Toggle save status of current tab to first recently updated list"
      )
    ) {
      dispatch(
        pickCommand({
          name: "Toggle save status of current tab to first recently updated list",
        })
      );
      dispatch(
        toggleSaveToRecentlyUpdatedList({
          listIndex: 0,
          contentId: activeTabContentId,
        })
      );
    }
    if (
      commandQueue.includes(
        "Toggle save status of current tab to second recently updated list"
      )
    ) {
      dispatch(
        pickCommand({
          name: "Toggle save status of current tab to second recently updated list",
        })
      );
      dispatch(
        toggleSaveToRecentlyUpdatedList({
          listIndex: 1,
          contentId: activeTabContentId,
        })
      );
    }
    if (
      commandQueue.includes(
        "Toggle save status of current tab to third recently updated list"
      )
    ) {
      dispatch(
        pickCommand({
          name: "Toggle save status of current tab to third recently updated list",
        })
      );
      dispatch(
        toggleSaveToRecentlyUpdatedList({
          listIndex: 2,
          contentId: activeTabContentId,
        })
      );
    }
    if (
      commandQueue.includes("Toggle save status of current tab as familiar")
    ) {
      dispatch(
        pickCommand({ name: "Toggle save status of current tab as familiar" })
      );
      dispatch(
        toggleFamiliar({
          contentId: activeTabContentId,
        })
      );
    }
  }, [commandQueue]);

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
