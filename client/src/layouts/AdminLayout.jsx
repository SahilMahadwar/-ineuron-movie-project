import { Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <>
      <p>Admin Layout</p>
      <Outlet />
    </>
  );
}

export default AdminLayout;
