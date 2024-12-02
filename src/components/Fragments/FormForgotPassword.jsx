import React, { useState } from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword } from "../../services/authAPI";

const FormForgotPassword = ({ email, setEmail, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [gifSource, setGifSource] = useState("/images/send-email.gif"); // Default GIF saat loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setEmailError("");
    setGifSource("/images/send-email.gif"); // Reset GIF ke loading saat input berubah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError("");

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;

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

      if (response?.status === "success") {
        setGifSource("/images/email-success.gif");
        setTimeout(() => {
          navigate("/login");
        }, 60000);
      }
    } catch (error) {
      setTimeout(() => {
        setEmailError("Email not found, please check again.");
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
          <div className="flex flex-col justify-center items-center">
            <img
              src={gifSource}
              alt="Sending email..."
              className="mb-5 w-40 mx-auto"
            />
            <h1 className="text-xl md:text-2xl font-bold text-[#00a78e] text-center">
              Please wait while we process your request
            </h1>
            <p className="text-xs md:text-sm text-black my-2 text-center">
              We're sending the password reset instructions to your email.
            </p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-xl md:text-2xl font-bold mt-10 text-[#00a78e]">
            Forgot Password
          </h1>
          <p className="text-xs md:text-sm text-black my-3">
            Please enter your email address below, and we will send you
            instructions on how to reset your password.
          </p>
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
            {emailError && <p className="text-red-600 text-sm">{emailError}</p>}{" "}
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
        </>
      )}
    </div>
  );
};

export default FormForgotPassword;
