import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CommandName =
  | "Close current tab"
  | "Close all tab groups"
  | "Search selected text"
  | "Search copied text"
  | "Search copied text - first vocabulary or open search"
  | "Focus searchbox"
  | "Focus next tab in group"
  | "Focus previous tab in group";

export interface ConfigState {
  commandQueue: CommandName[];
}

const initialState: ConfigState = {
  commandQueue: [],
};

export const slice = createSlice({
  name: "command",
  initialState,
  reducers: {
    runCommand: (state, action: PayloadAction<{ name: CommandName }>) => {
      const { name } = action.payload;
      state.commandQueue.push(name);
    },
    pickCommand: (state, action: PayloadAction<{ name: CommandName }>) => {
      const { name } = action.payload;
      state.commandQueue = state.commandQueue.filter(
        command => command !== name
      );
    },
  },
});

export const { runCommand, pickCommand } = slice.actions;

export default slice.reducer;
