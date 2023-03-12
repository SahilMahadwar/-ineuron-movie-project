import MovieDetailsCard from "../../../components/Cards/MovieDetailsCard";

import { useLoaderData } from "react-router-dom";
import { axiosTmdbInstance } from "../../../lib/axiosTmdbInstance";
import { tmdbKey } from "../../../lib/axiosTmdbInstance/constants";

import { convertRuntimeToHours } from "../../../utils/tmdb";

const getMovieDetails = async (tmdbId) => {
  const { data, status } = await axiosTmdbInstance.get(
    `/movie/${tmdbId}?api_key=${tmdbKey}&language=en-US`
  );

  return data;
};

export async function loader({ params }) {
  return getMovieDetails(params.tmdbId);
}

export default function TmdbMovie() {
  const movie = useLoaderData();

  return (
    <div className="space-y-10 ">
      {/* Movie Details Card */}
      <MovieDetailsCard
        name={movie.original_title}
        posterPath={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        adult={movie.adult}
        status={movie.status}
        releaseDate={movie.release_date}
        runtime={movie.runtime}
        spokenLanguage={movie.spoken_languages[0].english_name}
        genres={movie.genres.map((genre) => {
          return genre.name;
        })}
        tagline={movie.tagline}
        description={movie.overview}
        movieId={movie.id}
        isAdmin={true}
        lists={{
          watchlist: false,
          seenlist: false,
        }}
      />
    </div>
  );
}
