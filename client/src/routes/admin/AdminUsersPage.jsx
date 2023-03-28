import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ReviewsCard from "../../components/Cards/ReviewsCard";
import Spinner from "../../components/Spinner";

import { useForm } from "react-hook-form";
import { RiDeleteBinLine, RiUserAddLine } from "react-icons/ri";
import UserCard from "../../components/Cards/UserCard";
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import AdminContext from "../../contexts/AdminContext";
import useAuth from "../../hooks/useAuth";

export function AdminUsersPage() {
  const {
    users,
    usersIsLoading,
    usersIsError,
    usersError,
    getUsers,
    deleteUser,
    disableAction,
  } = useContext(AdminContext);

  const [refetch, setRefetch] = useState(false);

  // disables moviesIsLoading spinner on manual search or refetching movies again
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  useEffect(() => {
    getAllUsersAgain();
  }, [watch("searchQuery")]);

  const getAllUsersAgain = async () => {
    if (refetch) {
      const searchQuery = getValues("searchQuery");
      if (searchQuery.length === 0) {
        setSearchIsLoading(true);
        await getUsers();
        setRefetch(false);
        setSearchIsLoading(false);
      }
    }
  };

  const onSearch = async (inputs) => {
    setSearchIsLoading(true);
    await getUsers(inputs.searchQuery);
    setRefetch(true);
    setSearchIsLoading(false);
  };

  const observer = useRef();

  const lastReviewCardRef = useCallback(
    (node) => {
      if (usersIsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && users.pagination.next) {
          getMoreUsers();
          console.log("Fetching more users");
        }
      });
      if (node) observer.current.observe(node);
    },
    [usersIsLoading, users?.pagination.next]
  );

  const getMoreUsers = async () => {
    if (users?.pagination.next) {
      const searchQuery = getValues("searchQuery");
      const nextPage = users?.pagination.next.page;

      await getUsers(searchQuery, nextPage);
    }
  };

  const removeUser = async (userId) => {
    return deleteUser(userId);
  };

  return (
    <div className="w-full space-y-10">
      <h2 className="text-2xl font-semibold text-slate-700">Manage Users</h2>

      <div className="bg-white rounded-lg py-8 px-8 space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">Search</h1>

        <form onSubmit={handleSubmit(onSearch)}>
          <div className="flex w-full justify-between items-start space-x-2">
            <div className="w-full">
              <Input
                register={register}
                config={{ required: "User name or email is required" }}
                name="searchQuery"
                placeholder="Search for users by name or email"
              />
            </div>

            <Button
              type="submit"
              isDisabled={errors.searchQuery}
              isLoading={usersIsLoading}
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {users?.data && !usersIsError ? (
        <div>
          {users?.data.length === 0 ? (
            <div className="bg-white  px-8 py-8 rounded-xl shadow-sm">
              no users found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-7 gap-y-10">
              {users?.data.map((user, index) => {
                if (users?.data.length === index + 1) {
                  return (
                    <div ref={lastReviewCardRef} key={user._id}>
                      <UserCard
                        email={user.email}
                        name={user.name}
                        role={user.role}
                        userId={user._id}
                        onDelete={removeUser}
                        disableOnDelete={disableAction}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={user._id}>
                      <UserCard
                        email={user.email}
                        name={user.name}
                        role={user.role}
                        userId={user._id}
                        onDelete={removeUser}
                        disableOnDelete={disableAction}
                      />
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      ) : usersIsError ? (
        <div>{usersError}</div>
      ) : (
        ""
      )}

      {searchIsLoading
        ? null
        : usersIsLoading && (
            <div className="min-h-80 w-full flex items-center justify-center py-4 space-x-2">
              <Spinner /> <p>Loading new users please wait</p>
            </div>
          )}
    </div>
  );
}

export default AdminUsersPage;
