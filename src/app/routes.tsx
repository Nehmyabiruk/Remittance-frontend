import { createBrowserRouter } from "react-router-dom";

import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import AuthLayout from "./layouts/AuthLayout";

export const router = createBrowserRouter([
  { path: "/",          element: <GetStarted /> },
  { path: "/login",     element: <Login /> },
  { path: "/register",  element: <Register /> },
  {
    path: "/app",
    element: <AuthLayout />,
    children: [
      { index: true,           element: <Dashboard /> },
      { path: "send",          element: <SendMoney /> },
      { path: "transactions",  element: <Transactions /> },
      { path: "profile",       element: <Profile /> },
      { path: "contact",       element: <Contact /> },
    ],
  },
]);