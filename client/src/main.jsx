import "@fontsource/inter/variable.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { default as App } from "./App";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./routes/admin/Dashboard";
import MovieDetails, {
  ErrorElement as MovieDetailsErrorElement,
  loader as movieLoader,
} from "./routes/admin/MovieDetails";
import Movies from "./routes/admin/Movies";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/movies",
            element: <Movies />,
          },
          {
            path: "/admin/movies/:tmdbId",
            element: <MovieDetails />,
            loader: movieLoader,
            errorElement: <MovieDetailsErrorElement />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
