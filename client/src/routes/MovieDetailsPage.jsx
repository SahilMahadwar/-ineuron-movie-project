import { Link, useLoaderData } from "react-router-dom";
import MovieDetailsCard from "../components/Cards/MovieDetailsCard";
import CreateReviewCard from "../components/CreateReviewCard";
import Button from "../components/Form/Button";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import { axiosApiInstance } from "../lib/axiosApiInstance";
import { axiosTmdbInstance } from "../lib/axiosTmdbInstance";
import { tmdbKey } from "../lib/axiosTmdbInstance/constants";

const getMovieDetails = async (params) => {
  const { data, status } = await axiosApiInstance.get(`/movies/${params}`);

  return data.data;
};

export async function loader({ params }) {
  return getMovieDetails(params.tmdbId);
}

export default function MovieDetailsPage() {
  const movie = useLoaderData();

  const { user, isLoading, isError } = useAuth();

  return (
    <div className="space-y-10">
      {/* Movie Details Card */}
      <MovieDetailsCard
        posterPath={movie.poster}
        name={movie.name}
        adult=""
        status={movie.status}
        releaseDate={movie.releaseDate}
        spokenLanguage={movie.spokenLanguage}
        runtime={movie.runtime}
        genres={movie.genres}
        tagline={movie.tagline}
        description={movie.description}
        isAdmin={false}
      />

      {/* Reviews Part */}
      <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
        {isLoading && <Spinner />}
        {user && !isLoading && <CreateReviewCard movie={movie} />}
        {!user && isError && (
          <div className="space-y-3 flex flex-col items-center justify-center">
            <p className="text-gray-800">Please login to add a review</p>
            <Link to="/auth/login">
              <Button size="xs">Login</Button>
            </Link>
          </div>
        )}
      </div>

      <div className="bg-white  px-8 py-8 rounded-xl shadow-sm"></div>
    </div>
  );
}
