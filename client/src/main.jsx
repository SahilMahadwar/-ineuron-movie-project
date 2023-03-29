import "@fontsource/inter/variable.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { default as App } from "./App";
import ErrorElement from "./components/ErrorElement";
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminProvider } from "./contexts/AdminContext";
import { MovieDetailsProvider } from "./contexts/MovieDetailsContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import AdminDashboard from "./routes/admin/AdminDashboard";
import AdminMoviesPage from "./routes/admin/AdminMoviesPage";
import AdminReviewsPage from "./routes/admin/AdminReviewsPage";
import AdminUsersPage from "./routes/admin/AdminUsersPage";
import AddTmdbMovie from "./routes/admin/movies/AddTmdbMovie";

import TmdbMovieDetails, {
  loader as tmdbMovieLoader,
} from "./routes/admin/movies/TmdbMovieDetails";
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
            element: (
              <MovieDetailsProvider>
                <MovieDetails />
              </MovieDetailsProvider>
            ),
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
                <ProfileProvider>
                  <ProfileLayout />
                </ProfileProvider>
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
        element: (
          <AdminProvider>
            <AdminLayout />
          </AdminProvider>
        ),
        errorElement: <ErrorElement />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/movies",
            element: <AdminMoviesPage />,

            errorElement: <ErrorElement />,
          },
          {
            path: "/admin/reviews",
            element: <AdminReviewsPage />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/admin/users",
            element: <AdminUsersPage />,
            errorElement: <ErrorElement />,
          },
          {
            path: "/admin/movies/add-tmdb/:tmdbId",
            element: <TmdbMovieDetails />,
            loader: tmdbMovieLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: "/admin/movies/add-tmdb",
            element: <AddTmdbMovie />,
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
