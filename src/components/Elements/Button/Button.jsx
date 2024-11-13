import React from "react";

const Button = ({ className, children }) => {
  return (
    <button
      className={`py-1 rounded-md bg-[#00a78e] hover:bg-[#46BCB0] transition-colors duration-300 font-bold mt-1 text-white focus:outline-none focus:ring-2 focus:ring-[#46BCB0] focus:shadow-lg focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
