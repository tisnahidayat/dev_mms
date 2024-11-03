import InputForm from "../Elements/Input/InputForm";
import Button from "../Elements/Button/Button";
import { Link } from "react-router-dom";

const FormLogin = () => {
  return (
    <div>
      <InputForm
        name="username"
        text="Username"
        type="text"
        placeholder="Enter your username"
      />
      <InputForm
        name="password"
        text="Password"
        type="password"
        placeholder="Enter your password"
      />
      <p className="text-end mb-2">
        <Link
          to="/forgot-password"
          className="font-semibold text-sm text-[#00a78e]  cursor-pointer focus:outline-none"
        >
          Forgot password?
        </Link>
      </p>
      <Button className={'w-full'}>Login</Button>
    </div>
  );
};

export default FormLogin;
