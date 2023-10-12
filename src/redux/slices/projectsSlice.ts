import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProjectType from "../../types/projectType";
import { ProjectPostType } from "../../types/projectType";

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

const projectsUrl: URL= new URL("http://localhost:5001/remazon/projects");

export const fetchProjects = createAsyncThunk("projects/fetch", async (_thunkApi)=>{
  const response = await fetch(projectsUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

export const createProject = createAsyncThunk("projects/create", async (project: ProjectPostType, _thunkApi)=> {
  const response = await fetch(projectsUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(project)
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
    });
    builder.addCase(fetchProjects.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchProjects.rejected, (state, action)=>{
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });

    // fetchProjects ------------------------------------------------------------->
    builder.addCase(createProject.fulfilled, (state)=>{
      state.loading = false;
      fetchProjects();
      state.error = '';
    });
    builder.addCase(createProject.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createProject.rejected, (state, action)=>{
      state.loading = false;
      state.projects = [...state.projects];
      state.error = action.error.message;
    });
  }
});

export default projectsSlice.reducer;
export const {
  setProjects,
} = projectsSlice.actions;