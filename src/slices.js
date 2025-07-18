import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lockedItems: [],
};

export const mainSlice = createSlice({
  name: "main slice",
  initialState,
  reducers: {
    addLockedItem: (state, { payload }) => {
      const currentGridState = localStorage.getItem("gridState");
      if (!currentGridState) {
        state.lockedItems = [...state.lockedItems, payload];
        localStorage.setItem("gridState", JSON.stringify([{ ...payload }]));
        return;
      }
      const currentGridStateParsed = JSON.parse(currentGridState);
      localStorage.setItem(
        "gridState",
        JSON.stringify([...currentGridStateParsed, { ...payload }])
      );
      state.lockedItems = [...state.lockedItems, payload];
    },
    removeLockedItem: (state, { payload }) => {
      const currentGridState = localStorage.getItem("gridState");
      const currentGridStateParsed = JSON.parse(currentGridState);
      state.lockedItems = state.lockedItems.filter(
        (item) => item.id !== payload.id
      );
      if (currentGridStateParsed.length === 1) {
        localStorage.removeItem("gridState");
        return;
      }
      localStorage.setItem(
        "gridState",
        JSON.stringify(
          currentGridStateParsed.filter((item) => item.id !== payload.id)
        )
      );
    },
    initializeLockedItems: (state) => {
      const gridState = localStorage.getItem("gridState");
      if (!gridState) {
        state.lockedItems = [];
        return;
      }
      const gridStateParsed = JSON.parse(gridState);

      state.lockedItems = gridStateParsed;
    },
  },
});

export const { addLockedItem, removeLockedItem, initializeLockedItems } =
  mainSlice.actions;
export default mainSlice.reducer;
