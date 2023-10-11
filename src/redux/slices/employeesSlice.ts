import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EmployeeType from "../../types/employeeType";

type InitialState = {
  loading: boolean;
  employees: EmployeeType[];
  error: any,
};

const initialState: InitialState = {
  loading: false,
  employees: [],
  error: '',
};

export const fetchEmployees = createAsyncThunk("employees/fetch", async ()=>{
  const response = await fetch("http://localhost:5001/remazon/employees", {
    method: "GET",
  })
  const data = response.json();
  return data;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees: (state,action) => {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchEmployees ------------------------------------------------------------->
    builder.addCase(fetchEmployees.fulfilled, (state, action)=>{
      state.loading = false;
      state.employees = action.payload.data;
      state.error = '';
    })
    builder.addCase(fetchEmployees.pending, (state)=>{
      state.loading = true;
    })
    builder.addCase(fetchEmployees.rejected, (state, action)=>{
      state.loading = false;
      state.employees = [];
      state.error = action.error.message;
    })
  }
});

export default employeesSlice.reducer;
export const {
  setEmployees,
} = employeesSlice.actions;