import { createSlice } from "@reduxjs/toolkit";
import Project from "../../types/project";

type InitialState = {
    projects: Project[];
};

const initialState: InitialState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state,action) => {
      state.projects = action.payload;
    },
    addProject: (state,action) => {
      state.projects = [...state.projects, action.payload];
    },
  },
});

export default projectsSlice.reducer;
export const {
  setProjects,
  addProject
} = projectsSlice.actions;