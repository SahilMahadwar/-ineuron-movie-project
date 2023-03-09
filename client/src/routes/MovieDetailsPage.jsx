import { useContext, useEffect, useRef } from "react";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import MovieDetailsCard from "../components/Cards/MovieDetailsCard";
import ReviewsCard from "../components/Cards/ReviewsCard";
import CreateReviewCard from "../components/CreateReviewCard";
import Button from "../components/Form/Button";
import Spinner from "../components/Spinner";
import MovieDetailsContext from "../contexts/MovieDetailsContext";
import useAuth from "../hooks/useAuth";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const getMovieDetails = async (params) => {
  let token = localStorage.getItem("token");

  const { data, status } = await axiosApiInstance.get(`/movies/${params}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  });

  return data.data;
};

export async function loader({ params }) {
  return getMovieDetails(params.movieId);
}

const moveUserReviewToFront = (arr, elem) => {
  arr.forEach((element, i) => {
    if (element.user._id === elem) {
      const removedElement = arr.splice(i, 1);
      arr.unshift(removedElement[0]);
    }
  });
  console.log("MOVING USER REVIEWS TO FRONT");
  return arr;
};

export default function MovieDetailsPage() {
  const movie = useLoaderData();

  const {
    reviews,
    reviewsIsLoading,
    isError: reviewsIsError,
    error: reviewsError,
    getReviews,
    updateReview,
    deleteReview,
    postReview,
  } = useContext(MovieDetailsContext);

  const { pathname } = useLocation();
  let { movieId } = useParams();

  useEffect(() => {
    console.log("UseEffect Ran");
    if (pathname.startsWith("/movies")) {
      getReviews(movieId);
    }
  }, [movieId]);

  const { user, isLoading, isError } = useAuth();

  const onSave = async (updateReviewData) => {
    return updateReview(updateReviewData);
  };

  const onDelete = async (reviewId) => {
    return await deleteReview(reviewId);
  };

  return (
    <div className="space-y-10 ">
      {/* Movie Details Card */}
      <MovieDetailsCard
        posterPath={movie.poster}
        name={movie.name}
        adult=""
        status={movie.status}
        releaseDate={movie.releaseDate}
        spokenLanguage={movie.spokenLanguage}
        runtime={movie.runtime}
        genres={movie.genres}
        tagline={movie.tagline}
        description={movie.description}
        lists={movie.lists}
        movieId={movie._id}
      />

      {/* Reviews Part */}
      <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
        {isLoading ? (
          <div className=" flex justify-center  ">
            <Spinner />
          </div>
        ) : user && !isLoading ? (
          <CreateReviewCard movie={movie} onPostReview={postReview} />
        ) : !user && isError ? (
          <div className="space-y-3 flex flex-col items-center justify-center">
            <p className="text-gray-800">Please login to add a review</p>
            <Link to="/auth/login">
              <Button size="xs">Login</Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Reviews Part */}
      <div className="">
        {reviewsIsLoading || isLoading ? (
          <div className="flex justify-center  ">
            <Spinner />
          </div>
        ) : reviews && !reviewsIsLoading ? (
          <div>
            {reviews?.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : reviews && user ? (
              <div className="grid grid-cols-2 gap-x-7 gap-y-10 ">
                {moveUserReviewToFront(reviews, user._id).map((review) => (
                  <ReviewsCard
                    key={review._id}
                    review={review}
                    user={review.user}
                    userInfo={true}
                    onSave={onSave}
                    onDelete={onDelete}
                    loggedInUser={user._id}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-7 gap-y-10 ">
                {reviews?.map((review) => (
                  <ReviewsCard
                    key={review._id}
                    review={review}
                    user={review.user}
                    userInfo={true}
                  />
                ))}
              </div>
            )}
          </div>
        ) : !reviews && reviewsIsError ? (
          <div>{reviewsError.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
