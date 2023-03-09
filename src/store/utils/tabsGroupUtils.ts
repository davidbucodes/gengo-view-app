import { IndexName } from "@gengo-view/database";
import { ContentId } from "../../components/view/contentId";
import { SliceState } from "../slices/tabsSlice";
import { generateId } from "./generateId";
import { TabModel } from "./tabActions";

export interface TabGroup {
  id: string;
  openTabs: TabModel[];
  activeTabQueue: string[];
}

export namespace TabsGroupUtils {
  export function generateTabGroup(
    tabGroupId?: string,
    tabs: TabModel[] = []
  ): TabGroup {
    return {
      id: tabGroupId || generateId(),
      activeTabQueue: tabs.map(tab => tab.id),
      openTabs: tabs,
    };
  }

  export function setActiveTabGroup(state: SliceState, tabGroup: TabGroup) {
    state.activeTabGroupQueue = state.activeTabGroupQueue.filter(
      groupId => groupId !== tabGroup.id
    );
    state.activeTabGroupQueue.push(tabGroup.id);
  }

  export function setActiveTab(state: SliceState, tab: TabModel) {
    const tabGroup = state.tabGroups[tab.tabGroupId];
    tabGroup.activeTabQueue = tabGroup.activeTabQueue.filter(
      tabId => tabId !== tab.id
    );
    tabGroup.activeTabQueue.push(tab.id);
  }

  export function removeTabFromGroup(state: SliceState, tab: TabModel) {
    const tabGroup = state.tabGroups[tab.tabGroupId];
    if (tabGroup) {
      const tabIdToRemove = tab.id;

      tabGroup.openTabs = tabGroup.openTabs.filter(
        tab => tab.id !== tabIdToRemove
      );
      tabGroup.activeTabQueue = tabGroup.activeTabQueue.filter(
        tabId => tabId !== tabIdToRemove
      );
    }
  }

  // TODO
  export function removeTabGroup(state: SliceState, tab: TabModel) {
    const tabGroup = state.tabGroups[tab.tabGroupId];
    if (!tabGroup) {
      return;
    }

    delete state.tabGroups[tab.tabGroupId];
    state.activeTabGroupQueue = state.activeTabGroupQueue.filter(
      groupId => groupId !== tab.tabGroupId
    );
    if (
      state.activeTabGroupQueue.length === 1 ||
      state.rootTabGroupId === tab.tabGroupId
    ) {
      state.rootTabGroupId = state.activeTabGroupQueue[0];
    } else if (state.activeTabGroupQueue.length === 0) {
      state.rootTabGroupId = null;
    }
  }

  export function removeTabGroupIfEmpty(state: SliceState, tab: TabModel) {
    if (isTabGroupEmpty(state, tab.tabGroupId)) {
      removeTabGroup(state, tab);
    }
  }

  export function findTabByContent(
    state: SliceState,
    payloadContent: ContentId
  ) {
    const allTabs = Object.values(state.tabGroups)
      .map(group => group.openTabs)
      .flat();
    return allTabs.find(
      tab =>
        tab.content.id === payloadContent.id &&
        tab.content.type === payloadContent.type &&
        (tab.content as ContentId & { type: IndexName }).dbId ===
          (payloadContent as ContentId & { type: IndexName }).dbId &&
        (tab.content as ContentId & { type: IndexName }).dbIndex ===
          (payloadContent as ContentId & { type: IndexName }).dbIndex
    );
  }

  export function getTabFromState(
    state: SliceState,
    { id: tabId, tabGroupId }: Readonly<TabModel>
  ) {
    const tabGroup = state.tabGroups[tabGroupId];
    return tabGroup.openTabs.find(tab => tab.id === tabId);
  }

  export function sortTabsByPinnedState(state: SliceState, tabGroupId: string) {
    const tabGroup = state.tabGroups[tabGroupId];
    const pinnedTabs = tabGroup.openTabs.filter(tab => tab.isPinned);
    const unpinnedTabs = tabGroup.openTabs.filter(tab => !tab.isPinned);
    tabGroup.openTabs = [...pinnedTabs, ...unpinnedTabs];
  }

  export function getActiveTabByGroup(activeTabGroup: TabGroup) {
    const activeTabIndex = activeTabGroup.openTabs.findIndex(
      tab => tab.id === activeTabGroup.activeTabQueue.at(-1)
    );
    const activeTab = activeTabGroup.openTabs[activeTabIndex];
    return activeTab;
  }

  export function getActiveTabGroup(state: SliceState) {
    return state.tabGroups[state.activeTabGroupQueue.at(-1)];
  }

  export function getTabIndexAtGroup(state: SliceState, tab: TabModel) {
    const index = state.tabGroups[tab.tabGroupId].openTabs.findIndex(
      tabGroupTab => tabGroupTab.id === tab.id
    );
    return index;
  }

  export function removeOtherTabsAtGroup(
    state: SliceState,
    { id, tabGroupId }: TabModel
  ) {
    const tabGroup = state.tabGroups[tabGroupId];
    tabGroup.openTabs.forEach(tab => {
      if (!tab.isPinned && tab.id !== id) {
        removeTabFromGroup(state, tab);
      }
    });
  }

  export function addTabAsideTab(
    state: SliceState,
    tab: TabModel,
    tabToInsert: TabModel,
    position: "before" | "after"
  ) {
    removeTabFromGroup(state, tabToInsert);
    if (tabToInsert.tabGroupId !== tab.tabGroupId) {
      removeTabGroupIfEmpty(state, tab);
    }
    tabToInsert.tabGroupId = tab.tabGroupId;
    const tabGroup = state.tabGroups[tab.tabGroupId];
    const tabIndex = getTabIndexAtGroup(state, tab);
    if (position === "after") {
      tabGroup.openTabs.splice(tabIndex + 1, 0, tabToInsert);
    } else if (position === "before") {
      tabGroup.openTabs.splice(tabIndex, 0, tabToInsert);
    }
    setActiveTab(state, tabToInsert);
    setActiveTabGroup(state, tabGroup);
  }

  export function addTabAsLast(
    state: SliceState,
    tabGroup: TabGroup,
    tabToInsert: TabModel
  ) {
    removeTabFromGroup(state, tabToInsert);
    if (tabToInsert.tabGroupId !== tabGroup.id) {
      removeTabGroupIfEmpty(state, tabToInsert);
    }
    tabToInsert.tabGroupId = tabGroup.id;
    tabGroup.openTabs.push(tabToInsert);
    setActiveTab(state, tabToInsert);
    setActiveTabGroup(state, tabGroup);
  }

  export function removeTabsToSide(
    state: SliceState,
    tab: TabModel,
    side: "right" | "left"
  ) {
    const tabGroup = state.tabGroups[tab.tabGroupId];
    const tabIndex = getTabIndexAtGroup(state, tab);

    tabGroup.openTabs.forEach((groupTab, index) => {
      if (side === "right" && index > tabIndex && !groupTab.isPinned) {
        removeTabFromGroup(state, groupTab);
      }

      if (side === "left" && index < tabIndex && !groupTab.isPinned) {
        removeTabFromGroup(state, groupTab);
      }
    });
  }

  export function isTabGroupEmpty(state: SliceState, tabGroupId: string) {
    const tabGroup = state.tabGroups[tabGroupId];
    return !Boolean(tabGroup?.openTabs?.length);
  }

  export function addTabGroup(state: SliceState, tabGroup: TabGroup) {
    state.tabGroups[tabGroup.id] = tabGroup;
    setActiveTabGroup(state, tabGroup);
    if (!state.rootTabGroupId) {
      state.rootTabGroupId = tabGroup.id;
    }
  }
}
