import { HiOutlineStar, HiOutlineTrash, HiStar } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Button from "../ui/button";

export function ReviewCard({
  userName,
  createdAt,
  title,
  review,
  rating,
  userAvatar = "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}) {
  return (
    <div className="px-5 py-6 rounded-xl shadow-sm  flex space-x-6 items-start w-full border border-gray-800 overflow-visible">
      <div className="flex flex-col space-y-4  px-1  w-full overflow-hidden">
        <div className="space-y-2 break-words">
          <h3 className="text-base font-semibold leading-relaxed">{title}</h3>

          <p className="text-sm text-gray-100 leading-relaxed">{review}</p>
        </div>

        <div>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            const filled = starValue <= parseInt(rating);

            return (
              <span key={index}>
                {filled ? (
                  <HiStar className="inline-block text-yellow-500 w-5 h-5" />
                ) : (
                  <HiOutlineStar className="inline-block text-yellow-500 w-5 h-5" />
                )}
              </span>
            );
          })}
        </div>

        <div className="border-t border-gray-800 pt-3 flex justify-between w-full items-center">
          <div className="flex items-center space-x-2 pb-1">
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={userAvatar}
              alt={`${userName}'s avatar`}
            />
            <div>
              <p className="font-normal ">{userName}</p>
              <p className="text-xs  text-gray-100">
                {new Date(createdAt).toISOString().slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="space-x-2 flex-shrink-0">
            <Button size="xs" intent="secondary">
              <HiOutlinePencilSquare className="inline-block  w-4 h-4" />
            </Button>
            <Button size="xs" intent="secondary">
              <HiOutlineTrash className="inline-block  w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
