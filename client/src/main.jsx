import "@fontsource/inter/variable.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { default as App } from "./App";
import ErrorElement from "./components/ErrorElement";
import ProtectedRoute from "./components/ProtectedRoute";
import { ReviewsProvider } from "./contexts/ReviewsContext";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import AdminDashboard from "./routes/admin/Dashboard";
import LoginPage from "./routes/auth/LoginPage";
import RegisterPage from "./routes/auth/RegisterPage";
import ErrorPage from "./routes/ErrorPage";
import Home, { loader as moviesLoader } from "./routes/Home";
import MovieDetails, { loader as movieLoader } from "./routes/MovieDetailsPage";
import Movies from "./routes/Movies";
import { RedirectToReviews } from "./routes/profile/Profile";
import ReviewsPage from "./routes/profile/ReviewsPage";
import SeenListPage from "./routes/profile/SeenListPage";
import WatchListPage from "./routes/profile/WatchlistPage";
import Search from "./routes/Search";
import Settings from "./routes/Settings";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: (
          <ReviewsProvider>
            <AppLayout />
          </ReviewsProvider>
        ),
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
            path: "/search",
            element: <Search />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/profile",
            element: (
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "/profile",
                loader: RedirectToReviews,
                errorElement: <ErrorElement />,
              },
              {
                path: "/profile/reviews",
                element: <ReviewsPage />,
                errorElement: <ErrorElement />,
              },
              {
                path: "/profile/watchlist",
                element: <WatchListPage />,
                errorElement: <ErrorElement />,
              },
              {
                path: "/profile/seen",
                element: <SeenListPage />,
                errorElement: <ErrorElement />,
              },
            ],
            errorElement: <ErrorElement />,
          },
          {
            path: "/settings",
            element: (
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            ),
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
