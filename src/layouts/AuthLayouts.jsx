import React from "react";
import photo from "../assets/img/Illustrasi-Login.png";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const AuthLayouts = ({ title, children, type }) => {
  return (
    <div className="w-full h-screen lg:flex">
      <div className="w-full lg:w-[55%] h-full flex justify-center items-center">
        <section className="container flex flex-col gap-4 items-center justify-center">
          <div className="flex gap-2">
            <img src={logo} alt="logo" />
            <h1 className="self-center font-semibold text-xl">SIMS PPOB</h1>
          </div>
          <div className="w-[80%] lg:w-[50%] text-2xl font-medium mt-2 mb-4 text-center">
            {title}
          </div>
          <div className="w-[70%]">{children}</div>
          <Navigation type={type} />
        </section>
      </div>
      <div className="hidden lg:block lg:w-[45%] h-full">
        <img src={photo} alt="Illustrasi Login" className="w-full h-full" />
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  if (type === "login" || type === "Login") {
    return (
      <p className="text-sm text-center mt-5">
        belum punya akun? registrasi{" "}
        <Link to="/register" className="text-red-600 font-bold">
          di sini
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm text-center mt-5">
        sudah punya akun? login{" "}
        <Link to="/" className="text-red-600 font-bold">
          di sini
        </Link>
      </p>
    );
  }
};

export default AuthLayouts;
