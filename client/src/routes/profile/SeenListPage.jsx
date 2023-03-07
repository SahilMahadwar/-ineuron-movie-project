import { useContext, useEffect } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";
import ReviewsContext from "../../contexts/ReviewsContext";

import { Link } from "react-router-dom";
import Poster from "../../components/Cards/Poster";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

export default function SeenListPage() {
  const { user } = useAuth();

  const { getList, movies, isLoading, isError, error } = useApi();

  useEffect(() => {
    console.log("Seenlist UseEffect Ran");
    if (user) {
      getList("SEENLIST");
    }
  }, [user]);

  return (
    <div className=" w-full ">
      <div className="">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : movies && !isLoading ? (
          <div>
            {movies?.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-x-7 gap-y-10">
                {movies.map((m) => (
                  <Link to={`/movies/${m.movie._id}`} key={m.movie.tmdbId}>
                    <Poster posterPath={m.movie.poster} title={m.movie.name} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : !movies && isError ? (
          <div>{error.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
