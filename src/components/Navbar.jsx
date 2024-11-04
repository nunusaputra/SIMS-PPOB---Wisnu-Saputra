import React from "react";
import logo from "../assets/img/Logo.png";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { href: "/topup", label: "Top Up" },
    { href: "/transaction", label: "Transaction" },
    { href: "/profile", label: "Akun" },
  ];

  return (
    <nav className="container border-b-2 bg-white border-gray-300 w-full h-16 flex justify-between items-center sticky top-0 z-50">
      <a href={"/dashboard"}>
        <div className="flex gap-2">
          <img src={logo} alt="logo" />
          <h1 className="self-center font-semibold text-xl">SIMS PPOB</h1>
        </div>
      </a>
      <div className="flex gap-4">
        {links.map((link, index) => {
          const isActive = location.pathname === link.href;
          return (
            <a
              key={index}
              href={link.href}
              className={` 
              ${
                isActive
                  ? "text-sm font-medium text-red-500"
                  : "text-sm font-medium"
              } cursor-pointer`}
            >
              <h1 className="text-md font-semibold">{link.label}</h1>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
