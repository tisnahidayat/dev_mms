import axios from "axios";
import Cookies from "js-cookie";

// Membuat instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor untuk menambahkan Authorization header dengan token dari localStorage
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Tangani error request
  }
);

// Interceptor untuk menangani response dan error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Jika token expired atau tidak valid
      console.error("Token expired or invalid. Redirecting to login...");
      Cookies.remove("token");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
