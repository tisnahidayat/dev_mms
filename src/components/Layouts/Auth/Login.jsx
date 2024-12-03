import React from "react";
import BackgroundLayouts from "../Asset/BackgroundLayouts";
import FormLogin from "../../Fragments/FormLogin";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="relative hidden md:flex w-3/5 h-full flex-col">
        <BackgroundLayouts />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white flex flex-col justify-center items-center p-6 md:p-14">
        <img
          src="/images/logo-mms.png"
          alt="logo-mms"
          className="w-64 md:w-80"
        />
        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-3/4 flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-[#00a78e]">
              Assalamualaikum,
            </h1>
            <h2 className="text-lg md:text-xl font-bold my-2 text-[#F9AD3C]">
              Welcome Back!
            </h2>
            <p className="text-xs md:text-sm text-black my-2">
              Please enter your username and password below to access your
              account.
            </p>
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
