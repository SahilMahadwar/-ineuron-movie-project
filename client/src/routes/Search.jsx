import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Poster from "../components/Cards/Poster";
import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import Spinner from "../components/Spinner";
import useApi from "../hooks/useApi";

export function Search() {
  const { searchMovie, movies, isError, isLoading, error } = useApi();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    searchMovie();
  }, []);

  const onSubmit = async (inputs) => {
    await searchMovie(inputs.searchQuery);
  };

  return (
    <div className="space-y-12">
      <div className="bg-white rounded-lg py-8 px-8 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Search</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full justify-between items-start   space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "Movie name is required" }}
                isError={errors.searchQuery ? true : false}
                errorMessage={errors.searchQuery?.message}
                name="searchQuery"
                placeholder="Search for movies on this site"
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

      <div className="">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : movies && !isLoading ? (
          <div>
            {movies?.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                {`no movies with name ${getValues("searchQuery")} found`}
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-x-7 gap-y-10">
                {movies?.map((movie) => (
                  <Link to={`/movies/${movie._id}`} key={movie.tmdbId}>
                    <Poster posterPath={movie.poster} title={movie.name} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : !movies && isError ? (
          <div>{error.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
