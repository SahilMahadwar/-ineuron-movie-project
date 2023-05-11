import { useUser } from "@/hooks/use-user";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { queryKeys } from "@/libs/react-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const ReviewsPage = () => {
  const { user } = useUser();
  const { ref, inView, entry } = useInView();

  const fetchReviews = async ({ pageParam = 1 }) => {
    const { data, status } = await axiosApiInstance.get(
      `/reviews?user=${user._id}`,
      {
        params: {
          limit: "12",
          page: pageParam,
        },
      }
    );

    return data;
  };

  const {
    data: reviews,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKeys.myReviews],
    queryFn: fetchReviews,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.next?.page;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  console.log(reviews && reviews);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  ">
        {reviews?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group?.count === 0 ? (
              <div>no reviews found</div>
            ) : (
              group?.data?.map((review) => (
                <div
                  key={review._id}
                  className="px-5 py-6 rounded-lg shadow-sm  flex space-x-6 items-start w-full border border-gray-800"
                >
                  <div className="flex flex-col space-y-6  px-1  w-full overflow-hidden">
                    <div className="flex-shrink-0 flex items-center space-x-2 ">
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div className="">
                        <p className="font-normal">{review?.user?.name}</p>
                        <p className="text-sm font-light">
                          {new Date(review.createdAt)
                            .toISOString()
                            .slice(0, 10)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 break-words">
                      <h3 className="text-base ">{review.title}</h3>
                      <p className="text-sm ">{review.review}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-12 flex items-center justify-center">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Uh oh seems like you reached end of the list"}
        </button>
      </div>
    </div>
  );
};
