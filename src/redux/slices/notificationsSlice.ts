import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NotificationType from "../../types/notificationType";

type InitialState = {
  loading: boolean,
  notifications: NotificationType[];
  error: any,
};

const initialState: InitialState = {
  loading: false,
  notifications: [],
  error: "",
};

const notificationsUrl: URL= new URL("http://localhost:5000/remazon/notifications");

// Api Calls --------------------------------------------------------------------------------->

export const fetchNotificationsThunk = createAsyncThunk("notifications/fetch", async (_thunkApi)=>{
  const response = await fetch(notificationsUrl, {
    method: "GET",
  });
  const data = response.json();
  return data;
});

const notificationsSlice = createSlice({
  name: "applicationsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsThunk.fulfilled, (state, action)=>{
      state.notifications = action.payload.data;
      state.error = "";
      state.loading = false;
    });
    builder.addCase(fetchNotificationsThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(fetchNotificationsThunk.rejected, (state, action)=>{
      state.notifications = [...state.notifications];
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default notificationsSlice.reducer;