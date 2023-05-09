import { Poster } from "@/components/poster";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { queryKeys } from "@/libs/react-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router-dom";

export const SearchPage = () => {
  const { ref, inView, entry } = useInView();
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({ defaultValues: { searchQuery: searchParams.get("query") } });

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [showLoading, setShowLoading] = useState(false);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const searchQuery = getValues("searchQuery");

    const { data, status } = await axiosApiInstance.get(`/movies`, {
      params: {
        search: searchQuery ? searchQuery : "",
        limit: "12",
        page: pageParam,
      },
    });

    return data;
  };

  const {
    data: movies,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKeys.movies],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage);
      return lastPage.pagination?.next?.page;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  useEffect(() => {
    const searchQuery = getValues("searchQuery");
    if (searchQuery?.length === 0) {
      setShowLoading(false);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("searchQuery")]);

  const onSubmit = async (inputs) => {
    setShowLoading(true);
    refetch();
  };

  return (
    <>
      <div className="w-full  rounded-lg py-8 px-8 space-y-4 border border-gray-800">
        <h1 className="text-2xl font-semibold ">Search</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full justify-between items-start   space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "Movie name is required" }}
                status={isLoading ? "disabled" : "default"}
                name="searchQuery"
                placeholder="Search for movies on TMDB"
                disabled={isFetching}
              />
            </div>

            <Button
              type="submit"
              isDisabled={errors.searchQuery}
              isLoading={showLoading && isFetching}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
              {movies?.pages?.map((group, i) => (
                <React.Fragment key={i}>
                  {group?.count === 0 ? (
                    <div>no movies found</div>
                  ) : (
                    group?.data?.map((movie) => (
                      <Poster
                        posterPath={movie.poster}
                        title={movie.name}
                        key={movie._id}
                      />
                    ))
                  )}
                </React.Fragment>
              ))}
            </div>
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
        </>
      )}
    </>
  );
};

// map over rect query pages data to check if any page is returned we always return a page with count 0 if no data available so we don't need to use this check
// movies?.pages?.map.data?.length === 0
