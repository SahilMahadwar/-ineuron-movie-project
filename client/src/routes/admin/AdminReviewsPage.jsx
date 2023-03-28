import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import { useForm } from "react-hook-form";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
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
    getReviews,
    disableAction,
  } = useContext(AdminContext);

  const { user } = useAuth();

  const onSave = async (updateReviewData) => {
    return updateReview(updateReviewData);
  };

  const onDelete = async (reviewId) => {
    return deleteReview(reviewId);
  };

  const [refetch, setRefetch] = useState(false);

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    getAllReviewsAgain();
  }, [watch("searchQuery")]);

  const getAllReviewsAgain = async () => {
    if (refetch) {
      const searchQuery = getValues("searchQuery");
      if (searchQuery.length === 0) {
        setSearchIsLoading(true);
        await getReviews();
        setRefetch(false);
        setSearchIsLoading(false);
      }
    }
  };

  const onSearch = async (inputs) => {
    setSearchIsLoading(true);
    await getReviews(inputs.searchQuery);
    setRefetch(true);
    setSearchIsLoading(false);
  };

  const observer = useRef();

  const lastReviewCardRef = useCallback(
    (node) => {
      if (reviewsIsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && reviews.pagination.next) {
          getMoreReviews();
          console.log("Fetching more reviews");
        }
      });
      if (node) observer.current.observe(node);
    },
    [reviewsIsLoading, reviews?.pagination.next]
  );

  const getMoreReviews = async () => {
    if (reviews?.pagination.next) {
      const searchQuery = getValues("searchQuery");
      const nextPage = reviews?.pagination.next.page;

      await getReviews(searchQuery, nextPage);
    }
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">Manage Reviews</h2>

      <div className="bg-white rounded-lg py-8 px-8 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Search</h1>
        <form onSubmit={handleSubmit(onSearch)}>
          <div className="flex w-full justify-between items-start   space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "Review title is required" }}
                name="searchQuery"
                placeholder="Search for reviews on this site"
              />
            </div>

            <Button
              type="submit"
              isDisabled={errors.searchQuery}
              isLoading={reviewsIsLoading}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {reviews?.data && !reviewsIsError ? (
        <div>
          {reviews?.data.length === 0 ? (
            <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
              no reviews found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-7 gap-y-10">
              {reviews?.data.map((review, index) => {
                if (reviews?.data.length === index + 1) {
                  return (
                    <div ref={lastReviewCardRef} key={review._id}>
                      <ReviewsCard
                        review={review}
                        user={review.user}
                        poster={true}
                        userInfo={false}
                        onSave={onSave}
                        onDelete={onDelete}
                        loggedInUser={user._id}
                        isAdmin={true}
                        disableAction={disableAction}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={review._id}>
                      <ReviewsCard
                        review={review}
                        user={review.user}
                        poster={true}
                        userInfo={false}
                        onSave={onSave}
                        onDelete={onDelete}
                        loggedInUser={user._id}
                        isAdmin={true}
                        disableAction={disableAction}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      ) : reviewsIsError ? (
        <div>{reviewsError}</div>
      ) : (
        ""
      )}

      {searchIsLoading
        ? null
        : reviewsIsLoading && (
            <div className="min-h-80 w-full flex items-center justify-center py-4 space-x-2">
              <Spinner /> <p>Loading new reviews please wait</p>
            </div>
          )}
    </div>
  );
}

export default AdminReviewsPage;
