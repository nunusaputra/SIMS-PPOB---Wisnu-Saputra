import { createSlice } from "@reduxjs/toolkit";
import {
  balanceAction,
  topupAction,
  withdrawAction,
} from "../Action/transactionAction";

const initialState = {
  topup: [],
  balance: [],
  data: [],
  isLoad: false,
  Iserror: false,
  Issukses: false,
  topSuccess: false,
  topError: false,
  withSucc: false,
  withErr: false,
  message: "",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTrans: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Top Up Slice
    builder.addCase(topupAction.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(topupAction.fulfilled, (state, action) => {
      state.isLoad = false;
      state.topSuccess = true;
      state.data = action.payload.data;
    });
    builder.addCase(topupAction.rejected, (state, action) => {
      state.isLoad = false;
      state.topError = true;
      state.message = action.payload;
    });

    // * Withdraw Slice
    builder.addCase(withdrawAction.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(withdrawAction.fulfilled, (state, action) => {
      state.isLoad = false;
      state.withSucc = true;
      state.message = action.payload.message;
      state.data = action.payload.data;
    });
    builder.addCase(withdrawAction.rejected, (state, action) => {
      state.isLoad = false;
      state.withErr = true;
      state.message = action.payload;
    });

    // * Balance Slice
    builder.addCase(balanceAction.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(balanceAction.fulfilled, (state, action) => {
      state.isLoad = false;
      state.Issukses = true;
      state.balance = action.payload.data;
    });
    builder.addCase(balanceAction.rejected, (state, action) => {
      state.isLoad = false;
      state.Iserror = true;
      state.message = action.payload;
    });
  },
});

export const { resetTrans } = transactionSlice.actions;
export default transactionSlice.reducer;
