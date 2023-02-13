import { useLoaderData } from "react-router-dom";
import MovieDetailsCard from "../components/Cards/MovieDetailsCard";
import CreateReviewCard from "../components/CreateReviewCard";

import { axiosTmdbInstance } from "../lib/axiosTmdbInstance";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";

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

  console.log(movie);

  return (
    <div className="space-y-10">
      {/* Movie Details Card */}
      <MovieDetailsCard movie={movie} isAdmin={false} />

      {/* Reviews Part */}
      <div className="bg-white  px-8 py-8 rounded-xl shadow-sm"></div>
    </div>
  );
}
