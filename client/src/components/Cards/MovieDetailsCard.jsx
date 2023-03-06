import { useEffect, useState } from "react";

import {
  RiBookmark2Line,
  RiBookmarkLine,
  RiCheckDoubleLine,
  RiCheckLine,
} from "react-icons/ri";
import { Link, useLocation, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import { convertRuntimeToHours } from "../../utils/tmdb";
import Button from "../Form/Button";

import Poster from "./Poster";

export function MovieDetailsCard(props) {
  const {
    posterPath,
    name,
    adult,
    status,
    releaseDate,
    spokenLanguage,
    runtime,
    genres,
    tagline,
    description,
    isAdmin = false,
    lists,
    movieId,
  } = props;

  const { addToWebsite, isError, error, addMovieToList, removeMovieFromList } =
    useApi();

  const [watchlist, setWatchlist] = useState(lists.watchlist);
  const [seenlist, setSeenlist] = useState(lists.seenlist);

  const [isLoading, setIsLoading] = useState({
    watchlist: false,
    seenlist: false,
  });

  const handleAddToSite = async () => {
    await addToWebsite(); // have to pass props as data
    console.log("movies added successfully");
  };

  const handleAdd = async (listName) => {
    if (listName === "WATCHLIST") {
      setIsLoading({ watchlist: true });
    } else {
      setIsLoading({ seenlist: true });
    }

    const data = { list: listName, movieId: movieId, name: name };
    const { success } = await addMovieToList(data);
    if (success) {
      if (listName === "WATCHLIST") {
        setWatchlist(true);
      }

      if (listName === "SEENLIST") {
        setSeenlist(true);
      }
    }

    if (listName === "WATCHLIST") {
      setIsLoading({ watchlist: false });
    } else {
      setIsLoading({ seenlist: false });
    }
  };

  const handleRemove = async (listName) => {
    if (listName === "WATCHLIST") {
      setIsLoading({ watchlist: true });
    } else {
      setIsLoading({ seenlist: true });
    }

    const data = { list: listName, movieId: movieId, name: name };
    const { success } = await removeMovieFromList(data);
    if (success) {
      if (listName === "WATCHLIST") {
        setWatchlist(false);
      }

      if (listName === "SEENLIST") {
        setSeenlist(false);
      }
    }

    if (listName === "WATCHLIST") {
      setIsLoading({ watchlist: false });
    } else {
      setIsLoading({ seenlist: false });
    }
  };

  return (
    <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
      <div className="flex space-x-8 justify-between">
        <Poster
          width="w-64"
          height="h-96"
          posterPath={posterPath}
          title={name}
          adult={adult}
        />
        <div className="py-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>

            {status === "Released" ? (
              <p className="text-sm text-gray-700 flex items-center">
                {releaseDate}
                {spokenLanguage && runtime > 0 && (
                  <>
                    <span className="block w-1 h-1 bg-gray-500 rounded ml-2 mr-2"></span>
                    {convertRuntimeToHours(runtime)}
                    <span className="block w-1 h-1 bg-gray-500 rounded ml-2 mr-2"></span>
                    {spokenLanguage}
                  </>
                )}
              </p>
            ) : (
              <p className="text-sm text-gray-700 flex items-center">
                Not released yet in {status?.toLowerCase()}
              </p>
            )}
          </div>

          {isAdmin && <Button onClick={handleAddToSite}>Add To Website</Button>}

          {!isAdmin && (
            <div>
              {watchlist != null && seenlist != null ? (
                <div className="space-x-2 flex items-center ">
                  {watchlist ? (
                    <Button
                      intent="active"
                      size="sm"
                      onClick={() => handleRemove("WATCHLIST")}
                      isLoading={isLoading.watchlist}
                      isDisabled={isLoading.seenlist}
                      leftIcon={<RiBookmark2Line />}
                    >
                      Remove From Watchlist
                    </Button>
                  ) : (
                    <Button
                      intent="secondary"
                      size="sm"
                      isLoading={isLoading.watchlist}
                      isDisabled={isLoading.seenlist}
                      onClick={() => handleAdd("WATCHLIST")}
                      leftIcon={<RiBookmarkLine />}
                    >
                      Add To Watchlist
                    </Button>
                  )}

                  {seenlist ? (
                    <Button
                      intent="active"
                      size="sm"
                      isLoading={isLoading.seenlist}
                      isDisabled={isLoading.watchlist}
                      onClick={() => handleRemove("SEENLIST")}
                      leftIcon={<RiCheckDoubleLine />}
                    >
                      Watched
                    </Button>
                  ) : (
                    <Button
                      intent="secondary"
                      size="sm"
                      isLoading={isLoading.seenlist}
                      isDisabled={isLoading.watchlist}
                      onClick={() => handleAdd("SEENLIST")}
                      leftIcon={<RiCheckLine />}
                    >
                      Already watched
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/auth/login">
                    <Button>Add To Watchlist</Button>
                  </Link>

                  <Link to="/auth/login">
                    <Button>Add To Seenlist</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="space-y-1">
            <p className="text-gray-800 font-semibold text-sm">Genres</p>
            <div className="space-x-2">
              {genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1 ">
            <p className="text-sm text-gray-700 italic">{tagline}</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-700 font-semibold text-sm">Overview</p>
            <p className="text-gray-700">{description}</p>
          </div>
        </div>
        <div className="w-64 h-96 shrink-0"></div>
      </div>
    </div>
  );
}

export default MovieDetailsCard;
