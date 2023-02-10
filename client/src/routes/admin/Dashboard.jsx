import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export function AdminDashboard() {
  const { user, isError, isLoading, error } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Errorr {error?.message}</div>;
  }

  if (user) {
    return (
      <div>
        <div>name: {user.name}</div>
        <div>email: {user.email}</div>
        <div>role: {user.role}</div>
        <div>id: {user._id}</div>
      </div>
    );
  }

  return <div></div>;
}

export default AdminDashboard;
