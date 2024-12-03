import React from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = ({
  name,
  text,
  type,
  placeholder,
  className = "",
  value,
  onChange,
  error,
  onPaste,
  autoFocus = false,
  autoComplete,
}) => {
  return (
    <div className={`flex flex-col max-w-md ${className}`}>
      <Label htmlFor={name}>{text}</Label>
      <Input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        onPaste={onPaste}
        className={`border my-2 px-3 py-1 rounded ${
          error
            ? "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            : "border-gray-300"
        }`}
      />
    </div>
  );
};

export default InputForm;
