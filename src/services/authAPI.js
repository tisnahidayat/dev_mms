import { MdLocalGroceryStore } from "react-icons/md";
import api from "./axiosInstance";

// Login function
export const login = async (data) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_BASE_AUTH_LOGIN}`,
      data
    );
    if (response.status === 200) {
      const token = response.data.data.accessToken;
      localStorage.setItem("token", token);
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
    const response = await api.delete(
      `${import.meta.env.VITE_BASE_AUTH_LOGOUT}`,
      {
        data: {
          accessToken: accessToken,
        },
      }
    );
    localStorage.removeItem("fullName");
    localStorage.removeItem("role");
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset password function
export const resetPassword = async (token, data) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_BASE_AUTH_RESET_PASSWORD}?token=${token}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  logout,
  forgetPassword,
  resetPassword,
};
