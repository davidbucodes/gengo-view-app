import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyboardConfig } from "../../hooks/useKeyboardShourtcuts";

export interface ConfigState {
  keyboardConfig: KeyboardConfig;
}

const initialState: ConfigState = {
  keyboardConfig: {},
};

export const slice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    patchKeyboardConfig: (
      state,
      action: PayloadAction<{ config: KeyboardConfig }>
    ) => {
      Object.assign(state.keyboardConfig, action.payload.config);
    },
  },
});

export const { patchKeyboardConfig } = slice.actions;

export default slice.reducer;
