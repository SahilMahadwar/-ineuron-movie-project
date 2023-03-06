import { useContext, useEffect } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";
import ReviewsContext from "../../contexts/ReviewsContext";

import useAuth from "../../hooks/useAuth";

export default function SeenListPage() {
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
      getMyReviews(user._id);
    }
  }, [user]);

  return (
    <div className=" w-full ">
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
                no reviews found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 ">
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
