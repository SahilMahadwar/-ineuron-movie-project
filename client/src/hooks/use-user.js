import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const [cookies, setCookie] = useCookies([cookieKeys.authToken]);

  const [isPrevError, setIsPrevError] = useState(false);

  const navigate = useNavigate();

  const getUser = async () => {
    return axiosApiInstance.get("/users/me", {
      headers: {
        Authorization: cookies.authToken ? `Bearer ${cookies.authToken}` : null,
      },
    });
  };

  const { data, isLoading, isError, error } = useQuery(
    [queryKeys.user],
    getUser,
    {
      onSuccess: ({ data }) => {
        setIsPrevError(false);
      },

      onError: (error) => {
        setIsPrevError(true);
      },
      retry: 0,
    }
  );

  //   to get user object
  //   console.log(_user.data.data.data);

  return { user: data?.data?.data, isLoading, isError, error, isPrevError };
}
