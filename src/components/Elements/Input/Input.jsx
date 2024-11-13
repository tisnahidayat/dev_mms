import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  autoFocus,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isPasswordType = type === "password";
  return (
    <div className="relative w-full max-w-md">
      <input
        type={isPasswordType && showPassword ? "text" : type}
        name={name}
        id={name}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`px-3 py-1 rounded-md border border-[#00a78e] focus:outline-none focus:ring-2 focus:ring-[#00a78e] focus:shadow-md focus:ring-offset-2 w-full ${className}`}
      />
      {isPasswordType && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash className="text-[#00a78e]" /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default Input;
