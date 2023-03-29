import { useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { HiOutlineArrowDown } from "react-icons/hi";
import Icon from "../Icon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AddMovieOptions({ selected, setSelected, addMovieOptions }) {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-y-4">
        {addMovieOptions.map((option) => (
          <RadioGroup.Option
            key={option.name}
            value={option}
            defaultValue={addMovieOptions[0]}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "ring-2 ring-brand-500" : "",
                "relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm flex items-center justify-center space-x-2">
                    <Icon size="md" className={"text-brand-500"}>
                      {option.icon}
                    </Icon>
                    <RadioGroup.Label
                      as="p"
                      className="font-medium text-gray-900"
                    >
                      {option.name}
                    </RadioGroup.Label>
                  </div>
                </div>

                <div
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-brand-500" : "border-transparent",
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
  );
}

export default AddMovieOptions;
