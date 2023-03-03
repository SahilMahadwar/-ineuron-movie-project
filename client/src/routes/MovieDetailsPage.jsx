import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useContext, useEffect, useRef } from "react";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import MovieDetailsCard from "../components/Cards/MovieDetailsCard";
import ReviewsCard from "../components/Cards/ReviewsCard";
import CreateReviewCard from "../components/CreateReviewCard";
import Button from "../components/Form/Button";
import Spinner from "../components/Spinner";
import ReviewsContext, { ReviewsProvider } from "../contexts/ReviewsContext";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { axiosApiInstance } from "../lib/axiosApiInstance";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";

const getMovieDetails = async (params) => {
  const { data, status } = await axiosApiInstance.get(`/movies/${params}`);

  return data.data;
};

export async function loader({ params }) {
  return getMovieDetails(params.movieId);
}

export default function MovieDetailsPage() {
  const movie = useLoaderData();

  const {
    reviews,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
    error: reviewsError,
    getReviews,
  } = useContext(ReviewsContext);

  const { pathname } = useLocation();
  let { movieId } = useParams();

  useEffect(() => {
    console.log("UseEffect Ran");
    if (pathname.startsWith("/movies")) {
      getReviews(movieId);
    }
  }, [movieId]);

  const { user, isLoading, isError } = useAuth();

  // const {
  //   reviews,
  //   isLoading: reviewsIsLoading,
  //   isError: reviewsIsError,
  //   error: reviewsError,
  //   getReviews,
  // } = useApi();

  function moveUserReviewToFront(arr, elem) {
    reviews.forEach((element, i) => {
      if (element.user.id === elem) {
        const removedElement = arr.splice(i, 1);
        arr.unshift(removedElement[0]);
      }
    });

    return arr;
  }

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
        isAdmin={false}
      />

      {/* Reviews Part */}
      <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
        {isLoading ? (
          <div className=" flex justify-center  ">
            <Spinner />
          </div>
        ) : user && !isLoading ? (
          <CreateReviewCard movie={movie} />
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
