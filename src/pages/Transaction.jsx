import React from "react";
import HeroBanner from "../components/HeroBanner";
import listrik from "../assets/img/Listrik.png";
import FormTransaction from "../fragments/FormTransaction";

const Transaction = () => {
  return (
    <div>
      <HeroBanner />
      <div className="container w-full flex flex-col gap-10">
        <div className="">
          <h1 className="text-2xl">Pembayaran</h1>
          <div className="flex gap-2">
            <img src={listrik} alt="Listrik" className="w-12" />
            <h1 className="text-lg font-semibold self-center">
              Listrik Prabayar
            </h1>
          </div>
        </div>
        <div className="w-full">
          <FormTransaction />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
