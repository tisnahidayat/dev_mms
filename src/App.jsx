import React from "react";
import NewPassword from "./components/Layouts/SetNewPassword";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Index from "./components/Layouts/Biller/Index";
import Maintenance from "./components/Layouts/Maintenance/Index";
import CreateBiller from "./components/Layouts/Biller/CreateBiller";
import Detail from "./components/Layouts/Biller/Detail";
import Login from "./components/Layouts/Login";
import FormPassword from "./components/Layouts/ForgotPassword";
import EmailSent from "./components/Layouts/EmailSent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/email-sent",
    element: <EmailSent />,
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
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <FormPassword />,
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
