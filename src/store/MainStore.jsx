import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./NewsStore";

const store = configureStore({
  reducer: { newsReducer },
});

export default store;
