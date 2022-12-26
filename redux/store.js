import { configureStore, combineReducers } from "@reduxjs/toolkit";

import dashboardReducer from "./dashboard/dashboard-slice";
import authReducer from "./auth/auth-slice";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
