import { useContext, useEffect, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import { RiDeleteBinLine, RiUserAddLine } from "react-icons/ri";
import Button from "../../components/Form/Button";
import AdminContext from "../../contexts/AdminContext";
import useAuth from "../../hooks/useAuth";

export function AdminUsersPage() {
  const { users, usersIsLoading, usersIsError, usersError } =
    useContext(AdminContext);

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">Manage Users</h2>

      {usersIsLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : users?.data && !usersIsLoading ? (
        <div>
          {users?.data.length === 0 ? (
            <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
              no reviews found
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-7 gap-y-10">
              {users?.data.map(
                (user, index) =>
                  index < 4 && (
                    <div key={user._id}>
                      <div className="flex flex-col  items-start px-8  py-6  space-y-6  bg-white rounded-lg shadow-sm overflow-hidden text-ellipsis">
                        <div className="flex items-center space-x-4">
                          <img
                            className="w-16 h-16 rounded-full "
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            alt={user.name}
                          />

                          <div>
                            <h5 className="mb-1 text-xl font-medium text-slate-700 ">
                              {user.name}
                            </h5>

                            <p class="text-sm text-gray-500 ">{user.email}</p>
                          </div>
                        </div>
                        {user.role === "USER" && (
                          <div className="space-x-3">
                            <Button
                              leftIcon={<RiDeleteBinLine />}
                              intent="secondary"
                              size="xs"
                            >
                              Delete This User
                            </Button>
                            <Button
                              intent="secondary"
                              size="xs"
                              leftIcon={<RiUserAddLine />}
                            >
                              Promote To Admin
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      ) : !users?.data && usersIsError ? (
        <div>{usersError.message}</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUsersPage;
