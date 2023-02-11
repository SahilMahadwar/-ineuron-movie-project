import { useEffect, useState } from "react";

import { useTmdb } from "../../hooks/useTmdb";
import Input from "../Form/Input";
import MovieCard from "../MovieCard";
import Poster from "../Poster";
import SlideOver from "./SlideOver";

export default function TmdbMovieSearch({ open, setOpen }) {
  const [movies, setMovies] = useState();
  const [movieInput, setMovieInput] = useState("");

  const { movieSearch, isLoading, isError, error } = useTmdb();

  useEffect(() => {
    searchMovie(movieInput);
  }, [movieInput]);

  useEffect(() => {
    setMovies();
  }, [open]);

  const searchMovie = async (input) => {
    setMovies();

    if (input.length === 0) {
      return setMovies();
    }

    const { data, success } = await movieSearch(input);

    if (success === true) {
      console.log(data);
      setMovies(data);
    }
  };

  return (
    <SlideOver open={open} setOpen={setOpen} title="Search for movies on TMDB">
      <Input onChange={(e) => setMovieInput(e.target.value)} />

      {isError && (
        <div>
          {error?.message === "Network Error" ? (
            <div>Tmdb api offline please try again later</div>
          ) : (
            <div>{error?.message}</div>
          )}
        </div>
      )}

      {isLoading && <div>Loading...</div>}

      <div className="mt-8">
        {movies?.length === 0 ? (
          <div>no movies found</div>
        ) : (
          <div className=" space-y-12  ">
            {movies?.map((movie) => (
              <MovieCard
                movieId={movie.id}
                posterPath={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
                title={movie.title}
                key={movie.id}
                overview={movie.overview}
                adult={movie.adult}
                voteAverage={movie.vote_average}
                releaseDate={movie.release_date}
              />
            ))}
          </div>
        )}
      </div>
    </SlideOver>
  );
}
