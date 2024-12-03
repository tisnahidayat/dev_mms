import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormLogin from "../components/Fragments/FormLogin";
import { BrowserRouter } from "react-router-dom";
import authAPI from "../services/authAPI";
import "@testing-library/jest-dom";
import React from "react";

// Mock Login service
jest.mock("../services/authAPI");

test("should render FormLogin and display all form elements", () => {
  render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );

  // Verifikasi apakah input username dan password dirender dengan benar
  expect(
    screen.getByPlaceholderText("Enter your username")
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Enter your password")
  ).toBeInTheDocument();

  // Verifikasi tombol Login dan link Forgot password
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Forgot password?")).toBeInTheDocument();
});

test("should show error when username or password is empty", () => {
  render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );

  // Klik tombol login tanpa mengisi form
  fireEvent.click(screen.getByText("Login"));

  // Pastikan error muncul untuk username dan password
  expect(screen.getByText("Username is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("should handle successful login and save data to sessionStorage", async () => {
  // Mock respons login berhasil
  const mockResponse = {
    data: {
      data: {
        accessToken: "mockAccessToken",
        fullName: "John Doe",
        role: "Admin",
      },
    },
  };
  authAPI.login.mockResolvedValueOnce(mockResponse);

  render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );

  // Isi form dengan data valid
  fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
    target: { value: "correctpassword" },
  });

  // Klik tombol Login
  fireEvent.click(screen.getByText("Login"));

  // Tunggu hingga proses selesai
  await waitFor(() => {
    // Verifikasi data disimpan di sessionStorage
    expect(sessionStorage.getItem("accessToken")).toBe("mockAccessToken");
    expect(sessionStorage.getItem("fullname")).toBe("John Doe");
    expect(sessionStorage.getItem("role")).toBe("Admin");
  });
});

test("should show error when username or password is invalid", async () => {
  // Mock respons login gagal
  authAPI.login.mockRejectedValueOnce({
    response: { data: "Invalid credentials" },
  });

  render(
    <BrowserRouter>
      <FormLogin />
    </BrowserRouter>
  );

  // Isi form dengan data yang tidak valid
  fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
    target: { value: "wrongpassword" },
  });

  // Klik tombol Login
  fireEvent.click(screen.getByText("Login"));

  // Tunggu hingga pesan error muncul
  await waitFor(() =>
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
  );
});
