import React from "react";
import NewPassword from "./components/Layouts/SetNewPassword";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Index from "./components/Layouts/Biller/Index";
import Maintenance from "./components/Layouts/Maintenance/Index";
import CreateBiller from "./components/Layouts/Biller/CreateBiller";
import Detail from "./components/Layouts/Biller/Detail";
import LoginLayouts from "./components/Layouts/LoginLayouts";
import FormPasswordLayout from "./components/Layouts/ForgotPasswordLayouts";
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
    path: "/biller/check-detail",
    element: <Detail />,
  },
  {
    path: "/maintenance",
    element: <Maintenance />,
  },
  {
    path: "/login",
    element: <LoginLayouts />,
  },
  {
    path: "/forgot-password",
    element: <FormPasswordLayout />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
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
