import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Rank from "../../types/rankType";

type InitialState = {
    loading: boolean,
    ranks: Rank[];
    error: any,
}

const initialState: InitialState = {
  loading: false,
  ranks: [],
  error: "",
}

const ranksUrl: URL= new URL("http://localhost:5001/remazon/ranks");

export const fetchRanksThunk = createAsyncThunk("ranks/fetch", async (_thunkApi)=>{
  const response = await fetch(ranksUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

const ranksslice = createSlice({
  name: "ranksControl",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRanksThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.ranks = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchRanksThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchRanksThunk.rejected, (state, action)=>{
      state.loading = false;
      state.ranks = [];
      state.error = action.error.message;
    });
  },
});

export default ranksslice.reducer;