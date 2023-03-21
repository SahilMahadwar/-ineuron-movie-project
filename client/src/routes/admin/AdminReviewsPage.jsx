import { useContext, useEffect, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import AdminContext from "../../contexts/AdminContext";
import useAuth from "../../hooks/useAuth";

export function AdminReviewsPage() {
  const {
    reviews,
    reviewsIsLoading,
    reviewsIsError,
    reviewsError,
    updateReview,
    deleteReview,
  } = useContext(AdminContext);

  const { user } = useAuth();

  const onSave = async (updateReviewData) => {
    return updateReview(updateReviewData);
  };

  const onDelete = async (reviewId) => {
    return deleteReview(reviewId);
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">Manage Reviews</h2>

      {/* Reviews Part */}
      <div className="">
        {reviewsIsLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : reviews?.data && !reviewsIsError ? (
          <div>
            {reviews?.data.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no reviews found
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 ">
                {reviews?.data.map((review) => (
                  <ReviewsCard
                    key={review._id}
                    review={review}
                    user={review.user}
                    poster={true}
                    userInfo={false}
                    onSave={onSave}
                    onDelete={onDelete}
                    loggedInUser={user._id}
                    isAdmin={true}
                  />
                ))}
              </div>
            )}
          </div>
        ) : !reviews?.data && reviewsIsError ? (
          <div>{reviewsError.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AdminReviewsPage;
