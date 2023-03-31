import { Link } from "react-router-dom";

import { HiOutlineArrowDownOnSquare } from "react-icons/hi2";

import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import useApi from "../../hooks/useApi";
import { useTmdb } from "../../hooks/useTmdb";
import Button from "../Form/Button";
import Poster from "./Poster";

export function TMDBMovieCard({
  title,
  posterPath,
  overview,
  voteAverage,
  releaseDate,
  adult,
  movieId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkMovieIsLoading, setCheckMovieIsLoading] = useState(true);

  const [alreadyExists, setAlreadyExists] = useState(false);

  const [dbMovieId, setDbMovieId] = useState();

  const { getAllMoviesOnSite, addMovieToWebsite, deleteMovie } = useApi();

  const { getMovieById } = useTmdb();

  useEffect(() => {
    checkIfMovieAlreadyExists();
  }, []);

  const checkIfMovieAlreadyExists = async () => {
    setCheckMovieIsLoading(true);
    const { data, count } = await getAllMoviesOnSite(null, null, movieId);

    if (count === 1) {
      setDbMovieId(data[0]._id);
      console.log(`Movie ${title} already exists in db`);
      setAlreadyExists(true);
    } else {
      console.log(`Movie ${title} not found`);
    }
    setCheckMovieIsLoading(false);
  };

  const onImport = async () => {
    setIsLoading(true);
    try {
      const tmdbData = await getMovieById(movieId);

      console.log(tmdbData);

      const movie = {
        name: tmdbData.title,
        tmdbId: tmdbData.id,
        poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${tmdbData.poster_path}`,
        description: tmdbData.overview,
        status: tmdbData.status,
        tagline: tmdbData.tagline,
        spokenLanguage:
          tmdbData.spoken_languages.length > 0
            ? tmdbData.spoken_languages[0]?.english_name ||
              tmdbData.spoken_languages[0].name
            : null,

        runtime: tmdbData.runtime,
        genres:
          tmdbData.genres.length > 0
            ? tmdbData.genres.map((genre) => {
                return genre.name;
              })
            : null,
        releaseDate: tmdbData.release_date,
        adult: tmdbData.adult,
      };

      const { success, data } = await addMovieToWebsite(movie);

      if (success) {
        setDbMovieId(data._id);
        setAlreadyExists(true);
        toast.success(`Movie ${title} has been imported successfully`);
      }

      console.log(movie);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const status = await deleteMovie(dbMovieId);
      console.log(status);

      if (status.success) {
        setAlreadyExists(false);
        toast.success(`Movie ${title} has been deleted`);
      } else {
        toast.error(`Movie ${title} already deleted`);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white flex p-6 rounded-xl shadow-sm space-x-6 h-full">
      <div className="shrink-0">
        <Link to={`/admin/movies/add-tmdb/${movieId}`}>
          <Poster posterPath={posterPath} />
        </Link>
      </div>
      <div className="w-full space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>

        {checkMovieIsLoading && (
          <Button
            onClick={onDelete}
            intent="secondary"
            size="sm"
            isLoading={true}
          >
            AAAAAAAAAAAAAAAAA
          </Button>
        )}

        {alreadyExists && !checkMovieIsLoading && (
          <Button
            onClick={onDelete}
            intent="secondary"
            size="sm"
            isLoading={isLoading}
            leftIcon={<RiDeleteBinLine />}
          >
            Remove Movie From Site
          </Button>
        )}

        {!alreadyExists && !checkMovieIsLoading && (
          <Button
            onClick={onImport}
            intent="secondary"
            size="sm"
            isLoading={isLoading}
            leftIcon={<HiOutlineArrowDownOnSquare />}
          >
            Import This Movie
          </Button>
        )}

        <p className="text-sm text-gray-600">{overview}</p>
      </div>
    </div>
  );
}

export default TMDBMovieCard;
