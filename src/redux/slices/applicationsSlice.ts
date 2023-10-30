import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApplicationType from "../../types/applicationType";

type InitialState = {
  loading: boolean,
  applications: ApplicationType[];
  error: any,
}

const initialState: InitialState = {
  loading: false,
  applications: [],
  error: "",
}

const applicationsUrl: URL= new URL("http://localhost:5001/remazon/applications");

// Api Calls --------------------------------------------------------------------------------->

export const fetchApplicationsThunk = createAsyncThunk("applications/fetch", async (_thunkApi)=>{
  const response = await fetch(applicationsUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

const applicationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApplicationsThunk.fulfilled, (state, action)=>{
      state.applications = action.payload.data;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(fetchApplicationsThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchApplicationsThunk.rejected, (state, action)=>{
      state.applications = [...state.applications];
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default applicationsSlice.reducer;