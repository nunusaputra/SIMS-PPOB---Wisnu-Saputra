import React from "react";
import logo from "../assets/img/Logo.png";

const ConfModal = ({
  isOpen,
  onConfirm,
  onCancel,
  topUpAmount,
  title,
  confirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md w-80">
        <img src={logo} alt="logo" className="mx-auto mb-5 w-10" />
        <p className="mt-2 text-center">
          {title}
          <span className="block text-center text-lg font-bold">
            Rp. {Number(topUpAmount).toLocaleString("id-ID")}?
          </span>
        </p>
        <div className="flex flex-col mt-4 gap-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-transparent text-red-500 font-semibold"
          >
            {confirm}
          </button>
          <button
            onClick={onCancel}
            className="bg-transparent text-gray-500 font-semibold"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfModal;
