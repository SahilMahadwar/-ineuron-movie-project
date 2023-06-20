import { Poster } from "@/components/poster";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const AdminReviewsPage = () => {
  const [cookies, setCookie] = useCookies([cookieKeys.authToken]);
  const { ref, inView, entry } = useInView();
  let [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [showLoading, setShowLoading] = useState(false);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const searchQuery = getValues("searchQuery");

    const { data, status } = await axiosApiInstance.get(`/reviews`, {
      params: {
        search: searchQuery ? searchQuery : "",
        limit: "12",
        page: pageParam,
      },
    });

    console.log(data);
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
    queryKey: [queryKeys.reviews + "admin-manage"],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.pagination?.next?.page;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm({ defaultValues: { searchQuery: searchParams.get("query") } });

  useEffect(() => {
    if (!searchParams.get("query")) {
      reset();
    }
  }, [pathname, reset, searchParams]);

  useEffect(() => {
    const searchQuery = getValues("searchQuery");
    if (searchQuery?.length === 0) {
      refetch().then(() => {
        setShowLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("searchQuery")]);

  const onSubmit = async (inputs) => {
    setShowLoading(true);
    refetch();
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold ">Manage Reviews</h1>
      </div>
      <div className="w-full rounded-lg space-y-4 border border-gray-800 py-10 px-8">
        <h2 className="text-xl font-semibold px-4">Search</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full justify-between items-start   space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "Movie name is required" }}
                status={isLoading ? "disabled" : "default"}
                name="searchQuery"
                placeholder="Search for reviews on site"
                disabled={isFetching}
              />
            </div>

            <Button
              isDisabled={errors.searchQuery}
              isLoading={showLoading && isFetching}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-x-8 gap-y-8">
          {reviews?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.count === 0 ? (
                <div>no reviews found</div>
              ) : (
                group?.data?.map((review) => (
                  <div
                    key={review._id}
                    className="px-5 py-6 rounded-xl shadow-sm  flex space-x-6 items-start w-full border border-gray-800"
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
      </div>
      <div className="flex items-center justify-center">
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
