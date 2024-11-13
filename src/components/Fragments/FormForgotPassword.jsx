import React, { useState } from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link, useNavigate } from "react-router-dom";

const FormForgotPassword = ({ email, setEmail, error, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const staticEmail = "tisnahidayat150302@gmail.com";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (email === staticEmail) {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/email-sent");
      }, 1500);
    } else {
      setError("Email not found.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {" "}
      {isLoading && (
        <div className="absolute flex justify-center items-center inset-0 z-50">
          <img
            src="/images/loader.gif"
            alt="Loading..."
            className="w-10 h-10"
          />
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <InputForm
          name="email"
          text="Email"
          type="text"
          placeholder="Enter your email"
          autoFocus
          autoComplete="email"
          value={email}
          onChange={handleChange}
          error={error}
          required
        />
        <Button className="w-full" type="submit" disabled={isLoading}>
          Submit
        </Button>
        <p className="text-center mt-5 font-semibold text-sm">
          Back to{" "}
          <Link
            to="/login"
            className="font-semibold text-sm text-[#00a78e] cursor-pointer focus:outline-none"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default FormForgotPassword;
