import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./components/Layouts/Biller/index";
import Maintenance from "./components/Layouts/Maintenance/index";
import CreateBiller from "./components/Layouts/Biller/CreateBiller";
import Detail from "./components/Layouts/Biller/detail";
import Login from "./components/Layouts/Auth/Login";
import ForgotPassword from "./components/Layouts/Auth/ForgotPassword";
import SetPassword from "./components/Layouts/Auth/SetPassword";

const router = createBrowserRouter([
  {
    path: "/biller",
    element: <Index />,
  },
  {
    path: "/biller/create",
    element: <CreateBiller />,
  },
  {
    path: "/biller/detail/:id",
    element: <Detail />,
  },
  {
    path: "/maintenance",
    element: <Maintenance />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/new-password",
    element: <SetPassword />,
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
