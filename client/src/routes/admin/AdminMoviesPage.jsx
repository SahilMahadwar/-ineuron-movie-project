import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import { useForm } from "react-hook-form";
import AdminMovieCard from "../../components/Cards/AdminMovieCard";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import AdminContext from "../../contexts/AdminContext";
import useAuth from "../../hooks/useAuth";

export function AdminMoviesPage() {
  const {
    movies,
    moviesIsLoading,
    moviesIsError,
    moviesError,
    deleteMovie,
    getMovies,
  } = useContext(AdminContext);

  const [refetch, setRefetch] = useState(false);

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const [disableAction, setDisableAction] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    getAllMoviesAgain();
  }, [watch("searchQuery")]);

  const getAllMoviesAgain = async () => {
    if (refetch) {
      const searchQuery = getValues("searchQuery");
      if (searchQuery.length === 0) {
        setSearchIsLoading(true);
        await getMovies();
        setRefetch(false);
        setSearchIsLoading(false);
      }
    }
  };

  const removeMovieFromSite = async (movieId) => {
    setDisableAction(true);
    await deleteMovie(movieId);
    setDisableAction(false);
  };

  const onSearch = async (inputs) => {
    setSearchIsLoading(true);
    await getMovies(inputs.searchQuery);
    setRefetch(true);
    setSearchIsLoading(false);
  };

  const observer = useRef();

  const lastMovieCardRef = useCallback(
    (node) => {
      if (moviesIsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && movies.pagination.next) {
          getMoreMovies();
          console.log("Fetching more movies");
        }
      });
      if (node) observer.current.observe(node);
    },
    [moviesIsLoading, movies?.pagination.next]
  );

  const getMoreMovies = async () => {
    if (movies?.pagination.next) {
      const searchQuery = getValues("searchQuery");
      const nextPage = movies?.pagination.next.page;

      await getMovies(searchQuery, nextPage);
    }
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">Manage Movies</h2>

      <div className="bg-white rounded-lg py-8 px-8 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Search</h1>
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="flex w-full justify-between items-start   space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "Movie name is required" }}
                name="searchQuery"
                placeholder="Search for movies on this site"
              />
            </div>

            <Button
              type="submit"
              isDisabled={errors.searchQuery}
              isLoading={moviesIsLoading}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Reviews Part */}
      <div className="">
        {movies?.data && !moviesIsError ? (
          <div>
            {movies?.data.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-7 gap-y-10">
                {movies?.data.map((movie, index) => {
                  if (movies?.data.length === index + 1) {
                    return (
                      <div ref={lastMovieCardRef} key={movie._id}>
                        <AdminMovieCard
                          posterPath={movie.poster}
                          title={movie.name}
                          overview={movie.description}
                          releaseDate={movie.releaseDate}
                          movieId={movie._id}
                          onDelete={removeMovieFromSite}
                          disableOnDelete={disableAction}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <AdminMovieCard
                        key={movie._id}
                        posterPath={movie.poster}
                        title={movie.name}
                        overview={movie.description}
                        releaseDate={movie.releaseDate}
                        movieId={movie._id}
                        onDelete={removeMovieFromSite}
                        disableOnDelete={disableAction}
                      />
                    );
                  }
                })}
              </div>
            )}
          </div>
        ) : moviesIsError ? (
          <div>{moviesError}</div>
        ) : (
          ""
        )}
      </div>

      {searchIsLoading
        ? null
        : moviesIsLoading && (
            <div className="min-h-80 w-full flex items-center justify-center py-4 space-x-2">
              <Spinner /> <p>Loading new movies please wait</p>
            </div>
          )}
    </div>
  );
}

export default AdminMoviesPage;
