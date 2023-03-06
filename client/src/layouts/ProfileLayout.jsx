import { useContext, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ReviewsCard from "../components/Cards/ReviewsCard";
import Spinner from "../components/Spinner";
import ReviewsContext from "../contexts/ReviewsContext";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

const navigation = [
  { name: "Your Reviews", to: "/profile/reviews" },
  { name: "Watchlist", to: "/profile/watchlist" },
  { name: "Seen", to: "/profile/seen" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav
      className="space-y-2 bg-white rounded-lg shadow-sm py-4 px-4"
      aria-label="Sidebar"
    >
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={classNames(
            pathname.startsWith(item.to)
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            "flex items-center px-3 py-2 text-sm font-medium rounded-md"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}{" "}
        </Link>
      ))}
    </nav>
  );
}

export function ProfileLayout() {
  const {
    reviews,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
    error: reviewsError,
    getMyReviews,
  } = useContext(ReviewsContext);

  const { user, isLoading, isError, error } = useAuth();

  useEffect(() => {
    console.log("UseEffect Ran");
    if (user) {
      console.log("UseEffect User Ran");

      getMyReviews(user._id);
    }
  }, [user]);

  return (
    <div className="flex space-x-8">
      <div className="w-1/4">
        <Navigation />
      </div>
      <div className=" w-full ">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
