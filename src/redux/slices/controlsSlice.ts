import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setEmployeesList } from './employeesSlice';
import { setProjectsList } from './projectsSlice';
import { setRanksList } from './ranksSlice';

type InitialState = {
  navOpen: boolean;
  loading: boolean;
  authDisplay: string;
  motd: string;
  uiError: string;
  error: any;
};

const initialState: InitialState = {
  navOpen: false,
  loading: false,
  authDisplay: 'login signup',
  motd: '',
  uiError: '',
  error: '',
};

const remazonUrl: URL = new URL('http://localhost:5000/remazon');

// Api Calls --------------------------------------------------------------------------------->

export const initialLoadThunk = createAsyncThunk('initialLoad/fetch', async (_, thunkApi)=>{
  const response = await fetch(remazonUrl, {
    method: 'GET',
  });
  const data = await response.json();

  thunkApi.dispatch(setEmployeesList(data.data.employees));
  thunkApi.dispatch(setProjectsList(data.data.projects));
  thunkApi.dispatch(setRanksList(data.data.ranks));
  
  return data;
});

export const fetchMotdThunk = createAsyncThunk('motd/fetch', async (_thunkApi)=>{
  const response = await fetch(`${remazonUrl}/motd`, {
    method: 'GET',
  });
  const data = response.json();
  return data;
});

export const updateMotdThunk = createAsyncThunk('motd/edit', async (updatedMotd: { motd: string }, _thunkApi)=> {
  const response = await fetch(`${remazonUrl}/motd`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(updatedMotd)
  });
  const data = response.json();
  return data;
});

// -------------------------------------------------------------------------------------------->

const mainControl = createSlice({
  name: 'mainControl',
  initialState,
  reducers: {
    navToggle: (state) => {
      state.navOpen = !state.navOpen;
    },
    setAuthDisplay: (state,action) => {
      state.authDisplay = action.payload;
    },
    setMotd: (state,action) => {
      state.motd = action.payload.data;
    },
    setUiError: (state,action) => {
      state.uiError = action.payload;
    },
    clearUiError: (state) => {
      state.uiError = '';
    },
    clearControlError: (state) => {
      state.error = '';
    }
  },
  extraReducers: (builder) => {

// initialLoad ------------------------------------------------------------------------------->
    builder.addCase(initialLoadThunk.fulfilled, (state,action)=>{
      state.loading = false;
      state.motd = action.payload.data.motd;
      state.error = '';
    });
    builder.addCase(initialLoadThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(initialLoadThunk.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message;
    });

// fetchMotd -------------------------------------------------------------------------------->
    builder.addCase(fetchMotdThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.motd = action.payload.data;
      state.error = '';
    });
    builder.addCase(fetchMotdThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchMotdThunk.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message;
    });

// updateMotd ------------------------------------------------------------------------------->
    builder.addCase(updateMotdThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.motd = action.payload.data;
      state.error = '';
    });
    builder.addCase(updateMotdThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(updateMotdThunk.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default mainControl.reducer;
export const {
  navToggle,
  setAuthDisplay,
  setUiError,
  clearUiError,
  clearControlError
} = mainControl.actions;