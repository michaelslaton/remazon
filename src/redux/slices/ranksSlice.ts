import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RankType, { RankPostType } from "../../types/rankType";

type InitialState = {
    loading: boolean,
    ranks: RankType[];
    error: any,
};

const initialState: InitialState = {
  loading: false,
  ranks: [],
  error: "",
};

const ranksUrl: URL= new URL("http://localhost:5001/remazon/ranks");

// Api Calls --------------------------------------------------------------------------------->

export const fetchRanksThunk = createAsyncThunk("ranks/fetch", async (_thunkApi)=>{
  const response = await fetch(ranksUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

export const createRankThunk = createAsyncThunk("ranks/create", async (newRank: RankPostType, _thunkApi)=> {
  const response = await fetch(ranksUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(newRank)
  })
  const data = response.json();
  return data;
});

export const editRankThunk = createAsyncThunk("ranks/edit", async (updatedRank: RankType, _thunkApi)=> {
  const response = await fetch(ranksUrl, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(updatedRank)
  })
  const data = response.json();
  return data;
});
// -------------------------------------------------------------------------------------------->

const ranksslice = createSlice({
  name: "ranksControl",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchRanks ------------------------------------------------------------->
    builder.addCase(fetchRanksThunk.fulfilled, (state, action)=>{
      state.ranks = []
      state.ranks = action.payload.data;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(fetchRanksThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchRanksThunk.rejected, (state, action)=>{
      state.ranks = [...state.ranks];
      state.error = action.error.message;
      state.loading = false;
    });

    // createRank ------------------------------------------------------------->
    builder.addCase(createRankThunk.fulfilled, (state)=>{
      fetchRanksThunk();
      state.error = "";
      state.loading = false;
    });
    builder.addCase(createRankThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createRankThunk.rejected, (state, action)=>{
      state.ranks = [...state.ranks];
      state.error = action.error.message;
      state.loading = false;
    });

    // editRank ---------------------------------------------------------------->
    builder.addCase(editRankThunk.fulfilled, (state, action)=>{
      state.loading = false;
      const index = state.ranks.findIndex((rank)=> rank.id === action.payload.data.id);
      state.ranks[index] = action.payload.data
      state.error = '';
    });
    builder.addCase(editRankThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(editRankThunk.rejected, (state, action)=>{
      state.loading = false;
      state.ranks = [...state.ranks];
      state.error = action.error.message;
    });
  }
});

export default ranksslice.reducer;