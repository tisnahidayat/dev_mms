import React, { useState } from "react";
import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";

const FormSetNewPassword = () => {
  const [formValues, setFormValues] = useState({
    password: "",
    retypePassword: "",
  });
  const [error, setError] = useState("");

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setError(""); // Hapus pesan error saat pengguna mulai mengetik
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.password || !formValues.retypePassword) {
      setError("Both fields are required");
    } else if (formValues.password !== formValues.retypePassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      console.log("Passwords match. Form submitted successfully.");
      // Lakukan aksi submit lain, seperti mengirim data ke server
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} noValidate>
        <InputForm
          name="password"
          text="Password"
          type="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleChange}
          error={error ? " " : ""}
          autoFocus
        />
        <InputForm
          name="retypePassword"
          text="Retype Password"
          type="password"
          placeholder="Enter your retype password"
          value={formValues.retypePassword}
          onChange={handleChange}
          error={error}
          className="mb-4"
        />
        <Button
          className="w-full bg-[#00a78e] text-white py-2 rounded-lg"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormSetNewPassword;
