import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useUser } from "@/hooks/use-user";
import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

export const ProfileLayout = () => {
  const { user, isLoading, isError, error, isPrevError } = useUser();

  const { pathname } = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (user) {
    return (
      <div className="flex min-h-screen flex-col space-y-10">
        <header className="sticky top-0 z-40  w-full bg-gray-900">
          <Navbar />
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8  my-12 flex-1 w-full space-y-10">
          <div className="flex space-x-6 items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-50">
                {user.name}
              </h1>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>

          <div className="space-x-10 border-b border-gray-800 flex items-center justify-start">
            <NavLink
              to={"/profile/reviews"}
              currentPath={pathname.startsWith("/profile/reviews")}
              label="Reviews"
            />
            <NavLink
              to={"/profile/watchlist"}
              currentPath={pathname.startsWith("/profile/watchlist")}
              label="Watchlist"
            />
            <NavLink
              to={"/profile/seen"}
              currentPath={pathname.startsWith("/profile/seen")}
              label="Seen"
            />
          </div>

          <div className="px-3">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

const NavLink = ({ to, currentPath, label }) => {
  return (
    <Link to={to}>
      <button
        className={clsx(
          "whitespace-nowrap pb-3.5 px-3 border-b-2 text-sm",
          currentPath
            ? " border-brand-500 text-white font-medium"
            : "border-transparent text-gray-100 hover:text-white hover:border-brand-500"
        )}
      >
        {label}
      </button>
    </Link>
  );
};
