import { Poster } from "@/components/poster";
import { useUser } from "@/hooks/use-user";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { queryKeys } from "@/libs/react-query/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export const SeenPage = () => {
  const { ref, inView, entry } = useInView();
  const [cookies, setCookie] = useCookies([cookieKeys.authToken]);

  const fetchSeenlist = async ({ pageParam = 1 }) => {
    const { data, status } = await axiosApiInstance.get(
      `/list/seenlist`,
      {
        headers: {
          Authorization: cookies.authToken
            ? `Bearer ${cookies.authToken}`
            : null,
        },
      },
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
    data: seenlist,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [queryKeys.mySeenlist],
    queryFn: fetchSeenlist,
    getNextPageParam: (lastPage, pages) => {
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

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12">
        {seenlist?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group?.count === 0 ? (
              <div>no movies found</div>
            ) : (
              group?.data?.map(({ movie }) => (
                <Link to={`/movies/${movie._id}`}>
                  {console.log(movie)}
                  <Poster
                    posterPath={movie.poster}
                    title={movie.name}
                    key={movie._id}
                  />
                </Link>
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
