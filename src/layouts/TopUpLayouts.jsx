import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TopUp from "../pages/TopUp";
import LoadingPage from "../components/LoadingPage";

const TopUpLayouts = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [Loading]);
  return (
    <div>
      {Loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <TopUp />
        </>
      )}
    </div>
  );
};

export default TopUpLayouts;
