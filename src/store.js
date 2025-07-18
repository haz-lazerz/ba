import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
