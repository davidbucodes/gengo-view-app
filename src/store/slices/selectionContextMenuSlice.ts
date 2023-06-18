import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SliceState {
  selectedText?: string;
  position?: { x: number; y: number };
}

const initialState: SliceState = {};

export const slice = createSlice({
  name: "selectionContextMenuSlice",
  initialState,
  reducers: {
    setSelectionContextMenu: (
      state,
      action: PayloadAction<{
        selectedText: string;
        position: { x: number; y: number };
      }>
    ) => {
      state.selectedText = action.payload.selectedText;
      state.position = action.payload.position;
    },
    clearSelectionContextMenu: state => {
      state.selectedText = null;
      state.position = null;
    },
  },
});

export const { setSelectionContextMenu, clearSelectionContextMenu } =
  slice.actions;

export default slice.reducer;
