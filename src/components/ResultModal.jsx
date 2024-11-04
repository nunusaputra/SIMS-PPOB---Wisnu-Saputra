import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const ResultModal = ({ isOpen, onClose, isSuccess, topUpAmount, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md w-80">
        <div className="w-12 h-12 flex items-center justify-center mx-auto rounded-full">
          {isSuccess ? (
            <FaCheckCircle className="text-5xl mx-auto text-green-500" />
          ) : (
            <FaCircleXmark className="text-5xl mx-auto w-full text-red-500" />
          )}
        </div>
        <p className="mt-3 text-center text-md">{title}</p>
        <p className="text-center text-2xl font-bold">
          Rp. {Number(topUpAmount).toLocaleString("id-ID")}
        </p>
        <h2 className="text-md text-center mt-1">
          {isSuccess ? "berhasil" : "gagal"}
        </h2>
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-transparent text-red-500 font-semibold"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
