import { Link } from "react-router-dom";

import { RiDeleteBinLine } from "react-icons/ri";

import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Form/Button";
import Poster from "./Poster";

export function AdminMovieCard({
  title,
  posterPath,
  overview,
  voteAverage,
  releaseDate,
  adult,
  movieId,
  onDelete: _onDelete,
  disableOnDelete,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await _onDelete(movieId);
    toast.success(`Movie ${title} has been deleted`);
    setIsLoading(false);
  };

  return (
    <div className="bg-white flex p-6 rounded-xl shadow-sm space-x-6 h-full">
      <div className="shrink-0">
        <Link to={`/movies/${movieId}`}>
          <Poster posterPath={posterPath} />
        </Link>
      </div>
      <div className="w-full space-y-3">
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
        <Button
          onClick={onDelete}
          intent="secondary"
          size="sm"
          isLoading={isLoading}
          leftIcon={<RiDeleteBinLine />}
          isDisabled={disableOnDelete}
        >
          Remove from site
        </Button>
        <p className="text-sm text-gray-600">{overview}</p>
      </div>
    </div>
  );
}

export default AdminMovieCard;
