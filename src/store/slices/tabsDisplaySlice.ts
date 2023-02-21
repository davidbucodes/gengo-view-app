import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GroupsDisplaySide,
  TabsGroupTuple,
  TabsGroupTupleUtils,
} from "../utils/tabsGroupTupleUtils";
import { TabGroup } from "../utils/tabsGroupUtils";

export interface TabsDisplayState {
  rootTuple: TabsGroupTuple;
}

const initialState: TabsDisplayState = {
  rootTuple: {
    first: null,
    second: null,
    side: null,
  },
};

export const slice = createSlice({
  name: "configSlice",
  initialState,
  reducers: {
    setRootTuple: (state, action: PayloadAction<TabsGroupTuple>) => {
      state.rootTuple = action.payload;
    },
    cleanRootTuple: (
      state,
      action: PayloadAction<{ tabGroups: Record<string, TabGroup> }>
    ) => {
      state.rootTuple = TabsGroupTupleUtils.cleanTuple(
        state.rootTuple,
        action.payload.tabGroups
      );
    },
    openTabGroup: (
      state,
      action: PayloadAction<{
        groupId: string;
        groupIdToOpen: string;
        side: GroupsDisplaySide;
      }>
    ) => {
      state.rootTuple = TabsGroupTupleUtils.openTabGroupAtTuple({
        rootTuple: state.rootTuple,
        groupId: action.payload.groupId,
        groupIdToOpen: action.payload.groupIdToOpen,
        side: action.payload.side,
      });
    },
  },
});

export const { setRootTuple, cleanRootTuple, openTabGroup } = slice.actions;

export default slice.reducer;
