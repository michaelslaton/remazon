import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import NotificationType, { NotificationPostType } from '../../types/notificationType';

type InitialState = {
  loading: boolean,
  notifications: NotificationType[];
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  notifications: [],
  error: '',
};

const API_URL = import.meta.env.VITE_REMAZON_API_URL || "http://localhost:5000";
const notificationsUrl: URL= new URL(`${API_URL}/remazon/notifications`);

// Api Calls --------------------------------------------------------------------------------->

export const fetchNotificationsThunk = createAsyncThunk('notifications/fetch', async (uid: string, _thunkApi)=>{
  const response = await fetch(`${notificationsUrl}/${uid}`, {
    method: 'GET',
  });
  const data = response.json();
  return data;
});

export const createNotificationThunk = createAsyncThunk('notifications/create', async (newNotification: NotificationPostType, _thunkApi)=> {
  const response = await fetch(notificationsUrl, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body:JSON.stringify(newNotification)
  });
  const data = response.json();
  return data;
});

export const removeNotificationThunk = createAsyncThunk('notifications/remove', async (mydata: {uid: string, id: number}, _thunkApi)=> {
  const { uid, id } = mydata;
  const response = await fetch(`${notificationsUrl}/${uid}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
  });
  const data = response.json();
  return data;
});

// -------------------------------------------------------------------------------------------->

const notificationsSlice = createSlice({
  name: 'applicationsSlice',
  initialState,
  reducers: {
    clearNotificationsError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {

    // Fetch Notifications -------------------------------------------------------------------->
    builder.addCase(fetchNotificationsThunk.fulfilled, (state, action)=>{
      state.notifications = action.payload.data;
      state.error = '';
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

    // createProject ------------------------------------------------------------->
    builder.addCase(createNotificationThunk.fulfilled, (state)=>{
      state.error = '';
      state.loading = false;
    });
    builder.addCase(createNotificationThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(createNotificationThunk.rejected, (state, action)=>{
      state.notifications = [...state.notifications];
      state.error = action.error.message;
      state.loading = false;
    });

    // Remove Notifications -------------------------------------------------------------------->
    builder.addCase(removeNotificationThunk.fulfilled, (state, action)=>{
      state.notifications = action.payload.data;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(removeNotificationThunk.pending, (state)=>{
      state.loading = true;
    });
    builder.addCase(removeNotificationThunk.rejected, (state, action)=>{
      state.notifications = [...state.notifications];
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default notificationsSlice.reducer;
export const {
  clearNotificationsError
} = notificationsSlice.actions;