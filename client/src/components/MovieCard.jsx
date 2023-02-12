import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import Button from "./Form/Button";
import Poster from "./Poster";

export function MovieCard({
  title,
  posterPath,
  overview,
  voteAverage,
  releaseDate,
  adult,
  movieId,
}) {
  return (
    <div>
      <div className="w-full flex space-x-4     ">
        <div className="flex flex-col items-center relative">
          <Poster
            width="w-32"
            height="h-48"
            title={title}
            posterPath={posterPath}
          />
          {adult && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded absolute bottom-2">
              ADULT
            </span>
          )}
          {/* <div className="mt-3 absolute -bottom-4">
              <Button size="xs">Add To Website</Button>
            </div> */}
        </div>

        <div className=" space-y-2">
          <h3 className="text-lg font-semibold leading-snug text-gray-900">
            {title}
          </h3>
          <div className="flex space-x-2 ">
            <span className="bg-green-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded flex items-center">
              {voteAverage}
            </span>
            <p className="text-sm font-normal text-gray-800 ">{releaseDate}</p>
          </div>

          <div>
            <Link to={`/admin/movies/${movieId}`}>
              <button className=" text-brand-500 bg-brand-100  w-fit  text-xs font-semibold px-2.5 py-1 rounded mt-1.5 mb-0.5 ">
                Add to website
              </button>
            </Link>
          </div>

          <div className="relative max-h-16 overflow-hidden ">
            <p className="text-sm text-gray-800">{overview}</p>
            {/* <div className="w-full h-8 bg-gradient-to-t from-white absolute bottom-0"></div> */}
          </div>

          <div className="relative  overflow-hidden ">
            <Link to={`/admin/movies/${movieId}`}>
              <p className=" text-gray-600 bg-white  w-fit  text-xs font-semibold rounded hover:text-brand-500 ">
                More Info
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// w-48 h-72
export default MovieCard;
