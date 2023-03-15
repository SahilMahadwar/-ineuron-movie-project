import { RiErrorWarningLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

export default function StatsCard({
  name,
  stat,
  icon,
  isLoading,
  isError,
  error,
  link,
}) {
  if (isLoading) {
    return (
      <div className="shadow rounded-lg space-x-2  overflow-hidden bg-white flex items-center justify-center">
        <Spinner size="lg" /> <p>Loading Data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="shadow rounded-lg space-x-2  overflow-hidden bg-white flex items-center justify-center">
        <RiErrorWarningLine
          className="h-6 w-6 text-red-600"
          aria-hidden="true"
        />
        <p className="text-red-600">Server Error</p>
      </div>
    );
  }

  if (stat) {
    return (
      <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
        <dt>
          <div className="absolute bg-brand-500 rounded-md p-3">{icon}</div>
          <p className="ml-16 text-sm font-medium text-slate-500 truncate">
            {name}
          </p>
        </dt>
        <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p className="text-2xl font-semibold text-slate-900">{stat}</p>
          <div className="absolute bottom-0 inset-x-0 bg-slate-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                to={link}
                className="font-medium text-brand-600 hover:text-brand-500"
              >
                View all<span className="sr-only"> {name} stats</span>
              </Link>
            </div>
          </div>
        </dd>
      </div>
    );
  }

  return;
}
