import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from '../features/authorizationSlice.js';

export default configureStore({
  reducer: {
    authorization: authorizationReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
});