import { Poster } from "@/components/poster";
import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import WriteReviewModal from "@/components/write-review-modal";
import { useUser } from "@/hooks/use-user";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import { convertRuntimeToHours } from "@/libs/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import {
  RiBookmark2Line,
  RiBookmarkLine,
  RiCheckDoubleLine,
  RiCheckLine,
} from "react-icons/ri";

import { Link, useParams } from "react-router-dom";

export const MovieDetailsPage = () => {
  let { movieId } = useParams();
  const [cookies] = useCookies([cookieKeys.authToken]);

  const {
    user,
    isLoading: userIsLoading,
    isError,
    error,
    isPrevError,
  } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: movie,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [movieId],
    queryFn: async () => {
      const { data, status } = await axiosApiInstance.get(
        `/movies/${movieId}`,
        {
          headers: {
            Authorization: cookies.authToken
              ? `Bearer ${cookies.authToken}`
              : null,
          },
        }
      );

      console.log(data);
      return data;
    },
  });

  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: [queryKeys.reviews + movieId],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/reviews?movie=${movieId}`);
      return data;
    },

    onSuccess: ({ data }) => {
      console.log(data);
    },
  });

  const addMovieToWatchlist = useMutation({
    mutationFn: () => {
      return axiosApiInstance.post(
        `/list/watchlist/${movieId}`,
        {},
        {
          headers: {
            Authorization: cookies.authToken
              ? `Bearer ${cookies.authToken}`
              : null,
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const removeMovieFromWatchlist = useMutation({
    mutationFn: () => {
      return axiosApiInstance.delete(
        `/list/watchlist/${movieId}`,

        {
          headers: {
            Authorization: cookies.authToken
              ? `Bearer ${cookies.authToken}`
              : null,
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const addMovieToSeenlist = useMutation({
    mutationFn: () => {
      return axiosApiInstance.post(
        `/list/seenlist/${movieId}`,
        {},
        {
          headers: {
            Authorization: cookies.authToken
              ? `Bearer ${cookies.authToken}`
              : null,
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const removeMovieFromSeenlist = useMutation({
    mutationFn: () => {
      return axiosApiInstance.delete(
        `/list/seenlist/${movieId}`,

        {
          headers: {
            Authorization: cookies.authToken
              ? `Bearer ${cookies.authToken}`
              : null,
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-12">
      <div className="rounded-lg items-center md:py-8 md:px-8 flex-col flex space-y-7 md:flex-row md:space-x-10 md:items-start md:space-y-0 md:border md:border-gray-800 px-4">
        <div className="w-full flex flex-col items-center md:w-[250px] space-y-4">
          <Poster
            posterPath={movie.data.poster}
            width="w-[250px]"
            height="h-auto"
          />

          <WriteReviewModal refetchReviews={refetchReviews} />
        </div>
        <div className="flex-1 w-full flex flex-col items-center md:items-start md:justify-start space-y-7 md:text-start text-center">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold  md:font-bold">
              {movie.data.name}
            </h1>

            {movie.data.status === "Released" ? (
              <p className="text-sm flex items-center justify-center md:justify-start">
                {movie.data.releaseDate}
                {movie.data.spokenLanguage && movie.data.runtime > 0 && (
                  <>
                    <span className="block w-1 h-1 bg-gray-200 rounded ml-2 mr-2"></span>
                    {convertRuntimeToHours(movie.data.runtime)}
                    <span className="block w-1 h-1 bg-gray-200 rounded ml-2 mr-2"></span>
                    {movie.data.spokenLanguage}
                  </>
                )}
              </p>
            ) : (
              <p className="text-sm flex items-center">
                Not released yet in {movie.data.status?.toLowerCase()}
              </p>
            )}
          </div>

          <div className="space-x-4 flex items-center ">
            {movie.data.lists?.watchlist ? (
              <Button
                onClick={() => removeMovieFromWatchlist.mutate()}
                size="sm"
                isLoading={removeMovieFromWatchlist.isLoading}
                leftIcon={<RiBookmark2Line />}
              >
                Remove From Watchlist
              </Button>
            ) : (
              <Button
                intent="secondary"
                size="sm"
                leftIcon={<RiBookmarkLine />}
                isLoading={addMovieToWatchlist.isLoading}
                onClick={() => addMovieToWatchlist.mutate()}
              >
                Add To Watchlist
              </Button>
            )}

            {movie.data.lists?.seenlist ? (
              <Button
                onClick={() => removeMovieFromSeenlist.mutate()}
                size="sm"
                isLoading={removeMovieFromSeenlist.isLoading}
                leftIcon={<RiCheckDoubleLine />}
              >
                Watched
              </Button>
            ) : (
              <Button
                isLoading={addMovieToSeenlist.isLoading}
                onClick={() => addMovieToSeenlist.mutate()}
                intent="secondary"
                size="sm"
                leftIcon={<RiCheckLine />}
              >
                Already watched
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <p className="font-medium text-sm ">Genres</p>
            <div className="space-x-2">
              {movie.data.genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-800  text-center  text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {movie.data.tagline && (
            <div className="space-y-2">
              <p className="text-sm  italic">{movie.data.tagline}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="font-medium text-sm ">Overview</p>
            <p>{movie.data.description}</p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-medium md:px-8 px-4">Reviews</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews?.data?.map((review) => (
            <div
              key={review._id}
              className="px-5 py-6 rounded-xl shadow-sm  flex space-x-6 items-start w-full border border-gray-800"
            >
              <div className="flex flex-col space-y-6  px-1  w-full overflow-hidden">
                <div className="flex-shrink-0 flex items-center space-x-2 ">
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="">
                    <p className="font-normal">{review?.user?.name}</p>
                    <p className="text-sm font-light">
                      {new Date(review.createdAt).toISOString().slice(0, 10)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 break-words">
                  <h3 className="text-base ">{review.title}</h3>
                  <p className="text-sm ">{review.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
