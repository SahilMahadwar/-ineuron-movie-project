import { useContext, useEffect, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import AdminMovieCard from "../../components/Cards/AdminMovieCard";
import AdminContext from "../../contexts/AdminContext";
import useAuth from "../../hooks/useAuth";

export function AdminMoviesPage() {
  const { movies, moviesIsLoading, moviesIsError, moviesError, deleteMovie } =
    useContext(AdminContext);

  const { user } = useAuth();

  const removeMovieFromSite = async (movieId) => {
    return deleteMovie(movieId);
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">Manage Movies</h2>

      {/* Reviews Part */}
      <div className="">
        {moviesIsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : movies?.data && !moviesIsError ? (
          <div>
            {movies?.data.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-7 gap-y-10">
                {movies?.data.map((movie) => (
                  <AdminMovieCard
                    key={movie._id}
                    posterPath={movie.poster}
                    title={movie.name}
                    overview={movie.description}
                    releaseDate={movie.releaseDate}
                    movieId={movie._id}
                    onDelete={removeMovieFromSite}
                  />
                ))}
              </div>
            )}
          </div>
        ) : !movies?.data && moviesIsError ? (
          <div>{moviesError.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AdminMoviesPage;
