import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import RankType, { RankPostType } from '../../types/rankType';

type InitialState = {
    loading: boolean,
    ranks: RankType[];
    error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  ranks: [],
  error: '',
};

const API_URL = import.meta.env.VITE_REMAZON_API_URL || "http://localhost:5000";
const ranksUrl: URL= new URL(`${API_URL}/remazon/ranks`);

// Api Calls --------------------------------------------------------------------------------->

export const fetchRanksThunk = createAsyncThunk('ranks/fetch', async (_thunkApi)=>{
  const response = await fetch(ranksUrl, {
    method: 'GET',
  });
  const data = response.json();
  return data;
});

export const createRankThunk = createAsyncThunk('ranks/create', async (newRank: RankPostType, _thunkApi)=> {
  const response = await fetch(ranksUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newRank)
  });
  const data = response.json();
  return data;
});

export const editRankThunk = createAsyncThunk('ranks/edit', async (updatedRank: RankType, _thunkApi)=> {
  const response = await fetch(ranksUrl, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(updatedRank)
  });
  const data = response.json();
  return data;
});

export const deleteRankThunk = createAsyncThunk('ranks/delete', async (rankId: number, thunkApi)=> {
  await fetch(`${ranksUrl}/${rankId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
  });
  await thunkApi.dispatch(fetchRanksThunk());
  return;
});

// -------------------------------------------------------------------------------------------->

const ranksslice = createSlice({
  name: 'ranksControl',
  initialState,
  reducers: {
    setRanksList: (state,action) => {
      state.ranks = action.payload;
    },
    clearRankError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // fetchRanks ------------------------------------------------------------->
    builder.addCase(fetchRanksThunk.fulfilled, (state, action)=>{
      state.ranks = []
      state.ranks = action.payload.data;
      state.error = '';
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
      state.error = '';
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
      state.error = '';
      state.ranks[index] = action.payload.data
    });
    builder.addCase(editRankThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(editRankThunk.rejected, (state, action)=>{
      state.loading = false;
      state.ranks = [...state.ranks];
      state.error = action.error.message;
    });

    // deleteRank ---------------------------------------------------------------->
    builder.addCase(deleteRankThunk.fulfilled, (state)=>{
      state.error = '';
      state.loading = false;
    });
    builder.addCase(deleteRankThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(deleteRankThunk.rejected, (state, action)=>{
      state.loading = false;
      state.ranks = [...state.ranks];
      state.error = action.error.message;
    });
  }
});

export default ranksslice.reducer;
export const {
  setRanksList,
  clearRankError,
} = ranksslice.actions;