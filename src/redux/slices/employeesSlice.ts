import { createSlice } from "@reduxjs/toolkit";
import Employee from "../../types/employee";

type InitialState = {
    employees: Employee[];
};

const initialState: InitialState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setEmployees: (state,action) => {
      state.employees = action.payload;
    },
    addEmployee: (state,action) => {
      state.employees = [...state.employees, action.payload];
    },
  },
});

export default employeesSlice.reducer;
export const {
  setEmployees,
  addEmployee 
} = employeesSlice.actions;