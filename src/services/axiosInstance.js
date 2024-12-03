import axios from "axios";

// Membuat instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Gunakan URL dasar dari env variables
  headers: {
    "Content-Type": "application/json", // Content type untuk JSON
    Accept: "application/json",
  },
});

// Interceptor untuk menambahkan Authorization header dengan token dari localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Jika token ada, tambahkan ke header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Tangani error request
  }
);

// Interceptor untuk menangani response dan error global
api.interceptors.response.use(
  (response) => response, // Jika response sukses, langsung return response
  (error) => {
    if (error.response?.status === 401) {
      // Jika token expired atau tidak valid
      console.error("Token expired or invalid. Redirecting to login...");
      localStorage.removeItem("token"); // Hapus token jika expired
      window.location.href = "/login"; // Redirect ke halaman login
    }
    return Promise.reject(error); // Reject error jika status bukan 401
  }
);

export default api;
