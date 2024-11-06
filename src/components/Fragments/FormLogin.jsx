import React, { useState } from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link } from "react-router-dom";
import Login from "../../services/auth.service";

const FormLogin = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.username) {
      newErrors.username = "Username is required";
    }
    if (!formValues.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setLoginError("");

      Login(formValues)
        .then((response) => {
          console.log("Login berhasil:", response);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log("Login gagal:", error);
          setLoginError("Username or password incorrect");
        })
        .finally(() => {
          setLoading(false);
        });
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
          placeholder="Enter your password"
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
          autoComplete="current-password"
        />
        {loginError && <p className="text-red-600">{loginError}</p>}{" "}
        {/* Nampilin error login */}
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
