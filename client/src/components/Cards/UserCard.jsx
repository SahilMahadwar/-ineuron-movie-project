import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import Button from "../Form/Button";

const UserCard = ({
  name,
  email,
  role,
  userId,
  onDelete: _onDelete,
  disableOnDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await _onDelete(userId);
    toast.success(`User ${name} has been deleted`);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col  items-start px-8  py-6  space-y-6  bg-white rounded-lg shadow-sm overflow-hidden text-ellipsis">
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full "
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt={name}
        />

        <div>
          <h5 className="mb-1 text-xl font-medium text-slate-700 ">{name}</h5>

          <p className="text-sm text-gray-500 ">{email}</p>
        </div>
      </div>
      {role === "USER" && (
        <div className="space-x-3">
          <Button
            leftIcon={<RiDeleteBinLine />}
            intent="secondary"
            size="xs"
            onClick={onDelete}
            isLoading={isLoading}
            isDisabled={disableOnDelete}
          >
            Delete This User
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
