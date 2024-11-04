import React, { useEffect, useState } from "react";
import InputForm from "../elements/InputForm/InputForm";
import { FaCreditCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { withdrawAction } from "../redux/Action/transactionAction";
import ConfModal from "../components/ConfModal";
import ResultModal from "../components/ResultModal";
import { useNavigate } from "react-router-dom";

const FormTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { balance, withSucc, withErr, message } = useSelector(
    (state) => state.transaction
  );
  const { data } = useSelector((state) => state.service);
  const listrik = data.find((item) => item.service_name === "Listrik");
  const [bayar, setBayar] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validate if saldo is not enough
  const isBalanceValid = Number(balance?.balance <= bayar);

  const handleBayarModal = () => {
    setIsConfirm(true);
  };

  const handleConfirm = () => {
    if (isBalanceValid) {
      return toast.error("Saldo tidak mencukupi");
    }
    setIsConfirm(false);
    const data = {
      service_code: listrik.service_code,
    };

    dispatch(withdrawAction(data));
  };

  const handleCancel = () => {
    setIsConfirm(false);
    setTopUp("");
  };

  const handleCloseResult = () => {
    setIsResult(false);
    if (success) {
      setBayar("");
      setIsConfirm(false);
      navigate("/transaction-history");
    }
  };

  useEffect(() => {
    if (withSucc) {
      setSuccess(true);
      setIsResult(true);
    } else if (withErr) {
      setSuccess(false);
      setIsResult(true);
    }
  }, [withSucc, withErr]);

  useEffect(() => {
    if (listrik) {
      setBayar(listrik.service_tariff || 0);
    }
  }, [listrik]);

  return (
    <form action="">
      <div className="flex flex-col gap-4">
        <div>
          <InputForm
            name="bayar"
            type="number"
            placeholder="masukan nominal bayar"
            icon={<FaCreditCard className={`w-4 h-4 text-black`} />}
            value={bayar}
            onChange={(e) => setBayar(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleBayarModal}
          className={`w-full px-4 py-2 rounded-md font-semibold bg-red-500 text-white`}
        >
          Bayar
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfModal
        isOpen={isConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        topUpAmount={bayar}
        title={"Beli listrik prabayar senilai"}
        confirm={"Ya, lanjutkan Bayar"}
      />

      {/* Result Modal */}
      <ResultModal
        isOpen={isResult}
        onClose={handleCloseResult}
        isSuccess={success}
        topUpAmount={bayar}
        title={"Pembayaran listrik prabayar sebesar"}
      />
    </form>
  );
};

export default FormTransaction;
