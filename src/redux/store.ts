import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import navControlReducer from "./slices/controlsSlice";
import employeesReducer from "./slices/employeesSlice";
import projectsReducer from "./slices/projectsSlice";
import ranksReducer from "./slices/ranksSlice";
import userReducer from "./slices/usersSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    blacklist: [ "navControl", "ranksControl", "projectsControl" ],
};

const reducer = combineReducers({
    navControl: navControlReducer,
    employeesControl: employeesReducer,
    projectsControl: projectsReducer,
    ranksControl: ranksReducer,
    userControl: userReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
            },
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;