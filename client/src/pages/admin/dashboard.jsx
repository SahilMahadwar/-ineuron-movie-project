import { Poster } from "@/components/poster";
import { StatsCard } from "@/components/stats-card";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import {
  DocumentTextIcon,
  FilmIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const [cookies, setCookie] = useCookies([cookieKeys.authToken]);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const { data, status } = await axiosApiInstance.get(`/movies`, {
      params: {
        limit: "5",
        page: pageParam,
      },
    });

    console.log(data);
    return data;
  };

  const fetchReviews = async ({ pageParam = 1 }) => {
    const { data, status } = await axiosApiInstance.get(`/reviews`, {
      params: {
        limit: "6",
        page: pageParam,
      },
    });

    return data;
  };

  const fetchUsers = async ({ pageParam = 1 }) => {
    const { data, status } = await axiosApiInstance.get(`/users`, {
      headers: {
        Authorization: cookies.authToken ? `Bearer ${cookies.authToken}` : null,
      },
      params: {
        limit: "5",
        page: pageParam,
      },
    });

    return data;
  };

  const movies = useQuery({
    queryKey: [queryKeys.movies + "admin"],
    queryFn: fetchMovies,
  });

  const reviews = useQuery({
    queryKey: [queryKeys.reviews + "admin"],
    queryFn: fetchReviews,
  });

  const users = useQuery({
    queryKey: [queryKeys.user + "admin"],
    queryFn: fetchUsers,
  });

  return (
    <div className="space-y-20">
      <div className="space-y-5 mt-6">
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            icon={<FilmIcon className="w-6 h-6 text-white" />}
            name="Total Movies"
            stat={movies?.data?.count}
          />

          <StatsCard
            icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
            name="Total Reviews"
            stat={reviews?.data?.count}
          />

          <StatsCard
            icon={<UsersIcon className="w-6 h-6 text-white" />}
            name="Total Users"
            stat={users?.data?.count}
          />
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-semibold px-4">New movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
          {movies.data?.data?.map((movie) => (
            <Link key={movie._id} to={`/movies/${movie._id}`}>
              <Poster posterPath={movie.poster} title={movie.name} />
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-semibold px-4">New Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-8">
          {reviews.data?.data?.map((review) => (
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

      <div className="space-y-5">
        <h2 className="text-xl font-semibold px-4">New Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
          {users.data?.data?.map((user) => (
            <div>
              <div className="flex rounded-lg shadow-sm flex-col py-5 px-4 items-center bg-gray-900 border border-gray-800 space-y-2">
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt={user.name}
                />
                <p className=" font-normal">{user.name}</p>
                <p className="text-gray-200 text-sm">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
