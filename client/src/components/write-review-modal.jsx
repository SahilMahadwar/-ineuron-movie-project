import { useUser } from "@/hooks/use-user";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { cookieKeys } from "@/libs/cookie-constants";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import { set, useForm } from "react-hook-form";
import {
  HiOutlineStar,
  HiOutlineX,
  HiOutlineXCircle,
  HiPencil,
  HiStar,
  HiX,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import { Rating } from "./rating";
import Button from "./ui/button";
import Input from "./ui/input";
import TextArea from "./ui/text-area";

export default function WriteReviewModal({ refetchReviews }) {
  let { movieId } = useParams();
  const [cookies] = useCookies([cookieKeys.authToken]);

  const {
    user,
    isLoading: userIsLoading,
    isError,
    error,
    isPrevError,
  } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);

  function closeModal() {
    setIsOpen(false);
    reset();
  }

  function openModal() {
    setIsOpen(true);
  }

  const getRating = (value) => {
    setRating(value);
  };

  const postReview = useMutation({
    mutationFn: ({ title, review, movie, user }) => {
      return axiosApiInstance.post(
        `/reviews`,
        {
          title: title,
          review: review,
          movie: movie,
          user: user,
        },
        {
          headers: {
            Authorization: cookies.authToken
              ? `Bearer ${cookies.authToken}`
              : null,
          },
        }
      );
    },
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (inputs) => {
    console.log(inputs);
    console.log(rating);

    await postReview.mutateAsync({
      title: inputs.title,
      review: inputs.review,
      movie: movieId,
      user: user._id,
    });

    closeModal();
    reset();
    refetchReviews();

    // Make a success toast
  };

  return (
    <>
      <Button
        type="button"
        intent="secondary"
        size="sm"
        onClick={openModal}
        fullWidth={true}
      >
        Write Review
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-gray-900 border border-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between"
                    >
                      <p className="text-xl font-medium  ">Write your review</p>
                      <HiX
                        onClick={() => closeModal()}
                        className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-200"
                      />
                    </Dialog.Title>
                    <div className="mt-6 space-y-6 mb-6">
                      <Input
                        register={register}
                        config={{ required: "Title  is required" }}
                        isError={errors.title ? true : false}
                        errorMessage={errors.title?.message}
                        name="title"
                        label="Title"
                        placeholder="Good"
                      />
                      <TextArea
                        register={register}
                        config={{ required: "review  is required" }}
                        isError={errors.review ? true : false}
                        errorMessage={errors.review?.message}
                        name="review"
                        label="Review"
                        placeholder="Best action movie ever!"
                      />
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium "
                        >
                          Rating
                        </label>
                        <Rating getRating={getRating} />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        isLoading={postReview.isLoading}
                        size="sm"
                        type="submit"
                      >
                        Post Review
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
