import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <p>Home page</p>
      <Link to="/admin">Go to admin Admin</Link>
    </div>
  );
}

export default Home;
