import React from "react";

function SelectBiller({
  label,
  options = [],
  required = false,
  value,
  onChange,
  error,
}) {
  return (
    <div className="">
      <label className="block text-sm font-medium mb-1 text-[#00a78e]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#00a78e]"
        }`}
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label.toLowerCase()}...</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Area pesan error dengan min-h untuk menjaga ruang tetap */}
      <p className="text-red-500 text-xs">{error || ""}</p>
    </div>
  );
}

export default SelectBiller;
