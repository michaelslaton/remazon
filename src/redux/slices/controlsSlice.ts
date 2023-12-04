import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setEmployeesList } from "./employeesSlice";
import { setProjectsList } from "./projectsSlice";
import { setRanksList } from "./ranksSlice";

type InitialState = {
  navOpen: boolean;
  loading: boolean;
  authDisplay: string;
  error: any;
};

const initialState: InitialState = {
  navOpen: false,
  loading: false,
  authDisplay: "login signup",
  error: '',
};

const remazonUrl: URL = new URL("http://localhost:5000/remazon");

// Api Calls --------------------------------------------------------------------------------->

export const initialLoadThunk = createAsyncThunk("initialLoad/fetch", async (_, thunkApi)=>{
  const response = await fetch(remazonUrl, {
    method: "GET",
  });
  const data = await response.json();

  thunkApi.dispatch(setEmployeesList(data.data.employees))
  thunkApi.dispatch(setProjectsList(data.data.projects))
  thunkApi.dispatch(setRanksList(data.data.ranks))
  
  return;
});

// -------------------------------------------------------------------------------------------->

const mainControl = createSlice({
  name: "mainControl",
  initialState,
  reducers: {
    navToggle: (state) => {
      state.navOpen = !state.navOpen;
    },
    setAuthDisplay: (state,action) => {
      state.authDisplay = action.payload;
    },
  },
  extraReducers: (builder) => {
// initialLoad ------------------------------------------------------------->
    builder.addCase(initialLoadThunk.fulfilled, (state)=>{
      state.loading = false;
      state.error = '';
    });
    builder.addCase(initialLoadThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(initialLoadThunk.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default mainControl.reducer;
export const { navToggle, setAuthDisplay } = mainControl.actions;