import { createSlice } from "@reduxjs/toolkit";
import { loginAction, regisAction } from "../Action/authAction";

const initialState = {
  user: {
    email: "",
    token: "",
  },
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Registration Slice
    builder.addCase(regisAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(regisAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(regisAction.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Login Slice
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
