export const Poster = ({
  title,
  posterPath,
  width = "w-full",
  height = "h-72",
}) => {
  return (
    <div className="cursor-pointer select-none">
      <div
        className={`${width} ${height} bg-gray-800 rounded-lg overflow-hidden`}
      >
        <img
          src={posterPath}
          alt={title}
          className="object-cover w-full h-full hover:scale-105 transition duration-500"
        />
      </div>
    </div>
  );
};

// w-48 h-72
