import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { resetPassword } from "../../services/authAPI";

const FormSetNewPassword = () => {
  const [formValues, setFormValues] = useState({
    password: "",
    retypePassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setResetError("Invalid or expired token");
      navigate("/login");
    }
  }, [location, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.password.trim()) {
      newErrors.password = true;
    } else if (formValues.password.length < 14) {
      newErrors.password = true;
      setResetError("Password must be at least 14 characters long");
    }

    if (!formValues.retypePassword.trim()) {
      newErrors.retypePassword = true;
    } else if (formValues.password !== formValues.retypePassword) {
      newErrors.retypePassword = true;
      setResetError("Passwords do not match");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    setResetError("");

    const payload = {
      newPassword: formValues.password,
    };

    try {
      await resetPassword(token, payload);
      alert("Password reset success");
    } catch (error) {
      console.error("Password reset error:", error.message || error);
      setResetError("Failed to reset password. Please try again.");
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
          name="password"
          text="Password"
          type="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleChange}
          error={errors.password}
          autoFocus
        />
        <InputForm
          name="retypePassword"
          text="Retype Password"
          type="password"
          placeholder="Retype your password"
          value={formValues.retypePassword}
          onChange={handleChange}
          error={errors.retypePassword}
        />
        {resetError && <p className="text-red-600 text-sm">{resetError}</p>}
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default FormSetNewPassword;
