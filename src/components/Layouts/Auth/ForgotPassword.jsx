import React, { useState } from "react";
import BackgroundLayouts from "../Asset/BackgroundLayouts";
import FormForgotPassword from "../../Fragments/FormForgotPassword";

const FormPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex w-full h-screen items-center justify-between">
      <div className="relative hidden md:flex w-3/5 h-full flex-col">
        <BackgroundLayouts />
      </div>

      <div className="w-full md:w-2/5 h-full bg-white flex flex-col justify-center items-center p-6 md:p-14">
        <div className="w-3/4 flex flex-col md:block">
          <FormForgotPassword
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </div>
  );
};

export default FormPassword;
