import { createSlice } from "@reduxjs/toolkit";
import {
  handleRegistration,
  handleLogin,
  handleLogout,
  changeAvatar,
} from "./auth-operations";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser: (store, { payload }) => {
      store.user = payload;
      store.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------Registration--------------
      .addCase(handleRegistration.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(handleRegistration.fulfilled, (store, { payload }) => {
        store.user = payload;
        store.isLoading = false;
        store.isAuth = true;
      })
      .addCase(handleRegistration.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })

      // ------------Login--------------
      .addCase(handleLogin.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(handleLogin.fulfilled, (store, { payload }) => {
        store.user = payload;
        store.isLoading = false;
        store.isAuth = true;
      })
      .addCase(handleLogin.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })

      // ------------Logout--------------
      .addCase(handleLogout.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(handleLogout.fulfilled, () => ({ ...initialState }))
      .addCase(handleLogout.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      })
      .addCase(changeAvatar.pending, (store) => {
        store.isLoading = true;
        store.error = null;
      })
      .addCase(changeAvatar.fulfilled, (store, { payload }) => {
        store.user.avatar = payload;
        store.isLoading = false;
      })
      .addCase(changeAvatar.rejected, (store, { payload }) => {
        store.isLoading = false;
        store.error = payload;
      });
  },
});

export const { getCurrentUser } = authSlice.actions;
export default authSlice.reducer;
