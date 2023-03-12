import { useEffect, useState } from "react";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance/index";

export function useTmdb() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  // useEffect(() => {
  //   getPopularMovies();
  // }, []);

  // const getPopularMovies = async (page = 1) => {
  //   try {
  //     setIsError(false);
  //     setIsLoading(true);

  //     const { data, status } = await axiosTmdbInstance.get(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=${page}`
  //     );

  //     if (status === 200) {
  //       setMovies(data.results);
  //     }

  //     console.log(data);

  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error);
  //     setIsError(true);
  //     setIsLoading(false);
  //     console.log(error);
  //   }
  // };

  const movieSearch = async (query) => {
    const convertedQuery = query.split(" ").join("%").toLowerCase();

    console.log(convertedQuery);

    try {
      setIsError(false);
      setIsLoading(true);

      const { data, status } = await axiosTmdbInstance.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${convertedQuery}&page=1&include_adult=true`
      );

      if (status === 200) {
        setIsLoading(false);

        console.log(data);

        return {
          data: data.results,
          success: true,
        };
      }

      setIsLoading(false);
      console.log(data);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return {
    isLoading,
    error,
    isError,
    movieSearch,
  };
}
