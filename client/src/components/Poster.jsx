export function Poster({
  title,
  posterPath,
  width = "w-full",
  height = "h-64",
}) {
  return (
    <div className="space-y-2.5  cursor-pointer select-none">
      <div
        className={`${width} ${height} bg-gray-300 rounded-lg overflow-hidden`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${posterPath}`}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

// w-48 h-72
export default Poster;
