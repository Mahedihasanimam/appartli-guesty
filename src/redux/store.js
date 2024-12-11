import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { api } from './api/ApiSlice';
import useTokenReducer from './features/users/UserTokenSlice';
import  userReducer  from './features/users/userSlice';
import  formReducer  from './features/addPropertySlice/AddPropertySlice';

const store = configureStore({
  reducer : {
    UserAccessToken: useTokenReducer,
    user:userReducer,
    form:formReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export default store;
