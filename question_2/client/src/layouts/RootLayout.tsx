import NavbarComponent from "@/components/NavbarComponent";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}
