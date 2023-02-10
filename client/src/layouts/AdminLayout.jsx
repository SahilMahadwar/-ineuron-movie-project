import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import Button from "../components/Form/Button";

import AdminNavbar from "../components/AdminNavbar";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import TmdbMovieSearch from "../components/TmdbMovieSearch/TmdbMovieSearch";
import AuthContext from "../contexts/AuthContext";
import useAuth from "../hooks/useAuth";

export default function AdminLayout({ title }) {
  const [tmdbSlide, setTmdbSlide] = useState(false);

  const { user, isLoading, error, isError, getUser } = useAuth();

  if (isLoading) {
    return (
      <div className="flex  min-h-screen  justify-center items-center">
        <div className="flex space-x-2 items-center">
          <Spinner />
          <p>Accessing Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && !isError && user?.role === "USER") {
    return <div>Not Authorized To Access This Route</div>;
  }

  if (!isLoading && !isError && user?.role === "ADMIN") {
    return (
      <>
        <div className="min-h-full">
          <Navbar
            adminNav={true}
            user={user}
            isError={isError}
            userLoading={isLoading}
            tmdbSlide={tmdbSlide}
            setTmdbSlide={setTmdbSlide}
          />

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
        <TmdbMovieSearch open={tmdbSlide} setOpen={setTmdbSlide} />
      </>
    );
  }

  return <div>{error?.message}</div>;
}
