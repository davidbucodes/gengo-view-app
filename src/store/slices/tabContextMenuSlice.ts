import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TabModel } from "../utils/tabActions";

export interface SliceState {
  clickedTab?: TabModel;
  position?: { x: number; y: number };
}

const initialState: SliceState = {};

export const slice = createSlice({
  name: "tabContextMenuSlice",
  initialState,
  reducers: {
    setTabContextMenu: (
      state,
      action: PayloadAction<{
        tab: TabModel;
        position: { x: number; y: number };
      }>
    ) => {
      state.clickedTab = action.payload.tab;
      state.position = action.payload.position;
    },
    clearTabContextMenu: state => {
      state.clickedTab = null;
      state.position = null;
    },
  },
});

export const { setTabContextMenu, clearTabContextMenu } = slice.actions;

export default slice.reducer;
