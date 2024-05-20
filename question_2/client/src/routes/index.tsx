import LoginPage from "@/views/Login";
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
