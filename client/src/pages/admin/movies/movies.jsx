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

export const AdminMoviesPage = () => {
  const [cookies, setCookie] = useCookies([cookieKeys.authToken]);
  const { ref, inView, entry } = useInView();
  let [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [showLoading, setShowLoading] = useState(false);

  const fetchMovies = async ({ pageParam = 1 }) => {
    const searchQuery = getValues("searchQuery");

    const { data, status } = await axiosApiInstance.get(`/movies`, {
      params: {
        search: searchQuery ? searchQuery : "",
        limit: "10",
        page: pageParam,
      },
    });

    console.log(data);
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
    queryKey: [queryKeys.movies + "admin-manage"],
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
        <h1 className="text-2xl font-semibold ">Manage Movies</h1>
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
                placeholder="Search for movies on site"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
          {movies?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.count === 0 ? (
                <div>no movies found</div>
              ) : (
                group?.data?.map((movie) => (
                  <Link key={movie._id} to={`/movies/${movie._id}`}>
                    <Poster posterPath={movie.poster} title={movie.name} />
                  </Link>
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
