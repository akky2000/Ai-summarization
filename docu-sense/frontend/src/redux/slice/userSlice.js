// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Async thunk to check the authentication status


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user on successful login
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    // Set error on login failure
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    // Clear user and authentication state on logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // Update user info directly
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Clear error messages
    clearError: (state) => {
      state.error = null;
    },
  },

});

export const { loginSuccess, loginFailure, logout, setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
