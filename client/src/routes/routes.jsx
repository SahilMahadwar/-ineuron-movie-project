import { AppLayout } from "@/layouts/app-layout";
import { ProfileLayout } from "@/layouts/profile-layout";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { HomePage } from "@/pages/home";
import { MovieDetailsPage } from "@/pages/movies/details";
import { ReviewsPage } from "@/pages/profile/reviews";
import { SeenPage } from "@/pages/profile/seen";
import { WatchlistPage } from "@/pages/profile/watchlist";
import { SearchPage } from "@/pages/search";
import { Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
      </Route>
      <Route element={<ProfileLayout />}>
        <Route path="/profile/reviews" element={<ReviewsPage />} />
        <Route path="/profile/watchlist" element={<WatchlistPage />} />
        <Route path="/profile/seen" element={<SeenPage />} />
      </Route>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/*" element={<div>404</div>} />
    </Routes>
  );
};
