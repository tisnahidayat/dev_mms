import axios from "axios";

const Login = async (data) => {
  try {
    const response = await axios.post(
      "https://fakestoreapi.com/auth/login",
      data
    );
    return response.data; // balikin data response ke FormLogin
  } catch (error) {
    throw error; // lempar error biar bisa ditangani di FormLogin
  }
};

export default Login;
