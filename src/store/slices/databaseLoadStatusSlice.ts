import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
  isSvgByLetterLoaded: boolean;
  loadingPercentage: number;
  isDatabaseLoaded: boolean;
}

const initialState: ConfigState = {
  isDatabaseLoaded: false,
  isSvgByLetterLoaded: false,
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
    setIsSvgByLetterLoaded: (state, action: PayloadAction<boolean>) => {
      state.isSvgByLetterLoaded = action.payload;
    },
  },
});

export const {
  setIsDatabaseLoaded,
  setIsSvgByLetterLoaded,
  setLoadingPercentage,
} = slice.actions;

export default slice.reducer;
