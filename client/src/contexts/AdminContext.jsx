import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [reviews, setReviews] = useState(null);
  const [movies, setMovies] = useState();
  const [users, setUsers] = useState();

  const {
    updateReview: useApiUpdateReview,
    deleteReview: useApiDeleteReview,
    deleteMovie: useApiDeleteMovie,
  } = useApi();

  const {
    getAllReviewsOnSite,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
    error: reviewsError,
  } = useApi();

  const {
    getAllMoviesOnSite,
    isLoading: moviesIsLoading,
    isError: moviesIsError,
    error: moviesError,
  } = useApi();

  const {
    getAllUsersOnSite,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
  } = useApi();

  useEffect(() => {
    getReviews();
    getMovies();
    getUsers();
  }, []);

  const getReviews = async (reviewTitle, page) => {
    const axiosRes = await getAllReviewsOnSite(reviewTitle, page);

    if (reviews) {
      const { data, pagination } = axiosRes;

      if (page > 1) {
        setReviews({
          ...reviews,
          pagination: pagination,
          data: [...reviews.data, ...data],
        });
      } else {
        setReviews({ ...reviews, pagination: pagination, data: data });
      }
    } else {
      setReviews(axiosRes);
    }
  };

  const getMovies = async (movieName, page) => {
    const axiosRes = await getAllMoviesOnSite(movieName, page);

    if (movies) {
      const { data, pagination } = axiosRes;

      if (page > 1) {
        setMovies({
          ...movies,
          pagination: pagination,
          data: [...movies.data, ...data],
        });
      } else {
        setMovies({ ...movies, pagination: pagination, data: data });
      }
    } else {
      setMovies(axiosRes);
    }
  };

  const getUsers = async () => {
    const data = await getAllUsersOnSite();
    console.log(data);
    setUsers(data);
  };

  const updateReview = async (updateReviewData) => {
    const { data, success } = await useApiUpdateReview(updateReviewData);

    if (success) {
      console.log(data);
      return data;
    }
  };

  const removeReviewFromState = (reviewId) => {
    console.log(reviewId);
    const newReviews = reviews.data.filter((review) => review._id !== reviewId);

    setReviews({ ...reviews, count: reviews.count - 1, data: newReviews });
  };

  const deleteReview = async (reviewId) => {
    const { data, success } = await useApiDeleteReview(reviewId);

    if (success) {
      removeReviewFromState(reviewId);
      return data;
    }
  };

  const removeMovieFromState = (movieId) => {
    console.log(movieId);
    const newMovies = movies.data.filter((movie) => movie._id !== movieId);

    setMovies({ ...movies, count: movies.count - 1, data: newMovies });
  };

  const deleteMovie = async (movieId) => {
    const { data, success } = await useApiDeleteMovie(movieId);

    if (success) {
      removeMovieFromState(movieId);
      return data;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        reviews,
        reviewsIsLoading,
        reviewsIsError,
        reviewsError,
        movies,
        moviesIsLoading,
        moviesIsError,
        moviesError,
        users,
        usersIsLoading,
        usersIsError,
        usersError,
        deleteMovie,
        updateReview,
        deleteReview,
        getMovies,
        getReviews,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
