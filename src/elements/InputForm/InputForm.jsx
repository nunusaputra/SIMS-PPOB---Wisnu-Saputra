import React, { forwardRef } from "react";

const InputForm = forwardRef((props, ref) => {
  const { name, type, placeholder, value, onChange, icon, style, disabled } =
    props;

  return (
    <div className="relative block">
      <span className="sr-only">Input</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        {icon}
      </span>
      <input
        required
        disabled={disabled}
        ref={ref}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`text-sm border border-gray-400 rounded w-full py-2 px-8 text-slate-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent ${style}`}
      />
    </div>
  );
});

export default InputForm;
