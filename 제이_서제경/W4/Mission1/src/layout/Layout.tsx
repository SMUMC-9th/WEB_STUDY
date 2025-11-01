import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/NavBar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
