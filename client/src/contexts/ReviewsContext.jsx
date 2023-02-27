import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  const [refetch, setRefetch] = useState(0);

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

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        isLoading,
        error,
        isError,
        refetch,
        getReviews,
        setRefetch,
        removeReviewFromState,
        addReviewToState,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export default ReviewsContext;
