import { useContext, useEffect, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import ProfileContext from "../../contexts/ProfileContext";
import useAuth from "../../hooks/useAuth";

export function ReviewsPage() {
  const { reviews, isError, error, getMyReviews, updateReview, deleteReview } =
    useContext(ProfileContext);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchMyReviews(user._id);
    }
  }, [user]);

  const fetchMyReviews = async (userId) => {
    try {
      if (reviews) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      await getMyReviews(userId);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onSave = async (updateReviewData) => {
    return updateReview(updateReviewData);
  };

  const onDelete = async (reviewId) => {
    return deleteReview(reviewId);
  };

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
                    onSave={onSave}
                    onDelete={onDelete}
                    loggedInUser={user._id}
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
