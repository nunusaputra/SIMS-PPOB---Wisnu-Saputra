import React from "react";
import logo from "../assets/img/Logo.png";
const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-60 h-60 flex items-center justify-center">
        <div className="loader flex flex-col items-center justify-center">
          <div className="w-12 h-12 mx-auto mb-3">
            <img src={logo} alt="Logo" className="w-full" />
          </div>
          <div className="text-2xl font-semibold">SIMS PPOB</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
