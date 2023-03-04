export function Poster({
  title,
  posterPath,
  width = "w-full",
  height = "h-64",
}) {
  return (
    <div className="space-y-2.5 cursor-pointer select-none">
      <div
        className={`${width} ${height} bg-gray-300 rounded-xl overflow-hidden`}
      >
        <img
          src={posterPath}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

// w-48 h-72
export default Poster;
