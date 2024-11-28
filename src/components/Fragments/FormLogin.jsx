import React, { useState } from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authAPI";

const FormLogin = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Reset error for the current field
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.username.trim()) {
      newErrors.username = true; // Mark field with error
    }
    if (!formValues.password.trim()) {
      newErrors.password = true; // Mark field with error
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoginError("Username and password are required");
      return false;
    }

    return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Form
    if (!validateForm()) return;

    setLoading(true);
    setLoginError("");

    try {
      await login(formValues);
      navigate("/biller");
    } catch (error) {
      console.error("Login gagal:", error.message || error);
      setLoginError("Username or password incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute flex justify-center items-center inset-0 z-50">
          <img
            src="/images/loader.gif"
            alt="loading..."
            className="w-10 h-10"
          />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <InputForm
          name="username"
          text="Username"
          type="text"
          placeholder="Enter your username"
          value={formValues.username}
          onChange={handleChange}
          error={errors.username}
          autoFocus
          autoComplete="username"
        />
        <InputForm
          name="password"
          text="Password"
          type="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleChange}
          error={errors.password}
          onPaste={(e) => e.preventDefault()}
          autoComplete="current-password"
        />
        {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
        <p className="text-end mb-2">
          <Link
            to="/forgot-password"
            className="font-semibold text-sm text-[#00a78e] cursor-pointer focus:outline-none"
          >
            Forgot password?
          </Link>
        </p>
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default FormLogin;
