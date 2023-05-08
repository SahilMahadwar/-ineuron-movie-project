import { useAuth } from "@/hooks/use-auth";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const ProfileDropdown = () => {
  const { logOut } = useAuth();

  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button className=" rounded-full flex text-sm focus:outline-none focus:ring-2  focus:ring-brand-400 items-center hover:text-brand-400 text-gray-100 ">
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <RiArrowDropDownLine className="ml-0.5 " size={18} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" shadow-lg   origin-top-right absolute right-0 mt-2.5 w-48 rounded-md  py-1 bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-800">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={clsx(
                  active ? "bg-gray-800" : "",
                  "block px-4 py-2 text-sm text-gray-50"
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/settings"
                className={clsx(
                  active ? "bg-gray-800" : "",
                  "block px-4 py-2 text-sm text-gray-50"
                )}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logOut}
                className={clsx(
                  active ? "bg-gray-800" : "",
                  "block px-4 py-2 text-sm text-gray-50 w-full text-left"
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
