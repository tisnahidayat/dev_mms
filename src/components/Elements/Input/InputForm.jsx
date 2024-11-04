import React from "react";
import Input from "./Input";
import Label from "./Label";

const InputForm = ({ name, text, type, placeholder, className }) => {
  return (
    <div className={`flex flex-col max-w-md ${className}`}>
      <Label htmlFor={name}>{text}</Label>
      <Input
        id={name}
        type={type}
        name={name}
        autoComplete={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
