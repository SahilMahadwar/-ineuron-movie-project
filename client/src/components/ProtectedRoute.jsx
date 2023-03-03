import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

export default function ProtectedRoute({ children }) {
  const { user, isLoading, isError, error } = useAuth();

  if (isLoading) {
    return (
      <div className="flex    justify-center items-center">
        <div className="flex space-x-2 items-center">
          <Spinner />
          <p>Accessing User Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && !isError && user) {
    return <>{children}</>;
  }

  return <div>{isError && error?.message}</div>;
}
