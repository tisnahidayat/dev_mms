import React from "react";

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-md font-semibold text-[#00a78e]">
      {children}
    </label>
  );
};

export default Label;
