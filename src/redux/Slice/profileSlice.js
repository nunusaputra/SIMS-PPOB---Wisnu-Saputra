import { createSlice } from "@reduxjs/toolkit";
import { profileAction, updateProfile } from "../Action/profileAction";

const initialState = {
  profile: [],
  Load: false,
  error: false,
  sukses: false,
  message: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Profile Slice
    builder.addCase(profileAction.pending, (state) => {
      state.Load = true;
    });
    builder.addCase(profileAction.fulfilled, (state, action) => {
      state.Load = false;
      //   state.sukses = true;
      state.profile = action.payload.data;
    });
    builder.addCase(profileAction.rejected, (state, action) => {
      state.Load = false;
      state.error = true;
      state.message = action.payload;
    });

    // * Update Profile Slice
    builder.addCase(updateProfile.pending, (state) => {
      state.Load = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.Load = false;
      state.sukses = true;
      state.message = action.payload.message;
      state.profile = action.payload.data;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.Load = false;
      state.error = true;
      state.message = action.payload;
    });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
