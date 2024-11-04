import React, { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import FormTopUp from "../fragments/FormTopUp";

const TopUp = () => {
  return (
    <div>
      <HeroBanner />
      <div className="container w-full">
        <div className="mb-16">
          <h1 className="text-lg">Silahkan Masukan</h1>
          <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <FormTopUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUp;
