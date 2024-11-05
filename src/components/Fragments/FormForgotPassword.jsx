import React from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link } from "react-router-dom";

const FormForgotPassword = ({ email, setEmail, error, setError }) => {
  const handleChange = (e) => {
    setEmail(e.target.value); // Perbarui nilai email
    setError(""); // Hapus pesan error saat pengguna mulai mengetik
  };

  return (
    <div>
      <InputForm
        name="email"
        text="Email"
        type="text"
        placeholder="Enter your email"
        autoFocus
        autoComplete="email"
        value={email}
        onChange={handleChange}
        error={error} // Tampilkan pesan error jika ada
        required
      />
      <Button className="w-full" type="submit">
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
    </div>
  );
};

export default FormForgotPassword;
