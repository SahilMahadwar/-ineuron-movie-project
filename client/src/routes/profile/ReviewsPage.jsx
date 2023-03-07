import { useContext, useEffect } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";
import ReviewsContext from "../../contexts/ReviewsContext";

import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

export function ReviewsPage() {
  const { reviews, isLoading, isError, error, getMyReviews } = useApi();

  const { user } = useAuth();

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
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : reviews && !isLoading ? (
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
        ) : !reviews && isError ? (
          <div>{error.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
