import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProjectType, { ProjectPostType } from '../../types/project.type';

type InitialState = {
  loading: boolean;
  projects: ProjectType[];
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  projects: [],
  error: '',
};

const API_URL = import.meta.env.VITE_REMAZON_API_URL || "http://localhost:5000";
const projectsUrl: URL= new URL(`${API_URL}/remazon/projects`);

// Api Calls --------------------------------------------------------------------------------->

export const fetchProjectsThunk = createAsyncThunk('projects/fetch', async (_thunkApi)=>{
  const response = await fetch(projectsUrl, {
    method: 'GET',
  });
  const data = response.json();
  return data;
});

export const createProjectThunk = createAsyncThunk('projects/create', async (newProject: ProjectPostType, thunkApi)=> {
  const response = await fetch(projectsUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newProject)
  });
  const data = response.json();

  thunkApi.dispatch(fetchProjectsThunk());
  return data;
});

export const editProjectThunk = createAsyncThunk('projects/edit', async (updatedProject: ProjectType, thunkApi)=> {
  const response = await fetch(projectsUrl, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(updatedProject)
  });
  const data = response.json();
  thunkApi.dispatch(fetchProjectsThunk());
  return data;
});

export const deleteProjectThunk = createAsyncThunk('projects/delete', async (id: Number, thunkApi)=> {
  await fetch(`${projectsUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    },
  });
  thunkApi.dispatch(fetchProjectsThunk());
  return;
});
// -------------------------------------------------------------------------------------------->

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjectsList: (state,action) => {
      state.projects = action.payload;
    },
    clearProjectError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // fetchProjects ------------------------------------------------------------->
    builder.addCase(fetchProjectsThunk.fulfilled, (state, action)=>{
      state.projects = action.payload.data;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(fetchProjectsThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchProjectsThunk.rejected, (state, action)=>{
      state.projects = [...state.projects];
      state.error = action.error.message;
      state.loading = false;
    });

    // deleteProject ------------------------------------------------------------->
    builder.addCase(deleteProjectThunk.fulfilled, (state)=>{
      state.error = '';
      state.loading = false;
    });
    builder.addCase(deleteProjectThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(deleteProjectThunk.rejected, (state, action)=>{
      state.projects = [...state.projects];
      state.error = action.error.message;
      state.loading = false;
    });

    // createProject ------------------------------------------------------------->
    builder.addCase(createProjectThunk.fulfilled, (state)=>{
      state.error = '';
      state.loading = false;
    });
    builder.addCase(createProjectThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createProjectThunk.rejected, (state, action)=>{
      state.projects = [...state.projects];
      state.error = action.error.message;
      state.loading = false;
    });

    // editProject ---------------------------------------------------------------->
    builder.addCase(editProjectThunk.fulfilled, (state)=>{
      state.error = '';
      state.loading = false;
    });
    builder.addCase(editProjectThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(editProjectThunk.rejected, (state, action)=>{
      state.projects = [...state.projects];
      state.error = action.error.message;
      state.loading = false;
    });
  }
});

export default projectsSlice.reducer;
export const {
  setProjectsList,
  clearProjectError,
} = projectsSlice.actions;