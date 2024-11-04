import React, { useEffect, useState } from "react";
import InputForm from "../elements/InputForm/InputForm";
import { FaCreditCard } from "react-icons/fa";
import { nominal } from "../assets/data/topup";
import { useDispatch, useSelector } from "react-redux";
import { topupAction } from "../redux/Action/transactionAction";
import ConfModal from "../components/ConfModal";
import ResultModal from "../components/ResultModal";
import { useNavigate } from "react-router-dom";
import { resetTrans } from "../redux/Slice/transactionSlice";

const FormTopUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topUp, setTopUp] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const { topSuccess, topError } = useSelector((state) => state.transaction);
  const [success, setSuccess] = useState(false);
  const isFilled = (value) => value.toString().length > 0;

  // Validasi nilai top up
  const isTopUpValid = topUp >= 10000 && topUp <= 1000000;

  const handleTopUpModal = () => {
    setIsConfirm(true);
  };

  const handleConfirm = () => {
    setIsConfirm(false);
    const data = {
      top_up_amount: topUp,
    };

    dispatch(topupAction(data));
  };

  useEffect(() => {
    if (topSuccess) {
      setSuccess(true);
      setIsResult(true);
    } else if (topError) {
      setSuccess(false);
      setIsResult(true);
    }
  }, [topSuccess, topError]);

  const handleCancel = () => {
    setIsConfirm(false);
    setTopUp("");
  };

  const handleCloseResult = () => {
    setIsResult(false);
    if (success) {
      setTopUp("");
      setIsConfirm(false);
      navigate("/dashboard");
    }
  };

  return (
    <form action="">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-[60%] xl:w-[70%] flex flex-col gap-4">
          <div>
            <InputForm
              name="topUp"
              type="number"
              placeholder="masukan nominal top up"
              icon={
                <FaCreditCard
                  className={`w-4 h-4 ${
                    isFilled(topUp) ? "text-black" : "text-gray-300"
                  }`}
                />
              }
              className={`peer block w-full px-3 py-2 border ${
                isTopUpValid ? "border-gray-300" : "border-red-500"
              } rounded-md`}
              value={topUp}
              onChange={(e) => setTopUp(e.target.value)}
            />
            {isFilled(topUp) && !isTopUpValid && (
              <p className="mt-1 text-red-500 text-sm peer-invalid:block">
                Saldo top-up minimal Rp10.000 dan maksimal Rp1.000.000
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleTopUpModal}
            disabled={!isFilled(topUp) || !isTopUpValid}
            className={`w-full px-4 py-2 rounded-md font-semibold ${
              isFilled(topUp) && isTopUpValid
                ? "cursor-pointer bg-red-500 text-white"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            Top Up
          </button>
        </div>

        <div className="lg:w-[40%] xl:w-[30%] grid grid-cols-3 gap-2">
          {nominal.map((item, index) => (
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md bg-white"
              key={index}
              value={item.nominal}
              onClick={() => setTopUp(item.nominal.toString())}
            >
              Rp{item.nominal.toLocaleString("id-ID")}
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfModal
        isOpen={isConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        topUpAmount={topUp}
        title={"Anda yakin untuk top up sebesar"}
        confirm={"Ya, lanjutkan Top Up"}
      />

      {/* Result Modal */}
      <ResultModal
        isOpen={isResult}
        onClose={handleCloseResult}
        isSuccess={success}
        topUpAmount={topUp}
        title={"Top Up sebesar"}
      />
    </form>
  );
};

export default FormTopUp;
