import { configureStore } from "@reduxjs/toolkit";
import config from "./slices/configSlice";
import tabContextMenu from "./slices/tabContextMenuSlice";
import selectionContextMenu from "./slices/selectionContextMenuSlice";
import databaseLoadStatus from "./slices/databaseLoadStatusSlice";
import tabsDisplay from "./slices/tabsDisplaySlice";
import tabs from "./slices/tabsSlice";
import keyboard from "./slices/keyboardSlice";
import command from "./slices/commandSlice";
import sessions from "./slices/sessionsSlice";
import lists from "./slices/listsSlice";

const store = configureStore({
  reducer: {
    tabs,
    tabsDisplay,
    config,
    tabContextMenu,
    selectionContextMenu,
    databaseLoadStatus,
    keyboard,
    command,
    sessions,
    lists,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
