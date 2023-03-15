import { useContext, useEffect, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

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
            <div className="grid grid-cols-4 gap-x-7 gap-y-10">
              {users?.data.map(
                (user, index) =>
                  index < 4 && (
                    <div key={user._id}>
                      <div className="flex rounded-lg shadow-sm flex-col py-5 px-4 items-center  bg-white space-y-2">
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt={user.name}
                        />
                        <p className="text-gray-700 font-normal">{user.name}</p>
                        <p className="text-gray-600 text-sm font-light ">
                          {user.email}
                        </p>
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
