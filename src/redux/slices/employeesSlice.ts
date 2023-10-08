import { createSlice } from "@reduxjs/toolkit";
import EmployeeType from "../../types/employeeType";

type InitialState = {
    employees: EmployeeType[];
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
  },
});

export default employeesSlice.reducer;
export const {
  setEmployees,
} = employeesSlice.actions;