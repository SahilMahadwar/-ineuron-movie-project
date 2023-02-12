import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  // TODO: Create a new state to trigger a refetch manually
  useEffect(() => {
    if (!pathname.startsWith("/auth")) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (user && !isLoading) {
      setError(null);
      setIsError(null);
    }
  }, [pathname]);

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { data, status } = await axiosApiInstance.post(`/auth/login`, {
        email: email,
        password: password,
      });

      if (status === 200) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data, status } = await axiosApiInstance.post(`/auth/register`, {
        name: name,
        email: email,
        password: password,
      });

      if (status === 200) {
        console.log(data);
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error.response.status);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth/login");
  };

  const getUser = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      let token = localStorage.getItem("token");

      const { data, status } = await axiosApiInstance.get(`/auth/me`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      });

      if (status === 200) {
        setIsLoading(false);
        setUser(data.data);
      }

      setIsLoading(false);
      console.log(data);
      console.log("get user ran");
    } catch (error) {
      setError(error);
      setIsError(true);
      setIsLoading(false);
      console.log(error.response.status);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isError,
        isLoading,
        register,
        login,
        logOut,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
