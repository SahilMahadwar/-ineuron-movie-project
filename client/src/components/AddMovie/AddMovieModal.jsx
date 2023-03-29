import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import {
  HiOutlineArrowDownOnSquare,
  HiOutlineArrowSmallRight,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "../Form/Button";
import AddMovieOptions from "./AddMovieOptions";

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

export function AddMovieModal({ open, setOpen }) {
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3    text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-700"
                      >
                        How Would You Like To Add New Movie?
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                      <div className="mt-6 mb-6">
                        <AddMovieOptions
                          addMovieOptions={addMovieOptions}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 flex justify-between  items-center w-full py-3 space-x-4 px-6">
                  <Button
                    intent="secondary"
                    size="sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate(
                        selected.value === "tmdb"
                          ? "/admin/movies/add-tmdb"
                          : "/admin/movies/add-manual"
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

export default AddMovieModal;
