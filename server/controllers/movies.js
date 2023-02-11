const asyncHandler = require("../middleware/async");
const Movie = require("../models/Movie");

const ErrorResponse = require("../utils/errorResponse");

// @desc    Create movie
// @route   POST /api/v1/movies
// @access  Private
// @role    Admin
exports.createMovie = asyncHandler(async (req, res, next) => {
  // Create user
  const movie = await Movie.create(req.body);

  res.status(201).json({ success: true, data: movie });
});

// @desc    Get all movies
// @route   GET /api/v1/movies
// @access  Public
exports.getAllMovies = asyncHandler(async (req, res, next) => {
  // Find movie
  const movie = await Movie.find();

  res.status(200).json({ success: true, data: movie });
});

// @desc    Get single movie
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getSingleMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: movie });
});

// @desc    Update movie
// @route   PUT /api/v1/movies/:id
// @access  Private
// @role    Admin
exports.updateMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ success: true, data: movie });
});

// @desc    Delete movie
// @route   DELETE /api/v1/movies/:id
// @access  Private
// @role    Admin
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`Movie not found id of ${req.params.id}`, 404)
    );
  }

  movie.remove();

  res.status(201).json({ success: true, data: {} });
});
