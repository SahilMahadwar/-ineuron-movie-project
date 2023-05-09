import { Poster } from "@/components/poster";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { queryKeys } from "@/libs/react-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const HomePage = () => {
  const { ref, inView, entry } = useInView();

  const fetchMovies = async ({ pageParam = 1 }) => {
    const { data, status } = await axiosApiInstance.get(`/movies`, {
      params: {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {movies?.pages?.map.data?.length === 0 ? (
          <div>no movies found</div>
        ) : (
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
        )}
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
