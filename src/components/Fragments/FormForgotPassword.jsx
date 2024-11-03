import React from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link } from "react-router-dom";

const FormForgotPassword = () => {
  return (
    <div>
      <InputForm
        name="email"
        text="Email"
        type="text"
        placeholder="Enter your email"
      />
      <Button className={"w-full"}>Submit</Button>
      <p className="text-center mt-5 font-semibold text-sm">
        {" "}
        Back to{" "}
        <Link
          to="/login"
          className="font-semibold text-sm text-[#00a78e] cursor-pointer focus:outline-none"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default FormForgotPassword;
