import React from "react";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgot-password";
import NewPasswordPage from "./pages/new-password";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Index from "./components/Layouts/Biller/Index";
import Maintenance from "./components/Layouts/Maintenance/Index";
import CreateBiller from "./components/Layouts/Biller/CreateBiller";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/biller",
    element: <Index />,
  },
  {
    path: "/biller/create",
    element: <CreateBiller />,
  },
  {
    path: "/maintenance",
    element: <Maintenance />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/new-password",
    element: <NewPasswordPage />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
