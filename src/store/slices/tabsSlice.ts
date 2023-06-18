import { createSlice } from "@reduxjs/toolkit";
import { ContentId, SystemContentIds } from "../../components/view/contentId";
import { generateId } from "../utils/generateId";
import { TabActions, TabModel } from "../utils/tabActions";
import { TabUtils } from "../utils/tabUtils";
import { TabGroup } from "../utils/tabsGroupUtils";

export interface SliceState {
  tabGroups: Record<string, TabGroup>;
  activeTabGroupQueue: string[];
  draggedTab?: TabModel;
  rootTabGroupId: string;
}

export const defaultAppGroupId = generateId();

const getInitialState = (): SliceState => {
  const contentId: ContentId = {
    type: "system",
    id: SystemContentIds.Welcome,
    label: SystemContentIds.Welcome,
  };
  const tabId = generateId();
  return {
    rootTabGroupId: defaultAppGroupId,
    activeTabGroupQueue: [defaultAppGroupId],
    tabGroups: {
      [defaultAppGroupId]: {
        id: defaultAppGroupId,
        activeTabQueue: [tabId],
        openTabs: [TabUtils.generateTab(contentId, tabId, defaultAppGroupId)],
      },
    },
  };
};

export const slice = createSlice({
  name: "tabsSlice",
  initialState: getInitialState(),
  reducers: {
    ...TabActions,
  },
});

export const {
  openTab,
  moveDraggedTabToNewGroup,
  closeTab,
  closeCurrentTab,
  closeOtherTabs,
  closeTabsToTheLeft,
  closeTabsToTheRight,
  closeAllTabsOfGroup,
  closeAllGroups,
  setTabPinnedState,
  setActiveTab,
  moveDraggedTab,
  moveDraggedTabToGroup,
  setDraggedTab,
  setDraggedContent,
  focusNextTabInGroup,
  focusPreviousTabInGroup,
} = slice.actions;

export default slice.reducer;
function capitalizeFirstLetter(type: string) {
  throw new Error("Function not implemented.");
}
