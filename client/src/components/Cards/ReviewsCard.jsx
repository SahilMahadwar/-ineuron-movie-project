import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewsContext from "../../contexts/MovieDetailsContext";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import Button from "../Form/Button";
import Input from "../Form/Input";
import TextArea from "../Form/TextArea";
import Poster from "./Poster";

export default function ReviewsCard({
  user,
  review: movieReview,
  poster,
  userInfo,
  onSave: _onSave,
  onDelete: _onDelete,
  loggedInUser,
  isAdmin,
  disableAction,
}) {
  const [review, setReview] = useState(movieReview);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const simpleDate = new Date(review.createdAt).toISOString().slice(0, 10);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSave = async (inputs) => {
    setIsLoading(true);
    const updateReviewData = {
      title: inputs.title,
      review: inputs.review,
      reviewId: review._id,
    };

    const data = await _onSave(updateReviewData);

    setReview(data);

    setEditMode(false);

    toast.success(`Review Updated Successfully`);

    setIsLoading(false);
  };

  const onDelete = async () => {
    setIsLoading(true);
    await _onDelete(review._id);
    toast.success(`Review has been deleted`);
    setIsLoading(false);
  };

  return (
    <div className="bg-white px-7 py-8 rounded-xl shadow-sm  flex space-x-6 items-start w-full">
      {poster && (
        <Link to={`/movies/${review.movie._id}`}>
          <Poster
            width="w-28"
            height="h-full"
            title={review.movie.name}
            posterPath={review.movie.poster}
          />
        </Link>
      )}
      <div className="flex flex-col space-y-6  px-1  w-full overflow-hidden">
        {userInfo && (
          <div className="flex-shrink-0 flex items-center space-x-2 ">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <div className="">
              <p className="text-gray-700 font-normal">
                {capitalizeFirstLetter(user.name)}
              </p>
              <p className="text-gray-600 text-sm font-light">{simpleDate}</p>
            </div>
          </div>
        )}

        {editMode ? (
          <div className="w-full  space-y-4 overflow-visible ">
            <Input
              register={register}
              config={{ required: "Title Address is required" }}
              isError={errors.title ? true : false}
              errorMessage={errors.title?.message}
              name="title"
              label="Title"
              defaultValue={review.title}
            />
            <TextArea
              register={register}
              config={{ required: "Review Address is required" }}
              isError={errors.title ? true : false}
              errorMessage={errors.title?.message}
              name="review"
              label="Review"
              defaultValue={review.review}
            />
          </div>
        ) : (
          <div className="space-y-2 break-words">
            <h3 className="text-base text-gray-800 ">{review.title}</h3>
            <p className="text-sm text-gray-600">{review.review}</p>
          </div>
        )}

        {loggedInUser === user._id && !editMode && (
          <div className="space-x-4">
            <Button
              onClick={() => setEditMode(true)}
              intent="secondary"
              size="xs"
              isDisabled={isLoading}
            >
              Edit
            </Button>
            <Button
              isLoading={isLoading}
              onClick={onDelete}
              intent="secondary"
              size="xs"
              isDisabled={disableAction}
            >
              Delete
            </Button>
          </div>
        )}

        {isAdmin && loggedInUser !== user._id && (
          <div className="space-x-4">
            <Button
              isLoading={isLoading}
              onClick={onDelete}
              intent="secondary"
              size="xs"
            >
              Delete
            </Button>{" "}
          </div>
        )}

        {editMode && (
          <div className="space-x-4">
            <Button
              isLoading={isLoading}
              onClick={handleSubmit(onSave)}
              intent="secondary"
              size="xs"
              isDisabled={disableAction}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setEditMode(false);
                reset();
              }}
              intent="secondary"
              size="xs"
              isDisabled={isLoading}
            >
              Discard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
