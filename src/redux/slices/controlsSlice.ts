import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  navOpen: boolean;
};

const initialState: InitialState = {
  navOpen: false,
};

const mainControl = createSlice({
  name: "mainControl",
  initialState,
  reducers: {
    navToggle: (state) => {
      state.navOpen = !state.navOpen;
    },
  },
});

export default mainControl.reducer;
export const { navToggle } = mainControl.actions;