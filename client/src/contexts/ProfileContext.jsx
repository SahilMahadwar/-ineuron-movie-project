import React, { createContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [reviews, setReviews] = useState(null);
  const [movies, setMovies] = useState({ watchlist: null, seenlist: null });

  const {
    updateReview: useApiUpdateReview,
    deleteReview: useApiDeleteReview,
    postReview: useApiPostReview,
    getMyReviews: useApiGetMyReviews,
    getList: useApiGetList,
    isLoading,
    isError,
    error,
  } = useApi();

  const getMyReviews = async (userId) => {
    const { success, data } = await useApiGetMyReviews(userId);

    if (success) {
      setReviews(data);
      return data;
    }
  };

  const getList = async (listName) => {
    const { success, data } = await useApiGetList(listName);

    if (success) {
      if (listName === "WATCHLIST") {
        setMovies({ seenlist: movies.seenlist, watchlist: data });
      }

      if (listName === "SEENLIST") {
        setMovies({ watchlist: movies.watchlist, seenlist: data });
      }

      return data;
    }
  };

  const removeReviewFromState = (reviewId) => {
    console.log(reviewId);
    const newReviews = reviews.filter((review) => review._id !== reviewId);
    setReviews(newReviews);
  };

  const addReviewToState = async (newReviewData) => {
    setReviews([...reviews, newReviewData]);
  };

  const updateReview = async (updateReviewData) => {
    const { data, success } = await useApiUpdateReview(updateReviewData);

    if (success) {
      console.log(data);
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
      console.log(data);
      addReviewToState(data);
      return data;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        reviews,
        isLoading,
        error,
        isError,
        movies,
        getMyReviews,
        removeReviewFromState,
        addReviewToState,
        updateReview,
        deleteReview,
        postReview,
        getList,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
