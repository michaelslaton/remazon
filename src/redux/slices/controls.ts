import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    navOpen: boolean;
}

const initialState: InitialState = {
  navOpen: false,
}

const navControl = createSlice({
  name: "navControl",
  initialState,
  reducers: {
    navToggle: (state) => {
      state.navOpen = !state.navOpen;
    },
  },
});

export default navControl.reducer;
export const { navToggle } = navControl.actions;