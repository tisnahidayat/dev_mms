import React from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = ({
  name,
  text,
  type,
  placeholder,
  className,
  value,
  onChange,
  error,
  autoFocus = false,
  autoComplete, // Terima autoComplete sebagai props
}) => {
  return (
    <div className={`flex flex-col max-w-md ${className}`}>
      <Label htmlFor={name}>{text}</Label>
      <Input
        id={name}
        type={type}
        name={name}
        autoComplete={autoComplete} // Teruskan autoComplete ke Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`border my-2 ${
          error ? "border-red-500" : "border-gray-300"
        } rounded p-2`}
      />
      <p className="text-red-500 text-sm min-h-1">{error || ""}</p>
    </div>
  );
};

export default InputForm;
