import { useContext } from "react";
import { RiFileList2Line, RiFilmLine, RiUser2Line } from "react-icons/ri";
import StatsCard from "../../components/Cards/StatsCard";
import AdminContext from "../../contexts/AdminContext";
import useApi from "../../hooks/useApi";

const stats = [
  {
    id: 1,
    name: "Total Movies",
    stat: "140",
    icon: RiFilmLine,
  },
  {
    id: 2,
    name: "Total Reviews",
    stat: "257",
    icon: RiFileList2Line,
  },
  {
    id: 3,
    name: "Total Users",
    stat: "25",
    icon: RiUser2Line,
  },
];

export default function AdminDashboard() {
  const {
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
  } = useContext(AdminContext);

  return (
    <div className="space-y-20">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          name="Total Movies"
          icon={
            <RiFilmLine className="h-6 w-6 text-white" aria-hidden="true" />
          }
          stat={movies?.count}
          isLoading={moviesIsLoading}
          isError={moviesIsError}
        />
        <StatsCard
          name="Total Reviews"
          icon={
            <RiFileList2Line
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
          }
          stat={reviews?.count}
          isLoading={reviewsIsLoading}
          isError={reviewsIsError}
        />
        <StatsCard
          name="Total Users"
          icon={
            <RiUser2Line className="h-6 w-6 text-white" aria-hidden="true" />
          }
          stat={users?.count}
          isLoading={usersIsLoading}
          isError={usersIsError}
        />
      </dl>

      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          New movies
        </h3>
        <div></div>
      </div>
    </div>
  );
}
