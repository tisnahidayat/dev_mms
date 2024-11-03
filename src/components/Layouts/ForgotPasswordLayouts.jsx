import React from "react";
import BackgroundLayouts from "./Asset/BackgroundLayouts";
const FormPasswordLayout = ({ children }) => {
  return (
    <div className="relative flex w-full h-screen items-center justify-between">
      <div className="relative hidden md:flex w-3/5 h-full flex-col">
        <BackgroundLayouts />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white flex flex-col justify-center items-center p-6 md:p-14">
        <div className="w-3/4 flex flex-col md:block">
          <form action="#">
            <h1 className="text-xl md:text-2xl font-bold mt-10 text-[#00a78e]">
              Forgot Password
            </h1>
            <p className="text-xs md:text-sm text-black my-3">
              Please enter your email address and username below, and we will
              send you instructions on how to reset your password.
            </p>
            {children}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPasswordLayout;
