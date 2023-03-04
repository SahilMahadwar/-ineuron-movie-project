import { useContext, useEffect } from "react";
import ReviewsCard from "../components/Cards/ReviewsCard";
import Spinner from "../components/Spinner";
import ReviewsContext from "../contexts/ReviewsContext";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";

export function Profile() {
  const {
    reviews,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
    error: reviewsError,
    getMyReviews,
  } = useContext(ReviewsContext);

  const { user, isLoading, isError, error } = useAuth();

  useEffect(() => {
    console.log("UseEffect Ran");
    if (user) {
      console.log("UseEffect User Ran");

      getMyReviews(user.id);
    }
  }, [user]);

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
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold text-gray-800">
        My Reviews {reviews && `- ${reviews.length}`}
      </h1>

      {/* Reviews Part */}
      <div className="">
        {reviewsIsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : reviews && !reviewsIsLoading ? (
          <div>
            {reviews?.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-7 gap-y-10 ">
                {reviews?.map((review) => (
                  <ReviewsCard
                    key={review._id}
                    review={review}
                    user={review.user}
                    poster={true}
                    userInfo={false}
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

export default Profile;
