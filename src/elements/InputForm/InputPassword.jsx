import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const InputPassword = ({ name, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  const isFilled = value && value.length > 0;

  return (
    <div className="relative block">
      <span className="sr-only">Password</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <CiLock
          className={`w-4 h-5 ${isFilled ? "text-black" : "text-gray-300"}`}
        />
      </span>
      <span
        className="absolute inset-y-0 right-3 flex items-center pl-2 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? (
          <IoEyeOffOutline
            className={`w-5 h-5 ${isFilled ? "text-black" : "text-gray-300"}`}
          />
        ) : (
          <IoEyeOutline
            className={`w-5 h-5 ${isFilled ? "text-black" : "text-gray-300"}`}
          />
        )}
      </span>
      <input
        required
        type={show ? "text" : "password"}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-sm border border-gray-400 rounded w-full py-2 px-8 text-slate-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
      />
    </div>
  );
};

export default InputPassword;
