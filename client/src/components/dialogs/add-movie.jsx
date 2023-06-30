import Button from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef, useState } from "react";
import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowSmallRight,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const addMovieOptions = [
  {
    name: "Import Movie Via TMDB - Recommended",
    value: "tmdb",
    icon: <HiOutlineArrowDownOnSquare />,
  },
  {
    name: "Manually Add Movie",
    value: "manual",
    icon: <HiOutlinePencilSquare />,
  },
];

export function AddMovieDialog({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [selected, setSelected] = useState(addMovieOptions[0]);
  const navigate = useNavigate();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity firefox:bg-opacity-90 backdrop-blur-sm backdrop-filter" />
        </Transition.Child>

        <div className="fixed  top-10 inset-x-0  z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left  transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3    text-center sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="font-semibold leading-6">
                        How Would You Like To Add New Movie?
                      </Dialog.Title>
                      <div className="mt-1">
                        <p className="text-sm text-gray-200">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                      <div className="mt-6 mb-6">
                        <RadioGroup value={selected} onChange={setSelected}>
                          <RadioGroup.Label className="sr-only">
                            Server size
                          </RadioGroup.Label>
                          <div className="space-y-4">
                            {addMovieOptions.map((option) => (
                              <RadioGroup.Option
                                key={option.name}
                                value={option}
                                defaultValue={addMovieOptions[0]}
                                className={({ checked, active }) =>
                                  clsx(
                                    checked
                                      ? "border-transparent"
                                      : "border-gray-700",
                                    active ? "ring-2 ring-brand-500" : "",
                                    "relative block  border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex items-center">
                                      <div className="text-sm flex items-center justify-center space-x-2">
                                        <Icon
                                          size="md"
                                          className="text-brand-400"
                                        >
                                          {option.icon}
                                        </Icon>
                                        <RadioGroup.Label
                                          as="p"
                                          className="font-medium "
                                        >
                                          {option.name}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>

                                    <div
                                      className={clsx(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-brand-500"
                                          : "border-transparent",
                                        "absolute -inset-px rounded-lg pointer-events-none"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 bg-gray-800 flex justify-end items-center w-full py-3 space-x-2 px-6">
                  <Button
                    intent="secondary"
                    size="xs"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => {
                      navigate(
                        selected.value === "tmdb"
                          ? "/admin/manage-movies/import"
                          : "/admin/manage-movies/add"
                      );
                      setOpen(false);
                    }}
                    rightIcon={<HiOutlineArrowSmallRight />}
                  >
                    Next
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
