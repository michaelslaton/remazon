import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EmployeeType, { EmployeePostType } from "../../types/employeeType";

type InitialState = {
  loading: boolean;
  employees: EmployeeType[];
  currentEmployee: EmployeeType | null;
  error: any,
};

const initialState: InitialState = {
  loading: false,
  employees: [],
  currentEmployee: null,
  error: '',
};

const employeesUrl: URL = new URL("http://localhost:5000/remazon/employees");

// Api Calls --------------------------------------------------------------------------------->

export const fetchCurrentEmployeeThunk = createAsyncThunk("users/fetch", async (uid: string, thunkApi)=>{
  await thunkApi.dispatch(fetchEmployeesListThunk());
  const response = await fetch(`${employeesUrl}/${uid}`, {
    method: "GET",
  });
  const data = response.json();
  return data;
});

export const fetchEmployeesListThunk = createAsyncThunk("employees/fetch", async (_thunkApi)=>{
  const response = await fetch(employeesUrl, {
    method: "GET",
  });
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
  });
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
  });
  const data = response.json();
  return data;
});

// -------------------------------------------------------------------------------------------->

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployeesList: (state,action) => {
      state.employees = action.payload;
    },
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    },
    clearEmployeeError: (state) => {
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    // fetchUser ------------------------------------------------------------->
    builder.addCase(fetchCurrentEmployeeThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.currentEmployee = action.payload.data;
      state.error = '';
    });
    builder.addCase(fetchCurrentEmployeeThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchCurrentEmployeeThunk.rejected, (state, action)=>{
      state.loading = false;
      state.currentEmployee = {} as EmployeeType;
      state.error = action.error.message;
    });
    // fetchEmployees ------------------------------------------------------------->
    builder.addCase(fetchEmployeesListThunk.fulfilled, (state, action)=>{
      state.employees = action.payload.data;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(fetchEmployeesListThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchEmployeesListThunk.rejected, (state, action)=>{
      state.employees = [...state.employees];
      state.error = action.error.message;
      state.loading = false;
    });

    // createEmployee ------------------------------------------------------------->
    builder.addCase(createEmployeeThunk.fulfilled, (state)=>{
      fetchEmployeesListThunk();
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
      fetchEmployeesListThunk();
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
  setEmployeesList,
  clearCurrentEmployee,
  clearEmployeeError,
} = employeesSlice.actions;