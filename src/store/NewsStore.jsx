import { createSlice } from "@reduxjs/toolkit";

const InitialState = { country: "afrikaans", details: {} };

const newsSlice = createSlice({
  name: "newsStorgae",
  initialState: InitialState,
  reducers: {
    countryCode(state, action) {
      state.country = action.payload;
    },
    newsDetails(state, action) {
      state.details = action.payload;
    },
  },
});

const newsReducer = newsSlice.reducer;

export const newsAction = newsSlice.actions;

export default newsReducer;
