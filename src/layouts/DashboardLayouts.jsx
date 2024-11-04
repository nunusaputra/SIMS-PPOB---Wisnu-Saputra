import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import LoadingPage from "../components/LoadingPage";

const DashboardLayouts = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [Loading]);
  return (
    <div className="mb-10">
      {Loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <Dashboard />
        </>
      )}
    </div>
  );
};

export default DashboardLayouts;
