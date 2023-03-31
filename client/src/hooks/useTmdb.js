import { useEffect, useState } from "react";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance/index";

export function useTmdb() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const getPopularMovies = async (page = 1) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      const axiosRes = await axiosTmdbInstance.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=${page}`
      );

      if (axiosRes.status === 200) {
        if (movies) {
          const { data } = axiosRes;

          if (page > 1) {
            setMovies({
              ...movies,
              page: data.page,
              results: [...movies.results, ...data.results],
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setMovies(axiosRes.data);
          }
        } else {
          setIsLoading(false);
          setMovies(axiosRes.data);
        }

        return axiosRes.data;
      }

      console.log(data);

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);

      if (error.response?.data?.error) {
        setError(error.response?.data?.error);
        toast.error(
          error.response?.data?.error
            ? error.response?.data?.error
            : error.message
        );
      } else {
        setError(error.message);
        toast.error(message);
      }

      console.log(error);
    }
  };

  const movieSearch = async (query, page = 1) => {
    const convertedQuery = query.split(" ").join("%").toLowerCase();

    console.log(convertedQuery);

    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      const axiosRes = await axiosTmdbInstance.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${convertedQuery}&page=${page}&include_adult=true`
      );

      if (axiosRes.status === 200) {
        if (movies) {
          const { data } = axiosRes;

          if (page > 1) {
            setMovies({
              ...movies,
              page: data.page,
              results: [...movies.results, ...data.results],
            });
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setMovies(axiosRes.data);
          }
        } else {
          setIsLoading(false);
          setMovies(axiosRes.data);
        }

        return axiosRes.data;
      }

      setIsLoading(false);
      console.log(data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);

      if (error.response?.data?.error) {
        setError(error.response?.data?.error);
        toast.error(
          error.response?.data?.error
            ? error.response?.data?.error
            : error.message
        );
      } else {
        setError(error.message);
        toast.error(message);
      }
      console.log(error);
    }
  };

  const getMovieById = async (movieId) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      const axiosRes = await axiosTmdbInstance.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKey}&language=en-US`
      );

      if (axiosRes.status === 200) {
        setIsLoading(false);
        return axiosRes.data;
      }

      setIsLoading(false);
      console.log(data);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);

      if (error.response?.data?.error) {
        setError(error.response?.data?.error);
        toast.error(
          error.response?.data?.error
            ? error.response?.data?.error
            : error.message
        );
      } else {
        setError(error.message);
        toast.error(message);
      }
      console.log(error);
    }
  };

  return {
    isLoading,
    error,
    isError,
    movieSearch,
    movies,
    setMovies,

    getPopularMovies,
    getMovieById,
  };
}
