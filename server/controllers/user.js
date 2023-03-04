const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");

const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get logged in user
// @route   GET /api/v1/user/me
// @access  Private
exports.addMovieToWatchlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const movie = await Movie.findById(req.body.movie);

  if (!movie) {
    return next(
      new ErrorResponse(`User not found id of ${req.params.id}`, 404)
    );
  }

  user.watchlist.push(movie._id);
  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// {
//     watchlist: [req.body.movie],
//   },
//   {
//     new: true,
//     runValidators: true,
//   }

// @desc    Get logged in user
// @route   GET /api/v1/user/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});
