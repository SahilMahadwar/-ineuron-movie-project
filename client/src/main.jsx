import "@fontsource/inter/variable.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { default as App } from "./App";
import ErrorElement from "./components/ErrorElement";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import AdminDashboard from "./routes/admin/Dashboard";
import LoginPage from "./routes/auth/LoginPage";
import RegisterPage from "./routes/auth/RegisterPage";
import ErrorPage from "./routes/ErrorPage";
import Home, { loader as moviesLoader } from "./routes/Home";
import MovieDetails, { loader as movieLoader } from "./routes/MovieDetailsPage";
import Movies from "./routes/Movies";
import Reviews from "./routes/Reviews";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Movies />,
            loader: moviesLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "/movies/:movieId",
            element: <MovieDetails />,
            loader: movieLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "/reviews",
            element: <Reviews />,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorElement />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/movies",
            element: <Movies />,
            loader: moviesLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "/admin/movies/:tmdbId",
            element: <MovieDetails />,
            loader: movieLoader,
            errorElement: <ErrorElement />,
          },
        ],
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
