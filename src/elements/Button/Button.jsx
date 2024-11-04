import React from "react";

const Button = ({
  type,
  color,
  style,
  children,
  margin,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-md ${style} ${color} ${margin}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
