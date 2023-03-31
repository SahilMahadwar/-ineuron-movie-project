import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AdminMovieCard from "../../../components/Cards/AdminMovieCard";
import TMDBMovieCard from "../../../components/Cards/TMDBMovieCard";
import Button from "../../../components/Form/Button";
import Input from "../../../components/Form/Input";
import Spinner from "../../../components/Spinner";
import AdminContext from "../../../contexts/AdminContext";
import { useTmdb } from "../../../hooks/useTmdb";

export default function AddTmdbMovie() {
  const { isLoading, error, isError, movieSearch, movies, getPopularMovies } =
    useTmdb();

  const [refetch, setRefetch] = useState(false);

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [searchIsLoading, setSearchIsLoading] = useState(false);

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

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getAllMoviesAgain = async () => {
    if (refetch) {
      const searchQuery = getValues("searchQuery");
      if (searchQuery.length === 0) {
        setSearchIsLoading(true);
        await getPopularMovies();
        setRefetch(false);
        setSearchIsLoading(false);
      }
    }
  };

  const onSearch = async (inputs) => {
    setSearchIsLoading(true);
    await movieSearch(inputs.searchQuery);
    setRefetch(true);
    setSearchIsLoading(false);
  };

  const observer = useRef();

  const lastMovieCardRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && movies.page < movies.total_pages) {
          getMoreMovies();
          console.log("Fetching more movies");
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, movies?.page < movies?.total_pages]
  );

  const getMoreMovies = async () => {
    if (movies.page < movies.total_pages) {
      const searchQuery = getValues("searchQuery");
      const nextPage = movies.page + 1;

      if (searchQuery.length > 0) {
        await movieSearch(searchQuery, nextPage);
      } else {
        await getPopularMovies(nextPage);
      }
    }
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">
        Import Movie Using TMDB
      </h2>

      <div className="bg-white rounded-lg py-8 px-8 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Search</h1>
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="flex w-full justify-between items-start   space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "Movie name is required" }}
                name="searchQuery"
                placeholder="Search for movies on TMDB"
              />
            </div>

            <Button
              type="submit"
              isDisabled={errors.searchQuery}
              isLoading={isLoading}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Reviews Part */}
      <div className="">
        {movies?.results && !isError ? (
          <div>
            {movies?.results.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-7 gap-y-10">
                {movies?.results.map((movie, index) => {
                  if (movies?.results.length === index + 1) {
                    return (
                      <div ref={lastMovieCardRef} key={movie.id}>
                        <TMDBMovieCard
                          posterPath={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                          title={movie.title}
                          overview={movie.overview}
                          movieId={movie.id}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <TMDBMovieCard
                        key={movie.id}
                        posterPath={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                        title={movie.title}
                        overview={movie.overview}
                        movieId={movie.id}
                      />
                    );
                  }
                })}
              </div>
            )}
          </div>
        ) : isError ? (
          <div>{error}</div>
        ) : (
          ""
        )}
      </div>

      {searchIsLoading
        ? null
        : isLoading && (
            <div className="min-h-80 w-full flex items-center justify-center py-4 space-x-2">
              <Spinner /> <p>Loading new movies please wait</p>
            </div>
          )}
    </div>
  );
}
