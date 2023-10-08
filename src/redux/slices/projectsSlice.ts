import { createSlice } from "@reduxjs/toolkit";
import ProjectType from "../../types/projectType";

type InitialState = {
    projects: ProjectType[];
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
  },
});

export default projectsSlice.reducer;
export const {
  setProjects,
} = projectsSlice.actions;