import Logo from "@/assets/logo";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { useUser } from "@/hooks/use-user";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/button";
import Spinner from "./ui/spinner";

export const Navbar = () => {
  const { user, isLoading, isError, error, isPrevError } = useUser();

  return (
    <Disclosure as="nav" className="border-b border-b-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between py-6 items-center">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Logo type="full" />
                </div>
              </div>

              {isLoading && !isPrevError ? (
                <Spinner size="sm" />
              ) : user?.email ? (
                <>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {/* Profile dropdown */}
                    <ProfileDropdown />
                  </div>
                  <div className="flex items-center sm:hidden">
                    <ProfileDropdown />
                  </div>
                </>
              ) : (
                <Link to="/auth/login">
                  <Button size="xs">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
