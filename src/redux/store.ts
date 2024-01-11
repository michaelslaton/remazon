import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import mainControlReducer from './slices/controlsSlice';
import employeesReducer from './slices/employeesSlice';
import projectsReducer from './slices/projectsSlice';
import ranksReducer from './slices/ranksSlice';
import awardsReducer from './slices/awardsSlice';
import notificationsReducer from './slices/notificationsSlice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [ 'mainControl', 'notificationsControl' ],
};

const reducer = combineReducers({
    mainControl: mainControlReducer,
    employeesControl: employeesReducer,
    projectsControl: projectsReducer,
    ranksControl: ranksReducer,
    awardsControl: awardsReducer,
    notificationsControl: notificationsReducer,
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