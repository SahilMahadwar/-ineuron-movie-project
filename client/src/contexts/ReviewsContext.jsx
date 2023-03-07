import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

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
      }

      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        isLoading,
        error,
        isError,
        getReviews,
        getMyReviews,
        removeReviewFromState,
        addReviewToState,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsContext;
