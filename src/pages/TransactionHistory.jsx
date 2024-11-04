import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import axios from "axios";
import Loading from "../components/Loading";

const TransactionHistory = () => {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const limit = 5;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/transaction/history`,
        {
          params: { limit, offset },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.data.records && response.data.data.records.length > 0) {
        setTransaction((prev) => [...prev, ...response.data.data.records]);
        setOffset((prevOffset) => prevOffset + limit);

        if (response.data.data.records.length < limit) {
          setShowMore(false);
        }
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <HeroBanner />
      <div className="container w-full flex flex-col gap-4">
        <h1 className="text-xl font-medium">Semua Transaksi</h1>

        {isLoading ? (
          <Loading />
        ) : (
          transaction.map((item, index) => (
            <div
              className="p-4 border border-gray-300 bg-white flex justify-between rounded-lg"
              key={index}
            >
              <div className="flex flex-col gap-1">
                <h1
                  className={`${
                    item.transaction_type === "TOPUP"
                      ? "text-cyan-300"
                      : "text-red-400"
                  } text-xl font-semibold`}
                >
                  {item.transaction_type === "TOPUP"
                    ? `+ ${item.total_amount}`
                    : `- ${item.total_amount}`}
                </h1>
                <p className="text-md text-gray-400">{item.created_on}</p>
              </div>
              <div className="self-center">
                <h2 className="text-sm">{item.description}</h2>
              </div>
            </div>
          ))
        )}

        {showMore ? (
          <button
            className="bg-blue-500 px-4 py-2 mx-auto rounded-lg text-white font-semibold"
            onClick={fetchData}
          >
            Show More
          </button>
        ) : (
          <p className="text-center text-sm">No more data transaction</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
