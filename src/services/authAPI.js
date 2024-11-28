import { MdLocalGroceryStore } from "react-icons/md";
import api from "./axiosInstance";

// Login function
export const login = async (data) => {
  try {
    // Kirim data login ke backend
    const response = await api.post(
      `${import.meta.env.VITE_BASE_AUTH_LOGIN}`,
      data
    );
    if (response.status === 200) {
      // Jika login berhasil, simpan token ke localStorage
      const token = response.data.data.accessToken; // Pastikan sesuai dengan struktur response dari backend
      localStorage.setItem("token", token); // Simpan token ke localStorage
      localStorage.setItem("fullName", response.data.data.fullName);
      localStorage.setItem("role", response.data.data.role);
    } else {
      console.error("Login failed:");
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Logout function
export const logout = async (accessToken) => {
  try {
    // Kirim token logout ke backend
    const response = await api.delete(
      `${import.meta.env.VITE_BASE_AUTH_LOGOUT}`,
      {
        data: {
          accessToken: accessToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// Forget password function
export const forgetPassword = async (email) => {
  try {
    const response = await api.put(
      `${import.meta.env.VITE_BASE_AUTH_FORGOT_PASSWORD}`,
      null,
      { params: { email } }
    );

    console.log("Forget Password response:", response);
    if (response.status === 200) {
      console.log("Email sent successfully:");
    } else {
      console.log("Email sending failed:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Forget Password failed:", error);
    throw error;
  }
};

export default {
  login,
  logout,
  forgetPassword,
};
