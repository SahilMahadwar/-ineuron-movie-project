import { useState } from "react";

import { toast } from "react-toastify";

import { axiosApiInstance } from "../lib/axiosApiInstance";

export default function useApi() {
  const [movies, setMovies] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const addToWebsite = async (movie) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

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

      const { axiosRes, status } = await axiosApiInstance.post(
        "/movies",
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (status === 201) {
        console.log("sussfully added ");
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const postReview = async (reviewData) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const data = {
        title: reviewData.title,
        review: reviewData.review,
        user: reviewData.user,
        movie: reviewData.movie,
      };

      const { data: axiosRes, status } = await axiosApiInstance.post(
        "/reviews",
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (status === 201) {
        console.log("sussfully added ");
        setIsLoading(false);
        return axiosRes;
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const updateReview = async (updateReviewData) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const data = {
        title: updateReviewData.title,
        review: updateReviewData.review,
      };

      const { data: axiosRes, status } = await axiosApiInstance.put(
        `/reviews/${updateReviewData.reviewId}`,
        data,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (status === 201) {
        setIsLoading(false);
        console.log(axiosRes);
        return axiosRes;
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const { data: axiosRes, status } = await axiosApiInstance.delete(
        `/reviews/${reviewId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (axiosRes.success === true) {
        console.log("deleted successfully");
        return axiosRes;
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const searchMovie = async (movieName) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      const { data: axiosRes, status } = await axiosApiInstance.get(
        `/movies?search=${movieName ? movieName : ""}`
      );

      if (axiosRes.success === true) {
        console.log(axiosRes.data);
        setMovies(axiosRes.data);
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const movieLitsCheck = async (movieId) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const { data: axiosRes, status } = await axiosApiInstance.get(
        `/list/list-check/${movieId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (axiosRes.success === true) {
        console.log(axiosRes.data);
        setIsLoading(false);
        return axiosRes.data;
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const addMovieToList = async ({ list, movieId, name }) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const { data: axiosRes, status } = await axiosApiInstance.post(
        `/list/${
          list === "WATCHLIST"
            ? "watchlist"
            : list === "SEENLIST"
            ? "seenlist"
            : ""
        }/${movieId}`,
        {},
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (status === 201) {
        setIsLoading(false);
        // toast.success(
        //   `${
        //     list === "WATCHLIST"
        //       ? `${name} Added To Your Watchlist`
        //       : list === "SEENLIST"
        //       ? `${name} Marked As Watched`
        //       : ""
        //   }`
        // );
        return axiosRes;
      }

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

  const removeMovieFromList = async ({ list, movieId, name }) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const { data: axiosRes, status } = await axiosApiInstance.delete(
        `/list/${
          list === "WATCHLIST"
            ? "watchlist"
            : list === "SEENLIST"
            ? "seenlist"
            : ""
        }/${movieId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (status === 201) {
        setIsLoading(false);

        return axiosRes;
      }

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

  const getList = async (listName) => {
    try {
      setIsError(false);
      setError();
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const { data: axiosRes, status } = await axiosApiInstance.get(
        `/list/${
          listName === "WATCHLIST"
            ? "watchlist"
            : listName === "SEENLIST"
            ? "seenlist"
            : ""
        }`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );

      if (axiosRes.success) {
        setIsLoading(false);
        setMovies(axiosRes.data);
        console.log(axiosRes.data);
        return axiosRes;
      }

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

  const getMyReviews = async (userId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setError();

      const { data, status } = await axiosApiInstance.get(
        `/reviews?user=${userId}`
      );

      if (status === 200) {
        setIsLoading(false);
        setReviews(data.data);
        console.log(data);
        return data;
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const getMovieReviews = async (movieId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setError();

      const { data: axiosRes, status } = await axiosApiInstance.get(
        `/reviews?movie=${movieId}`
      );

      if (status === 200) {
        setIsLoading(false);
        setReviews(axiosRes.data);
        return axiosRes;
      }

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
    updateReview,
    deleteReview,
    searchMovie,
    movieLitsCheck,
    addMovieToList,
    removeMovieFromList,
    getList,
    getMyReviews,
    getMovieReviews,
    reviews,
    movies,
    isLoading,
    error,
    isError,
  };
}
