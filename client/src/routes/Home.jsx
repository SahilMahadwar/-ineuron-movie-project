import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function Home() {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <p>Home page</p>
      <Link to="/admin">Go to admin Admin</Link>
    </div>
  );
}

export default Home;
