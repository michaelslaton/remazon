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

export const fetchEmployees = createAsyncThunk("employees/fetch", async (_thunkApi)=>{
  const response = await fetch(employeesUrl, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

export const createEmployee = createAsyncThunk("employees/create", async (employee: EmployeePostType, _thunkApi)=> {
  const response = await fetch(employeesUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(employee)
  })
  const data = response.json();
  return data;
});

export const editEmployee = createAsyncThunk("employees/edit", async (employee: EmployeeType, _thunkApi)=> {
  const response = await fetch(employeesUrl, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(employee)
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
    builder.addCase(fetchEmployees.fulfilled, (state, action)=>{
      state.loading = false;
      state.employees = action.payload.data;
      state.error = '';
    });
    builder.addCase(fetchEmployees.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchEmployees.rejected, (state, action)=>{
      state.loading = false;
      state.employees = [...state.employees];
      state.error = action.error.message;
    });

    // createEmployee ------------------------------------------------------------->
    builder.addCase(createEmployee.fulfilled, (state)=>{
      state.loading = false;
      fetchEmployees();
      state.error = '';
    });
    builder.addCase(createEmployee.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createEmployee.rejected, (state, action)=>{
      state.loading = false;
      state.employees = [...state.employees];
      state.error = action.error.message;
    });

    // editEmployee ---------------------------------------------------------------->
    builder.addCase(editEmployee.fulfilled, (state)=>{
      state.loading = false;
      fetchEmployees();
      state.error = '';
    });
    builder.addCase(editEmployee.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(editEmployee.rejected, (state, action)=>{
      state.loading = false;
      state.employees = [...state.employees];
      state.error = action.error.message;
    });
  }
});

export default employeesSlice.reducer;
export const {
  setEmployees,
} = employeesSlice.actions;