import { useEffect, useState } from "react";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance/index";

export function useTmdb() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const addToWebsite = async (title, overview, id, poster_path) => {
    let token = localStorage.getItem("token");

    const data = {
      name: movie.title,
      description: movie.overview,
      tmdbId: movie.id,
      poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
    };

    const { axiosRes, status } = await axiosApiInstance.post("/movies", data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    if (status === 201) {
      console.log("sussfully added");
    }
  };

  return {
    addToWebsite,
  };
}
