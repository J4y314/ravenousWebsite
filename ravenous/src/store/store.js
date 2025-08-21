import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js'

export default configureStore({
    reducer: {
      // Assigning authReducer to handle auth state
      auth: authReducer,
    },
  });