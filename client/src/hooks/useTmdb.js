import { useEffect, useState } from "react";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance/index";

export function useTmdb() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async (page = 1) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const { data, status } = await axiosTmdbInstance.get(
        `/search/movie?api_key=${tmdbKey}&language=en-US&query=iron%20man&page=${page}&include_adult=true`
      );

      if (status === 200) {
        setMovies(data.results);
      }

      console.log(data);

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    getMovies,
    movies,
    isLoading,
    error,
    isError,
  };
}
