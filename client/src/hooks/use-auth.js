import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import { queryClient } from "@/libs/react-query/query-client";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies([cookieKeys.authToken]);

  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: ({ email, password }) => {
      return axiosApiInstance.post(`/auth/login`, {
        email: email,
        password: password,
      });
    },
    onSuccess: ({ data }) => {
      setCookie(cookieKeys.authToken, data.token, { path: "/" });
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const register = useMutation({
    mutationFn: ({ name, email, password }) => {
      return axiosApiInstance.post("/auth/register", {
        name: name,
        email: email,
        password: password,
      });
    },
    onSuccess: ({ data }) => {
      setCookie(cookieKeys.authToken, data.token, { path: "/" });
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const logOut = () => {
    removeCookie(cookieKeys.authToken, { path: "/" });
    queryClient.setQueriesData(queryKeys.user, null);
    navigate("/auth/login");
  };

  return {
    login,
    register,
    logOut,
  };
}
