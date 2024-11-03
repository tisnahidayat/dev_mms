import React from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";

const FormForgotPassword = () => {
  return (
    <div>
      <InputForm
        name="password"
        text="Password"
        type="password"
        placeholder="Enter your password"
      />
      <InputForm
        name="new-password"
        text="Retype Password"
        type="password"
        placeholder="Enter your retype password"
      />
      <Button className={'w-full'}>Submit</Button>
    </div>
  );
};

export default FormForgotPassword;
