import { useContext, useEffect, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import { Link } from "react-router-dom";
import Poster from "../../components/Cards/Poster";
import ProfileContext from "../../contexts/ProfileContext";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

export default function WatchListPage() {
  const { user } = useAuth();

  const { getList, movies, isError, error } = useContext(ProfileContext);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMyWatchlist("WATCHLIST");
    }
  }, [user]);

  const fetchMyWatchlist = async (listName) => {
    try {
      if (movies.watchlist) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      await getList(listName);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full ">
      <div className="">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : movies.watchlist && !isLoading ? (
          <div>
            {movies.watchlist?.length === 0 ? (
              <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
                no movies found
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-x-7 gap-y-10">
                {movies.watchlist.map((m) => (
                  <Link to={`/movies/${m.movie._id}`} key={m.movie.tmdbId}>
                    <Poster posterPath={m.movie.poster} title={m.movie.name} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : !movies.watchlist && isError ? (
          <div>{error.message}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
