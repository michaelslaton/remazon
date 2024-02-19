import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AwardType from '../../types/awardType';

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

const awardsUrl: URL= new URL('http://localhost:5000/remazon/awards');

// Api Calls --------------------------------------------------------------------------------->

export const fetchAwardsThunk = createAsyncThunk('awards/fetch', async (_thunkApi)=>{
  const response = await fetch(awardsUrl, {
    method: 'GET',
  });
  const data = response.json();
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
    // fetchawards ------------------------------------------------------------->
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
  }
});

export default awardsSlice.reducer;
export const {
  setAwardsList,
  clearAwardError
} = awardsSlice.actions;