import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <Outlet />
      </div>
    </>
  );
};
