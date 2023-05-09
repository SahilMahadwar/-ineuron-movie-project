import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col space-y-10">
      <header className="sticky top-0 z-40 bg-gray-900">
        <Navbar />
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12 flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
