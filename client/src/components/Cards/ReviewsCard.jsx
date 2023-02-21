import useAuth from "../../hooks/useAuth";
import Button from "../Form/Button";

export default function ReviewsCard({ user, review }) {
  const simpleDate = new Date(review.createdAt).toISOString().slice(0, 10);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const { user: loggedInUser } = useAuth();

  return (
    <div className="flex flex-col  bg-white  space-y-6   px-8 py-8 rounded-xl shadow-sm overflow-hidden">
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

      <div className="w-full  space-y-2 break-words">
        <h3 className="text-base text-gray-800 ">{review.title}</h3>
        <p className="text-sm text-gray-600 ">{review.review}</p>
      </div>

      {loggedInUser?._id === user._id && (
        <div className="space-x-3">
          <Button intent="secondary" size="xs">
            Edit
          </Button>
          <Button intent="secondary" size="xs">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
