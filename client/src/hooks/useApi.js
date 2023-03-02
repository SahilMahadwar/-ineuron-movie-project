import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ReviewsContext from "../contexts/ReviewsContext";
import { axiosApiInstance } from "../lib/axiosApiInstance";

export default function useApi() {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const { addReviewToState, removeReviewFromState } =
    useContext(ReviewsContext);

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
      }

      addReviewToState(axiosRes.data);
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
      }

      removeReviewFromState(reviewId);
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
    reviews,
    isLoading,
    error,
    isError,
  };
}
