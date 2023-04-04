import Logo from "@/assets/Logo";
import { UserProfileMenu } from "@/components/Navbar/UserProfileMenu";

import { Disclosure } from "@headlessui/react";
import { Backdrop } from "../Backdrop/Backdrop";

export const Navbar = () => {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between py-6   ">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Logo type="full" />
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Profile dropdown */}
                <UserProfileMenu />
              </div>

              <div className="flex items-center sm:hidden">
                <UserProfileMenu />
              </div>
            </div>
          </div>
          <Backdrop height="h-[500px]" />
        </>
      )}
    </Disclosure>
  );
};
