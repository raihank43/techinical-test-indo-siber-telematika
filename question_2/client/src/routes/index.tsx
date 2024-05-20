import RootLayout from "@/layouts/RootLayout";
import Home from "@/views/Home";
import LoginPage from "@/views/Login";
import RegisterPage from "@/views/Register";
import SharedDocument from "@/views/SharedDocument";
import { createBrowserRouter, redirect } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      return localStorage.getItem("token") ? redirect("/") : null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      return !localStorage.getItem("token") ? redirect("/login") : null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shared-document",
        element: <SharedDocument />,
      },
    ],
  },
]);
