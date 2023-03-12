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

  const getReviews = async () => {
    const data = await getAllReviewsOnSite();
    console.log(data);
    setReviews(data);
  };

  const getMovies = async () => {
    const data = await getAllMoviesOnSite();
    console.log(data);
    setMovies(data);
  };

  const getUsers = async () => {
    const data = await getAllUsersOnSite();
    console.log(data);
    setUsers(data);
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
