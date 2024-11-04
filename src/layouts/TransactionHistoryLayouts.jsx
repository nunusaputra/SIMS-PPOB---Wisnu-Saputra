import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TransactionHistory from "../pages/TransactionHistory";
import LoadingPage from "../components/LoadingPage";

const TransactionHistoryLayouts = () => {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [Loading]);
  return (
    <div className="mb-20">
      {Loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <TransactionHistory />
        </>
      )}
    </div>
  );
};

export default TransactionHistoryLayouts;
