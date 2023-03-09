import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ReviewsContext from "../contexts/MovieDetailsContext";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import Button from "./Form/Button";

export default function CreateReviewCard({
  movie,
  onPostReview: _onPostReview,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const onPostReview = async (inputs) => {
    setIsLoading(true);
    const reviewData = {
      title: inputs.title,
      review: inputs.review,
      user: user._id,
      movie: movie._id,
    };

    await _onPostReview(reviewData);
    reset();
    setIsLoading(false);
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1 ">
        <form className="relative" onSubmit={handleSubmit(onPostReview)}>
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-brand-200 focus-within:ring-1 focus-within:ring-brand-200 px-4">
            <input
              {...register("title", { required: "Review is required" })}
              name="title"
              id="title"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-md outline-none text-gray-700 border-gray-200"
              placeholder="Add your title (Max 150 Char)"
              defaultValue={""}
            />
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              {...register("review", { required: "Review is required" })}
              name="review"
              id="review"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm outline-none text-gray-700"
              placeholder="Add your review..."
              defaultValue={""}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <FaceSmileIcon className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Button isLoading={isLoading} size="sm" type="submit">
                Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
