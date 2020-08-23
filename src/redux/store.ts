import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";

const store = configureStore({
  reducer: { authSlice },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
