import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const MovieDetailsContext = createContext();

export const MovieDetailsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const {
    updateReview: useApiUpdateReview,
    deleteReview: useApiDeleteReview,
    postReview: useApiPostReview,
  } = useApi();

  const getReviews = async (movieId) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setError();

      const { data, status } = await axiosApiInstance.get(
        `/reviews/movie-id/${movieId}`
      );

      if (status === 200) {
        setIsLoading(false);
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

  const removeReviewFromState = (reviewId) => {
    console.log(reviewId);
    const newReviews = reviews.filter((review) => review._id !== reviewId);
    setReviews(newReviews);
  };

  const addReviewToState = async (newReviewData) => {
    // console.log(reviews);

    // const newReviews = reviews;
    // newReviews.push(newReviewData);

    setReviews([...reviews, newReviewData]);

    // setReviews(newReviews);
    console.log(reviews);
  };

  const updateReview = async (updateReviewData) => {
    try {
      setIsError(false);
      setError();

      const { data, success } = await useApiUpdateReview(updateReviewData);

      if (success) {
        console.log(data);
        return data;
      }
    } catch (error) {
      setError(error);
      setIsError(true);
      console.log(error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      setIsError(false);
      setError();

      const { data, success } = await useApiDeleteReview(reviewId);

      if (success) {
        removeReviewFromState(reviewId);
        return data;
      }
    } catch (error) {
      setError(error);
      setIsError(true);
      console.log(error);
    }
  };

  const postReview = async (reviewData) => {
    try {
      setIsError(false);
      setError();

      const { data, success } = await useApiPostReview(reviewData);

      if (success) {
        console.log(data);
        addReviewToState(data);
        return data;
      }
    } catch (error) {
      setError(error);
      setIsError(true);
      console.log(error);
    }
  };

  return (
    <MovieDetailsContext.Provider
      value={{
        reviews,
        isLoading,
        error,
        isError,
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
