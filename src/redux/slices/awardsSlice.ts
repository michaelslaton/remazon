import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AwardType, { AwardPostType } from '../../types/awardType';

type InitialState = {
  loading: boolean;
  awards: AwardType[];
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  awards: [],
  error: '',
};

const API_URL = import.meta.env.VITE_REMAZON_API_URL || "http://localhost:5000";
const awardsUrl: URL= new URL(`${API_URL}/remazon/awards`);

// Api Calls --------------------------------------------------------------------------------->

export const fetchAwardsThunk = createAsyncThunk('awards/fetch', async (_thunkApi)=>{
  const response = await fetch(awardsUrl, {
    method: 'GET',
  });
  const data = response.json();
  return data;
});

export const createAwardThunk = createAsyncThunk('awards/create', async (newAward: AwardPostType, thunkApi)=> {
  const response = await fetch(awardsUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newAward)
  });
  const data = response.json();

  thunkApi.dispatch(fetchAwardsThunk());
  return data;
});

// -------------------------------------------------------------------------------------------->

const awardsSlice = createSlice({
  name: 'awardsControl',
  initialState,
  reducers: {
    setAwardsList: (state,action) => {
      state.awards = action.payload;
    },
    clearAwardError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // fetchawards ---------------------------------------------------------------------------->
    builder.addCase(fetchAwardsThunk.fulfilled, (state, action)=>{
      state.awards = []
      state.awards = action.payload.data;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(fetchAwardsThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchAwardsThunk.rejected, (state, action)=>{
      state.awards = [...state.awards];
      state.error = action.error.message;
      state.loading = false;
    });

    // createAward ------------------------------------------------------------->
    builder.addCase(createAwardThunk.fulfilled, (state)=>{
      state.error = '';
      state.loading = false;
    });
    builder.addCase(createAwardThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createAwardThunk.rejected, (state, action)=>{
      state.awards = [...state.awards];
      state.error = action.error.message;
      state.loading = false;
    });
  }
});

export default awardsSlice.reducer;
export const {
  setAwardsList,
  clearAwardError
} = awardsSlice.actions;