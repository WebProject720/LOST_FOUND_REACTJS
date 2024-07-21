import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  LoggedUser: null,
};

const LoggedUserSlice = createSlice({
  name: "LoggedUser",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.LoggedUser = action.payload.LoggedUser;
    },
    logout: (state) => {
      state.status = false;
      state.LoggedUser = null;
    },
  },
});
export const { login, logout, deletePostfromUser } = LoggedUserSlice.actions;

const LoggedUserReducer = LoggedUserSlice.reducer;
export { LoggedUserReducer };
