import { PayloadAction } from "@reduxjs/toolkit";
import { ContentId } from "../../components/view/contentId";
import { SliceState } from "../slices/tabsSlice";
import { generateId } from "./generateId";
import { TabUtils } from "./tabUtils";
import { TabsGroupUtils } from "./tabsGroupUtils";

export interface TabModel {
  id: string;
  label: string;
  tooltip: string;
  content: ContentId;
  isPinned: boolean;
  tabGroupId: string;
}

export namespace TabActions {
  export const moveDraggedTab = (
    state: SliceState,
    action: PayloadAction<{
      droppedOnTab: TabModel;
    }>
  ) => {
    const { droppedOnTab } = action.payload;
    const { draggedTab } = state;

    if (!draggedTab || draggedTab.id === droppedOnTab.id) {
      state.draggedTab = null;
      return;
    }

    TabsGroupUtils.removeTabFromGroup(state, draggedTab);
    if (draggedTab.id !== droppedOnTab.id) {
      TabsGroupUtils.removeTabGroupIfEmpty(state, draggedTab);
    }

    draggedTab.isPinned = false;

    if (draggedTab.tabGroupId !== droppedOnTab.tabGroupId) {
      TabsGroupUtils.addTabAsideTab(state, droppedOnTab, draggedTab, "before");
    } else {
      if (
        TabsGroupUtils.getTabIndexAtGroup(state, draggedTab) >
        TabsGroupUtils.getTabIndexAtGroup(state, droppedOnTab)
      ) {
        TabsGroupUtils.addTabAsideTab(
          state,
          droppedOnTab,
          draggedTab,
          "before"
        );
      } else {
        TabsGroupUtils.addTabAsideTab(state, droppedOnTab, draggedTab, "after");
      }
    }

    state.draggedTab = null;
  };

  export const moveDraggedTabToNewGroup = (
    state: SliceState,
    action: PayloadAction<{ newTabGroupId: string }>
  ) => {
    const { draggedTab } = state;
    const { newTabGroupId } = action.payload;

    TabsGroupUtils.removeTabFromGroup(state, draggedTab);
    TabsGroupUtils.removeTabGroupIfEmpty(state, draggedTab);

    const tabGroup = TabsGroupUtils.generateTabGroup(newTabGroupId, [
      { ...draggedTab, tabGroupId: newTabGroupId },
    ]);
    TabsGroupUtils.addTabGroup(state, tabGroup);
    state.draggedTab = null;
  };

  export const moveDraggedTabToGroup = (
    state: SliceState,
    action: PayloadAction<{
      tabGroupId: string;
      setAsLast?: boolean;
    }>
  ) => {
    const { tabGroupId, setAsLast } = action.payload;
    const { draggedTab } = state;

    if (!draggedTab) {
      return;
    }
    draggedTab.isPinned = false;

    const tabGroup = state.tabGroups[tabGroupId];
    const activeTab = TabsGroupUtils.getActiveTabByGroup(tabGroup);

    if (setAsLast) {
      TabsGroupUtils.addTabAsLast(state, tabGroup, draggedTab);
    } else {
      TabsGroupUtils.addTabAsideTab(state, activeTab, draggedTab, "after");
    }

    state.draggedTab = null;
  };

  export const openTab = (
    state: SliceState,
    action: PayloadAction<ContentId>
  ) => {
    const contentId = action.payload;
    const existingTab = TabsGroupUtils.findTabByContent(state, contentId);
    if (existingTab) {
      TabsGroupUtils.setActiveTab(state, existingTab);
    } else {
      const newTabId = generateId();
      let activeTabGroup = TabsGroupUtils.getActiveTabGroup(state);
      if (!activeTabGroup) {
        activeTabGroup = TabsGroupUtils.generateTabGroup();
        TabsGroupUtils.addTabGroup(state, activeTabGroup);
      }

      const newTab = TabUtils.generateTab(
        contentId,
        newTabId,
        activeTabGroup.id
      );

      const activeTab = TabsGroupUtils.getActiveTabByGroup(activeTabGroup);
      if (activeTab) {
        TabsGroupUtils.addTabAsideTab(state, activeTab, newTab, "after");
      } else {
        TabsGroupUtils.addTabAsLast(state, activeTabGroup, newTab);
      }
    }
  };

  export const closeTab = (
    state: SliceState,
    action: PayloadAction<TabModel>
  ) => {
    TabsGroupUtils.removeTabFromGroup(state, action.payload);
    TabsGroupUtils.removeTabGroupIfEmpty(state, action.payload);
  };

  export const closeCurrentTab = (state: SliceState) => {
    const activeTabGroup = TabsGroupUtils.getActiveTabGroup(state);
    if (activeTabGroup) {
      const activeTab = TabsGroupUtils.getActiveTabByGroup(activeTabGroup);
      TabsGroupUtils.removeTabFromGroup(state, activeTab);
      TabsGroupUtils.removeTabGroupIfEmpty(state, activeTab);
    }
  };

  export const closeOtherTabs = (
    state: SliceState,
    action: PayloadAction<TabModel>
  ) => {
    TabsGroupUtils.removeOtherTabsAtGroup(state, action.payload);
  };

  export const closeTabsToTheLeft = (
    state: SliceState,
    action: PayloadAction<TabModel>
  ) => {
    TabsGroupUtils.removeTabsToSide(state, action.payload, "left");
  };

  export const closeTabsToTheRight = (
    state: SliceState,
    action: PayloadAction<TabModel>
  ) => {
    TabsGroupUtils.removeTabsToSide(state, action.payload, "right");
  };

  export const closeAllTabsOfGroup = (
    state: SliceState,
    action: PayloadAction<TabModel>
  ) => {
    TabsGroupUtils.removeTabGroup(state, action.payload);
  };

  export const closeAllGroups = (state: SliceState) => {
    state.tabGroups = {};
    state.activeTabGroupQueue = [];
    state.rootTabGroupId = null;
  };

  export const setActiveTab = (
    state: SliceState,
    action: PayloadAction<TabModel>
  ) => {
    TabsGroupUtils.setActiveTab(state, action.payload);
    const tabGroup = state.tabGroups[action.payload.tabGroupId];
    TabsGroupUtils.setActiveTabGroup(state, tabGroup);
  };

  export const focusNextTabInGroup = (state: SliceState) => {
    const activeTabGroup = TabsGroupUtils.getActiveTabGroup(state);
    const activeTab = TabsGroupUtils.getActiveTabByGroup(activeTabGroup);

    const activeTabIndex = activeTabGroup.openTabs.findIndex(
      tab => tab.id === activeTab.id
    );

    if (activeTabIndex === activeTabGroup.openTabs.length - 1) {
      TabsGroupUtils.setActiveTab(state, activeTabGroup.openTabs[0]);
    } else {
      TabsGroupUtils.setActiveTab(
        state,
        activeTabGroup.openTabs[activeTabIndex + 1]
      );
    }
  };

  export const focusPreviousTabInGroup = (state: SliceState) => {
    const activeTabGroup = TabsGroupUtils.getActiveTabGroup(state);
    const activeTab = TabsGroupUtils.getActiveTabByGroup(activeTabGroup);

    const activeTabIndex = activeTabGroup.openTabs.findIndex(
      tab => tab.id === activeTab.id
    );

    if (activeTabIndex === 0) {
      TabsGroupUtils.setActiveTab(
        state,
        activeTabGroup.openTabs[activeTabGroup.openTabs.length - 1]
      );
    } else {
      TabsGroupUtils.setActiveTab(
        state,
        activeTabGroup.openTabs[activeTabIndex - 1]
      );
    }
  };

  export const setTabPinnedState = (
    state: SliceState,
    action: PayloadAction<{ tab: TabModel; isPinned: boolean }>
  ) => {
    const { tab, isPinned } = action.payload;
    TabsGroupUtils.getTabFromState(state, tab).isPinned = isPinned;
    TabsGroupUtils.sortTabsByPinnedState(state, tab.tabGroupId);
  };

  export const setDraggedTab = (
    state: SliceState,
    action: PayloadAction<TabModel | null>
  ) => {
    state.draggedTab = action.payload;
  };

  export const setDraggedContent = (
    state: SliceState,
    action: PayloadAction<ContentId | null>
  ) => {
    if (!action.payload) {
      state.draggedTab = null;
    } else {
      state.draggedTab = TabUtils.generateTab(action.payload);
    }
  };
}
