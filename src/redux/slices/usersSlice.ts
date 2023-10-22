import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserType, { UserPostType } from "../../types/userType";

type InitialState = {
  loading: boolean;
  currentUser: UserType | null;
  error: any,
};

const initialState: InitialState = {
  loading: false,
  currentUser: null,
  error: '',
};

const usersUrl: URL = new URL("http://localhost:5001/remazon/users");

// Api Calls --------------------------------------------------------------------------------->

export const fetchUserThunk = createAsyncThunk("users/fetch", async (uid: string, _thunkApi)=>{
  const response = await fetch(`${usersUrl}/${uid}`, {
    method: "GET",
  })
  const data = response.json();
  return data;
});

export const createUserThunk = createAsyncThunk("users/create", async (newUser: UserPostType, _thunkApi)=> {
  const response = await fetch(usersUrl, {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify(newUser)
  })
  const data = response.json();
  return data;
});
// -------------------------------------------------------------------------------------------->

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUser ------------------------------------------------------------->
    builder.addCase(fetchUserThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.currentUser = action.payload.data;
      state.error = '';
    });
    builder.addCase(fetchUserThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchUserThunk.rejected, (state, action)=>{
      state.loading = false;
      state.currentUser = {} as UserType;
      state.error = action.error.message;
    });

    // createUser ------------------------------------------------------------->
    builder.addCase(createUserThunk.fulfilled, (state, action)=>{
      state.loading = false;
      state.currentUser = action.payload.data;
      state.error = '';
    });
    builder.addCase(createUserThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createUserThunk.rejected, (state, action)=>{
      state.loading = false;
      state.currentUser = {} as UserType;
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;
export const {
  clearUser,
} = userSlice.actions;