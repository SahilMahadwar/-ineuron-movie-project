import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { axiosApiInstance } from "../lib/axiosApiInstance";

export default function useTmdb() {
  const [reviews, setReviews] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const { pathname } = useLocation();
  let { movieId } = useParams();

  useEffect(() => {
    console.log("UseEffect Ran");
    if (pathname.startsWith("/movies")) {
      getReviews(movieId);
    }
  }, [movieId]);

  const addToWebsite = async (movie) => {
    let token = localStorage.getItem("token");

    const data = {
      name: movie.name,
      tmdbId: movie.tmdbId,
      poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
      description: movie.description,
      status: movie.status,
      tagline: movie.tagline,
      spokenLanguage: movie.spokenLanguage,
      runtime: movie.runtime,
      genres: movie.genres,
      releaseDate: movie.releaseDate,
    };

    const { axiosRes, status } = await axiosApiInstance.post("/movies", data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    if (status === 201) {
      console.log("sussfully added ");
    }
  };

  const postReview = async (reviewData) => {
    let token = localStorage.getItem("token");

    const data = {
      title: reviewData.title,
      review: reviewData.review,
      user: reviewData.user,
      movie: reviewData.movie,
    };

    const { axiosRes, status } = await axiosApiInstance.post("/reviews", data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });

    if (status === 201) {
      console.log("sussfully added ");
    }

    setRefetchReviews(true);
  };

  const getReviews = async (movieId) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const { data, status } = await axiosApiInstance.get(
        `/reviews/${movieId}`
      );

      if (status === 200) {
        setReviews(data.data);
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
    addToWebsite,
    postReview,
    reviews,
    isLoading,
    error,
    isError,
  };
}
