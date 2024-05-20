import LoginPage from "@/views/Login";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
