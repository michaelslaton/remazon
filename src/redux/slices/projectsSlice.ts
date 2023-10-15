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
  error: "",
};

const projectsUrl: URL= new URL("http://localhost:5001/remazon/projects");

export const fetchProjectsThunk = createAsyncThunk("projects/fetch", async (_thunkApi)=>{
  const response = await fetch(projectsUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

export const createProjectThunk = createAsyncThunk("projects/create", async (project: ProjectPostType, _thunkApi)=> {
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

export const editProjectThunk = createAsyncThunk("projects/edit", async (project: ProjectType, _thunkApi)=> {
  const response = await fetch(projectsUrl, {
    method: "PUT",
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
    builder.addCase(fetchProjectsThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.projects = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchProjectsThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchProjectsThunk.rejected, (state, action)=>{
      state.loading = false;
      state.projects = [];
      state.error = action.error.message;
    });

    // fetchProjects ------------------------------------------------------------->
    builder.addCase(createProjectThunk.fulfilled, (state)=>{
      state.loading = false;
      fetchProjectsThunk();
      state.error = "";
    });
    builder.addCase(createProjectThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createProjectThunk.rejected, (state, action)=>{
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