import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Transaction from "../pages/Transaction";
import { useDispatch } from "react-redux";
import { serviceAction } from "../redux/Action/serviceAction";
import { balanceAction } from "../redux/Action/transactionAction";
import LoadingPage from "../components/LoadingPage";

const TransactionLayouts = () => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [Loading]);

  useEffect(() => {
    dispatch(serviceAction(sessionStorage.getItem("token")));
    dispatch(balanceAction(sessionStorage.getItem("token")));
  }, [dispatch]);
  return (
    <div>
      {Loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navbar />
          <Transaction />
        </>
      )}
    </div>
  );
};

export default TransactionLayouts;
