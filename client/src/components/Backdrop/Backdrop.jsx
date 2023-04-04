export const Backdrop = ({ height = "h-[600px]" }) => {
  return (
    <div
      className={`absolute top-0 bottom-0 right-0 left-0 -z-10  ${height} select-none overflow-hidden`}
    >
      <div className="from-bg-primary absolute bottom-0 left-0 -z-20 h-3/4 w-full bg-gradient-to-t"></div>
      <div className="absolute -z-30 h-full w-full  overflow-hidden opacity-20 ">
        <img
          src="https://www.themoviedb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg"
          alt="movie poster"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};
