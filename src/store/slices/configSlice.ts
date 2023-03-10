import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
  maxResultsForDisplay: number;
  closeSearchResultsOnPopupInteraction: boolean;
  selectSearchOnFocus: boolean;
}

const initialState: ConfigState = {
  maxResultsForDisplay: 20,
  closeSearchResultsOnPopupInteraction: true,
  selectSearchOnFocus: true,
};

export const slice = createSlice({
  name: "configSlice",
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateConfig } = slice.actions;

export default slice.reducer;
