import { Navbar } from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
