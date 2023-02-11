import { useLoaderData, useParams, useRouteError } from "react-router-dom";
import Button from "../components/Form/Button";
import Poster from "../components/Poster";
import Spinner from "../components/Spinner";
import { useApi } from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { useTmdb } from "../hooks/useTmdb";
import { axiosApiInstance } from "../lib/axiosApiInstance";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";
import { convertRuntimeToHours } from "../utils/tmdb";

const getMovieDetails = async (params) => {
  const { data, status } = await axiosTmdbInstance.get(
    `https://api.themoviedb.org/3/movie/${params}?api_key=${tmdbKey}&language=en-US`
  );

  return data;
};

export async function loader({ params }) {
  return getMovieDetails(params.tmdbId);
}

export default function MovieDetails() {
  const movie = useLoaderData();

  const { user, isLoading, isError, error } = useAuth();
  const { addToWebsite } = useApi();

  console.log(movie);

  const handleAdd = async () => {
    await addToWebsite(movie);
    console.log("movies added successfully");
  };

  return (
    <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
      <div className="flex space-x-8 justify-between">
        <Poster
          width="w-64"
          height="h-96"
          movieId={movie.id}
          posterPath={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
          title={movie.title}
          key={movie.id}
          overview={movie.overview}
          adult={movie.adult}
          voteAverage={movie.vote_average}
          releaseDate={movie.release_date}
        />
        <div className="py-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>

            {movie.status === "Released" ? (
              <p className="text-sm text-gray-700 flex items-center">
                {movie.release_date}
                {movie.spoken_languages[0]?.english_name &&
                  movie.runtime > 0 && (
                    <>
                      <span className="block w-1 h-1 bg-gray-500 rounded ml-2 mr-2"></span>
                      {convertRuntimeToHours(movie.runtime)}
                      <span className="block w-1 h-1 bg-gray-500 rounded ml-2 mr-2"></span>
                      {movie.spoken_languages[0]?.english_name}
                    </>
                  )}
              </p>
            ) : (
              <p className="text-sm text-gray-700 flex items-center">
                Not released yet in {movie.status.toLowerCase()}
              </p>
            )}
          </div>

          {isLoading && <Spinner />}

          {user && user.role === "ADMIN" && (
            <Button onClick={handleAdd}>Add To Website</Button>
          )}

          <div className="space-y-1">
            <p className="text-gray-800 font-semibold text-sm">Genres</p>
            <div className="space-x-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1 ">
            <p className="text-sm text-gray-700 italic">{movie.tagline}</p>
          </div>

          <div className="space-y-1">
            <p className="text-gray-700 font-semibold text-sm">Overview</p>
            <p className="text-gray-700">{movie.overview}</p>
          </div>
        </div>
        <div className="w-64 h-96 shrink-0"></div>
      </div>
    </div>
  );
}
