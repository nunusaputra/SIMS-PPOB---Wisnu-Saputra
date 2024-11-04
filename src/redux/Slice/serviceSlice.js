import { createSlice } from "@reduxjs/toolkit";
import { bannerAction, serviceAction } from "../Action/serviceAction";

const initialState = {
  data: [],
  banner: [],
  isLoading: false,
  Error: false,
  Sukses: false,
  message: "",
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    resetData: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Service Slice
    builder.addCase(serviceAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(serviceAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Sukses = true;
      state.data = action.payload.data;
    });
    builder.addCase(serviceAction.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Banner Slice
    builder.addCase(bannerAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(bannerAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Sukses = true;
      state.banner = action.payload.data;
    });
    builder.addCase(bannerAction.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });
  },
});

export const { resetData } = serviceSlice.actions;
export default serviceSlice.reducer;
