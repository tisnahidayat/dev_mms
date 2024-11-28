import React, { useState } from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../services/authAPI";

const FormForgotPassword = ({ email, setEmail, error, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email) {
      setEmailError("Email cannot be empty.");
      setIsLoading(false);
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format, please check again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await forgetPassword(email);

      if (response?.status === 200) {
        navigate("/email-sent");
      } else if (response?.status === 400) {
        setEmailError("Email not found, please try again.");
      } else {
        setError("Failed to send email, please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      if (error.response?.status === 400) {
        setEmailError("Email not found, please try again.");
      } else {
        setError("Failed to send email, please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
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
          error={emailError}
          required
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
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
