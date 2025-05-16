// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slice/userSlice';
import documentReducer from './slice/documentSlice'



const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth','documents'], // Persist only the auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  documents: documentReducer,

 
  // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Redux Toolkit includes useful default middleware including redux-thunk
});

export const persistor = persistStore(store);
