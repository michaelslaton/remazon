import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EmployeeType, { EmployeePostType } from "../../types/employeeType";

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

const employeesUrl: URL = new URL("http://localhost:5001/remazon/employees");

// Api Calls --------------------------------------------------------------------------------->

export const fetchEmployeesThunk = createAsyncThunk("employees/fetch", async (_thunkApi)=>{
  const response = await fetch(employeesUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

export const createEmployeeThunk = createAsyncThunk("employees/create", async (newEmployee: EmployeePostType, _thunkApi)=> {
  const response = await fetch(employeesUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(newEmployee)
  })
  const data = response.json();
  return data;
});

export const editEmployeeThunk = createAsyncThunk("employees/edit", async (updatedEmployee: EmployeeType, _thunkApi)=> {
  const response = await fetch(employeesUrl, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(updatedEmployee)
  })
  const data = response.json();
  return data;
});
// -------------------------------------------------------------------------------------------->

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
    builder.addCase(fetchEmployeesThunk.fulfilled, (state, action)=>{
      state.employees = action.payload.data;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(fetchEmployeesThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchEmployeesThunk.rejected, (state, action)=>{
      state.employees = [...state.employees];
      state.error = action.error.message;
      state.loading = false;
    });

    // createEmployee ------------------------------------------------------------->
    builder.addCase(createEmployeeThunk.fulfilled, (state)=>{
      fetchEmployeesThunk();
      state.error = '';
      state.loading = false;
    });
    builder.addCase(createEmployeeThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createEmployeeThunk.rejected, (state, action)=>{
      state.employees = [...state.employees];
      state.error = action.error.message;
      state.loading = false;
    });

    // editEmployee ---------------------------------------------------------------->
    builder.addCase(editEmployeeThunk.fulfilled, (state)=>{
      fetchEmployeesThunk();
      state.error = '';
      state.loading = false;
    });
    builder.addCase(editEmployeeThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(editEmployeeThunk.rejected, (state, action)=>{
      state.employees = [...state.employees];
      state.error = action.error.message;
      state.loading = false;
    });
  }
});

export default employeesSlice.reducer;
export const {
  setEmployees,
} = employeesSlice.actions;