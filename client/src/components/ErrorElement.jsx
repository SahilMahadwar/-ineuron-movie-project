import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouteError } from "react-router-dom";

export default function ErrorElement() {
  const error = useRouteError();

  return (
    <>
      <div className="rounded-lg bg-red-50 border border-red-100   p-4">
        <div className="flex">
          <div className="flex-shrink-0 mt-1">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <div className="flex space-y-1 flex-col">
              <h3 className="text-lg font-semibold text-red-800">Oops!</h3>
              <p className="text-sm  text-red-700">
                Sorry, an unexpected error has occurred.
              </p>
            </div>

            <div className="mt-4 text-sm text-red-700">
              <ul role="list" className="list-disc pl-5 space-y-1">
                <li> {error.statusText || error.message}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
