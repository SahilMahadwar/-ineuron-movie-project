import { Link } from "react-router-dom";

export const StatsCard = ({ stat, name, icon }) => {
  return (
    <div className="relative  pt-5 px-4 pb-12 sm:pt-6 sm:px-6  rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
      <dt>
        <div className="absolute bg-brand-500 rounded-md p-3">{icon}</div>
        <p className="ml-16 text-sm font-medium text-gray-200 truncate">
          {name}
        </p>
      </dt>
      <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
        <p className="text-2xl font-semibold text-white">{stat}</p>

        <div className="absolute bottom-0 border-t border-gray-800  inset-x-0  px-4 py-4 sm:px-6">
          <div className="text-sm">
            <Link
              href="#"
              className="font-medium text-brand-400 hover:text-brand-200"
            >
              View all<span className="sr-only"> {name} stats</span>
            </Link>
          </div>
        </div>
      </dd>
    </div>
  );
};
