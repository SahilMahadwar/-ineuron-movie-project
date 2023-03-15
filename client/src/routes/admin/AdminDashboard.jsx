import { useContext } from "react";
import { RiFileList2Line, RiFilmLine, RiUser2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Poster from "../../components/Cards/Poster";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import StatsCard from "../../components/Cards/StatsCard";
import Button from "../../components/Form/Button";
import Spinner from "../../components/Spinner";
import AdminContext from "../../contexts/AdminContext";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

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

  const { user } = useAuth();

  const onSave = async (updateReviewData) => {
    return updateReview(updateReviewData);
  };

  const onDelete = async (reviewId) => {
    return deleteReview(reviewId);
  };

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
          link="/admin/movies"
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
          link="/admin/reviews"
        />
        <StatsCard
          name="Total Users"
          icon={
            <RiUser2Line className="h-6 w-6 text-white" aria-hidden="true" />
          }
          stat={users?.count}
          isLoading={usersIsLoading}
          isError={usersIsError}
          link="/admin/users"
        />
      </dl>

      <div className="space-y-10">
        <h3 className="text-xl  leading-6 font-semibold text-slate-700">
          New movies
        </h3>

        {moviesIsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : movies?.data && !moviesIsLoading ? (
          <div>
            {movies?.data.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no reviews found
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-x-8 gap-y-8 ">
                {movies?.data.map(
                  (movie, index) =>
                    index < 6 && (
                      <Link to={`/movies/${movie._id}`} key={movie.tmdbId}>
                        <Poster posterPath={movie.poster} title={movie.name} />
                      </Link>
                    )
                )}
              </div>
            )}
          </div>
        ) : !movies?.data && moviesIsError ? (
          <div>{moviesError?.message}</div>
        ) : (
          ""
        )}

        <Button size="xs" intent="secondary">
          View All
        </Button>
      </div>

      <div className="space-y-10">
        <h3 className="text-xl  leading-6 font-semibold text-slate-700">
          New Reviews
        </h3>

        {reviewsIsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : reviews?.data && !reviewsIsLoading ? (
          <div>
            {reviews?.data.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no reviews found
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-x-8 gap-y-8 ">
                {reviews?.data.map(
                  (review, index) =>
                    index < 4 && (
                      <ReviewsCard
                        key={review._id}
                        review={review}
                        user={review.user}
                        poster={true}
                        userInfo={false}
                        onSave={onSave}
                        onDelete={onDelete}
                        loggedInUser={user._id}
                      />
                    )
                )}
              </div>
            )}
          </div>
        ) : !reviews?.data && reviewsIsError ? (
          <div>{reviewsError.message}</div>
        ) : (
          ""
        )}

        <Button size="xs" intent="secondary">
          View All
        </Button>
      </div>

      <div className="space-y-10">
        <h3 className="text-xl  leading-6 font-semibold text-slate-700">
          New Users
        </h3>

        {usersIsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : users?.data && !usersIsLoading ? (
          <div>
            {users?.data.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no reviews found
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-x-7 gap-y-10">
                {users?.data.map(
                  (user, index) =>
                    index < 4 && (
                      <div>
                        <div className="flex rounded-lg shadow-sm flex-col py-5 px-4 items-center  bg-white space-y-2">
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt={user.name}
                          />
                          <p className="text-gray-700 font-normal">
                            {user.name}
                          </p>
                          <p className="text-gray-600 text-sm font-light ">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    )
                )}
              </div>
            )}
          </div>
        ) : !users?.data && usersIsError ? (
          <div>{usersError.message}</div>
        ) : (
          ""
        )}

        <Button size="xs" intent="secondary">
          View All
        </Button>
      </div>
    </div>
  );
}
