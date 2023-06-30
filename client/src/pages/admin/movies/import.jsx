import { Poster } from "@/components/poster";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { axiosTmdbInstance } from "@/libs/axios-tmdb-instance";
import { tmdbKey } from "@/libs/axios-tmdb-instance/constants";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const AdminImportMoviePage = () => {
  const [cookies, setCookie] = useCookies([cookieKeys.authToken]);
  const { ref, inView, entry } = useInView();
  let [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [showLoading, setShowLoading] = useState(false);

  const [resetQueryKey, setResetQueryKey] = useState("popular");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm({ defaultValues: { searchQuery: searchParams.get("query") } });

  const tmdbSearch = async ({ pageParam = 1 }) => {
    const searchQuery = getValues("searchQuery");

    if (searchQuery?.length > 0) {
      const convertedQuery = searchQuery.split(" ").join("%20").toLowerCase();

      const { data } = await axiosTmdbInstance.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${convertedQuery}&page=${pageParam}&include_adult=true`
      );

      return data;
    } else {
      console.log("reached here");
      // popular movies
      const { data } = await axiosTmdbInstance.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}&language=en-US&page=${pageParam}`
      );

      return data;
    }
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
    queryKey: [queryKeys.movies + `tmdb-${resetQueryKey}`],
    queryFn: tmdbSearch,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage);
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;
    },
    keepPreviousData: false,

    retry: 1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  // reset form
  useEffect(() => {
    if (!searchParams.get("query")) {
      reset();
    }
  }, [pathname, reset, searchParams]);

  useEffect(() => {
    const searchQuery = getValues("searchQuery");
    if (searchQuery?.length === 0) {
      setResetQueryKey("popular");
      refetch().then(() => {
        setShowLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("searchQuery")]);

  const onSubmit = async (inputs) => {
    const searchQuery = getValues("searchQuery");
    setResetQueryKey("search" + searchQuery);
    setShowLoading(true);
    refetch();
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-semibold ">Import Movie</h1>
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
              {group?.results?.map((movie) => (
                <Poster
                  key={movie.id}
                  posterPath={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  title={movie.title}
                />
              ))}
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
