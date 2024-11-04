import React, { useEffect, useState } from "react";
import photo_profile from "../assets/img/Profile-Photo.png";
import bg from "../assets/img/Background-Saldo.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../redux/Action/profileAction";
import { balanceAction } from "../redux/Action/transactionAction";

const HeroBanner = () => {
  const dispatch = useDispatch();
  const { Load, profile } = useSelector((state) => state.profile);
  const { balance } = useSelector((state) => state.transaction);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    dispatch(profileAction(token));
    dispatch(balanceAction(token));
  }, [token, dispatch]);

  return (
    <section className="w-full container flex flex-col lg:flex-row gap-4">
      <div className="lg:w-[40%] min-h-32">
        <div className="flex flex-col items-center justify-center lg:items-start lg:justify-between h-full">
          <div className="w-24 h-24 rounded-full border border-gray-300">
            <img
              src={
                profile?.profile_image ===
                "https://minio.nutech-integrasi.com/take-home-test/null"
                  ? photo_profile
                  : profile?.profile_image
              }
              alt={profile?.first_name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="">
            <h1 className="text-xl text-center lg:text-left">
              Selamat datang,
            </h1>
            <h1 className="text-2xl font-semibold text-center lg:text-left">
              {profile?.first_name + " " + profile?.last_name}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="lg:w-[60%] min-h-48 bg-cover bg-center rounded-xl p-8"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-white font-medium">Saldo anda</h1>
          <h1 className="text-3xl text-white font-semibold">
            {show
              ? `Rp.${balance?.balance.toLocaleString("id-ID")}`
              : "Rp. ****"}
          </h1>
          <div className="w-[10rem] py-2 bg-[#F13B2F] flex gap-2">
            <h2 className="text-md text-white">Tutup saldo</h2>
            <div
              className="cursor-pointer self-center"
              onClick={() => handleShow()}
            >
              {show ? (
                <IoEyeOffOutline className={`w-4 h-4 text-gray-300`} />
              ) : (
                <IoEyeOutline className={`w-4 h-4 text-gray-300`} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
