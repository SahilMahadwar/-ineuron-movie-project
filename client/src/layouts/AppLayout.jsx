import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

export default function AppLayout({ title }) {
  const { user, isLoading, error, isError, getUser } = useAuth();

  return (
    <>
      <div className="min-h-full">
        <Navbar user={user} userLoading={isLoading} isError={isError} />
        <div className="py-10">
          {title && (
            <header>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                  {title}
                </h1>
              </div>
            </header>
          )}
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className=" ">
                  <Outlet />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

{
  /* <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Dashboard
              </h1>
            </div>
          </header> */
}
