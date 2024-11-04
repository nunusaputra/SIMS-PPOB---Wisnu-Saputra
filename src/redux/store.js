import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import serviceReducer from "./Slice/serviceSlice";
import profileReducer from "./Slice/profileSlice";
import transactionReducer from "./Slice/transactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    service: serviceReducer,
    profile: profileReducer,
    transaction: transactionReducer,
  },
  devTools: false,
});

export default store;
