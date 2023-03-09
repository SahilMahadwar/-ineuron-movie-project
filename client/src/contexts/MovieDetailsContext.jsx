import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const MovieDetailsContext = createContext();

export const MovieDetailsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(null);

  const [reviewsIsLoading, setReviewsIsLoading] = useState(false);

  const {
    updateReview: useApiUpdateReview,
    deleteReview: useApiDeleteReview,
    postReview: useApiPostReview,
    getMovieReviews,
    isError,
    isLoading,
    error,
  } = useApi();

  const getReviews = async (movieId) => {
    try {
      setReviewsIsLoading(true);
      const { success, data } = await getMovieReviews(movieId);

      if (success) {
        setReviews(data);
      }

      setReviewsIsLoading(false);
    } catch (error) {
      setReviewsIsLoading(false);
    }
  };

  const removeReviewFromState = (reviewId) => {
    console.log(reviewId);
    const newReviews = reviews.filter((review) => review._id !== reviewId);
    setReviews(newReviews);
  };

  const addReviewToState = async (newReviewData) => {
    setReviews([newReviewData, ...reviews]);
  };

  const updateReview = async (updateReviewData) => {
    const { data, success } = await useApiUpdateReview(updateReviewData);

    if (success) {
      return data;
    }
  };

  const deleteReview = async (reviewId) => {
    const { data, success } = await useApiDeleteReview(reviewId);

    if (success) {
      removeReviewFromState(reviewId);
      return data;
    }
  };

  const postReview = async (reviewData) => {
    const { data, success } = await useApiPostReview(reviewData);

    if (success) {
      addReviewToState(data);
      return data;
    }
  };

  return (
    <MovieDetailsContext.Provider
      value={{
        reviews,
        isLoading,
        error,
        isError,
        reviewsIsLoading,
        getReviews,
        removeReviewFromState,
        addReviewToState,
        updateReview,
        deleteReview,
        postReview,
      }}
    >
      {children}
    </MovieDetailsContext.Provider>
  );
};

export default MovieDetailsContext;
