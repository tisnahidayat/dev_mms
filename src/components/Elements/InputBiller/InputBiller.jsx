import React from "react";

function InputBiller({
  label,
  placeholder,
  type = "text",
  required = true,
  value,
  onChange,
  error,
  autoFocus = false,
}) {
  return (
    <div className="">
      <label className="block text-sm font-medium mb-1 text-[#00a78e]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 mb-1 border rounded focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#00a78e]"
        }`}
        value={value}
        onChange={onChange}
      />
      <p className="text-red-500 text-xs">{error || ""}</p>
    </div>
  );
}

export default InputBiller;
