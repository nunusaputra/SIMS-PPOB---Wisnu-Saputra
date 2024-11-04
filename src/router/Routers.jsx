import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProfileLayouts from "../layouts/ProfileLayouts";
import TopUpLayouts from "../layouts/TopUpLayouts";
import TransactionLayouts from "../layouts/TransactionLayouts";
import TransactionHistoryLayouts from "../layouts/TransactionHistoryLayouts";
import { toast } from "react-toastify";
import DashboardLayouts from "../layouts/DashboardLayouts";
import NotFound from "../pages/NotFound";

const PrivateRoutes = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    toast.error("Kamu harus login dulu!");
    return <Navigate to={"/"} replace />;
  }
  return children;
};
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoutes>{<DashboardLayouts />}</PrivateRoutes>}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <ProfileLayouts />
            </PrivateRoutes>
          }
        />
        <Route
          path="/topup"
          element={
            <PrivateRoutes>
              <TopUpLayouts />
            </PrivateRoutes>
          }
        />
        <Route
          path="/transaction"
          element={
            <PrivateRoutes>
              <TransactionLayouts />
            </PrivateRoutes>
          }
        />
        <Route
          path="/transaction-history"
          element={
            <PrivateRoutes>
              <TransactionHistoryLayouts />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default Routers;
