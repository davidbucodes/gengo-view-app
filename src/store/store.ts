import { configureStore } from "@reduxjs/toolkit";
import config from "./slices/configSlice";
import contextMenu from "./slices/contextMenuSlice";
import databaseLoadStatus from "./slices/databaseLoadStatusSlice";
import tabsDisplay from "./slices/tabsDisplaySlice";
import tabs from "./slices/tabsSlice";

const store = configureStore({
  reducer: {
    tabs,
    tabsDisplay,
    config,
    contextMenu,
    databaseLoadStatus,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
