import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    userId: "",
    email: "",
    token: "",
    name: "",
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.userId = "";
      state.email = "";
      state.token = "";
      state.name = "";
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
