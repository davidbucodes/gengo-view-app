import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CommandName = "Close current tab" | "Close all groups";
type CommandCallback = () => void;

export interface ConfigState {
  commandCallbacks: Partial<Record<CommandName, CommandCallback>>;
  commandQueue: CommandName[];
}

const initialState: ConfigState = {
  commandCallbacks: {},
  commandQueue: [],
};

export const slice = createSlice({
  name: "command",
  initialState,
  reducers: {
    registerCommandCallback: (
      state,
      action: PayloadAction<{ name: CommandName; callback: CommandCallback }>
    ) => {
      const command = action.payload;
      Object.assign(state.commandCallbacks, command);
    },
    runCommand: (state, action: PayloadAction<{ name: CommandName }>) => {
      const { name } = action.payload;
      state.commandQueue.push(name);
    },
    pickCommand: (state, action: PayloadAction<{ name: CommandName }>) => {
      const { name } = action.payload;
      state.commandQueue.filter(command => command !== name);
    },
  },
});

export const { runCommand, registerCommandCallback, pickCommand } =
  slice.actions;

export default slice.reducer;
