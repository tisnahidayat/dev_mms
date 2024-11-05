import React, { useState } from "react";
import BackgroundLayouts from "./Asset/BackgroundLayouts";
import FormForgotPassword from "../Fragments/FormForgotPassword";

const FormPasswordLayout = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required"); // Tampilkan error jika email kosong
    } else {
      setError("");
      console.log("Email submitted:", email);
      // Lakukan aksi submit lain, misalnya mengirim data ke server
    }
  };

  return (
    <div className="relative flex w-full h-screen items-center justify-between">
      <div className="relative hidden md:flex w-3/5 h-full flex-col">
        <BackgroundLayouts />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white flex flex-col justify-center items-center p-6 md:p-14">
        <div className="w-3/4 flex flex-col md:block">
          <form onSubmit={handleSubmit} noValidate>
            <h1 className="text-xl md:text-2xl font-bold mt-10 text-[#00a78e]">
              Forgot Password
            </h1>
            <p className="text-xs md:text-sm text-black my-3">
              Please enter your email address and username below, and we will
              send you instructions on how to reset your password.
            </p>
            <FormForgotPassword
              email={email}
              setEmail={setEmail}
              error={error}
              setError={setError}
                          />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPasswordLayout;
