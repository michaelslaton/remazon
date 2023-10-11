import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProjectType from "../../types/projectType";

type InitialState = {
  loading: boolean;
  projects: ProjectType[];
  error: any,
};

const initialState: InitialState = {
  loading: false,
  projects: [],
  error: '',
};

export const fetchProjects = createAsyncThunk("projects/fetch", async ()=>{
  const response = await fetch("http://localhost:5001/remazon/projects", {
    method: "GET",
  })
  const data = response.json();
  return data;
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state,action) => {
      state.projects = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchProjects ------------------------------------------------------------->
    builder.addCase(fetchProjects.fulfilled, (state, action)=>{
      state.loading = false;
      state.projects = action.payload.data;
      state.error = '';
    })
    builder.addCase(fetchProjects.pending, (state)=>{
      state.loading = true;
    })
    builder.addCase(fetchProjects.rejected, (state, action)=>{
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    })
  }
});

export default projectsSlice.reducer;
export const {
  setProjects,
} = projectsSlice.actions;