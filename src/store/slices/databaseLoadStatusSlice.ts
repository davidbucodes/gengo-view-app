import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
  isSvgByKanjiLoaded: boolean;
  loadingPercentage: number;
  isDatabaseLoaded: boolean;
}

const initialState: ConfigState = {
  isDatabaseLoaded: false,
  isSvgByKanjiLoaded: false,
  loadingPercentage: 0,
};

export const slice = createSlice({
  name: "databaseLoadStatusSlice",
  initialState,
  reducers: {
    setIsDatabaseLoaded: (state, action: PayloadAction<boolean>) => {
      state.isDatabaseLoaded = action.payload;
    },
    setLoadingPercentage: (state, action: PayloadAction<number>) => {
      state.loadingPercentage = action.payload;
    },
    setIsSvgByKanjiLoaded: (state, action: PayloadAction<boolean>) => {
      state.isSvgByKanjiLoaded = action.payload;
    },
  },
});

export const {
  setIsDatabaseLoaded,
  setIsSvgByKanjiLoaded,
  setLoadingPercentage,
} = slice.actions;

export default slice.reducer;
